import { useState } from "react";
import React from "react";

import { useNavigate } from "react-router-dom";

import "./css/Homepage.css";

import NAVBAR from "./components/NavbarComponent.jsx";

import { submitQuiz } from "./services/QuizRequests.js";

const questions = [
  {
    id: 1,
    genre: "popularity",
    question: "Do you prefer current and popular operating systems?",
    options: ["Absolutely", "Would be nice", "Not Important"],
  },
  {
    id: 2,
    genre: "price",
    question: "Does the operating system have to be free",
    options: ["Yes", "No"],
  },
  {
    id: 3,
    genre: "experience",
    question: "Which level of experience do you have?",
    options: ["Beginner", "Intermediate", "Advanced"],
  },
  {
    id: 4,
    genre: "gui",
    question: "Do you prefer a graphical user interface?",
    options: ["Yes", "No"],
  },
  {
    id: 5,
    genre: "hardware",
    question: "Which Hardware are you using?",
    options: ["Old", "Mid-Range", "High"],
  },
  {
    id: 6,
    genre: "use_case",
    question: "What do you want to use the operating system for?",
    options: ["Gaming", "Server", "Everyday Use", "Security", "Raspberry Py"],
  },
  {
    id: 7,
    genre: "weight",
    question: "Do you want the operating system to be light weight?",
    options: ["Yes", "No"],
  },
  {
    id: 8,
    genre: "livetest",
    question:
      "Should the operating system have the possibility to try it on a live medium (e.g. USB-Stick)?",
    options: ["Yes", "No"],
  },
];

function Quizpage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState([]);

  const navigate = useNavigate();

  const question = questions[currentQuestion];

  const hasAnswer = (answers[question.genre]?.length || 0) > 0;

  const toggleOption = (option) => {
    let updated = [];
    if (question.options.length === 2) {
      updated = [option];
    } else {
      const currentAnswers = answers[question.genre] || [];
      if (currentAnswers.includes(option)) {
        for (let i = 0; i < currentAnswers.length; i++) {
          if (currentAnswers[i] !== option) {
            updated.push(currentAnswers[i]);
          }
        }
      } else {
        for (let i = 0; i < currentAnswers.length; i++) {
          updated.push(currentAnswers[i]);
        }
        updated.push(option);
      }
    }
    setAnswers({
      ...answers,
      [question.genre]: updated,
    });
  };

  const handleQuizSubmit = async () => {
    const result = await submitQuiz(answers);

    if (result.ok) {
      //alert("Quiz submitted successfully!");
      setResults(result.data.recommendations);
      navigate("/result", { state: { results: result.data.recommendations } });
    } else {
      alert("Submission failed");
    }
  };

  return (
    <>
      <div className="backgroundForHomepage">
        <NAVBAR />

        <div className="container d-flex align-items-center justify-content-center min-vh-100">
          <div className="w-100" style={{ maxWidth: "700px" }}>
            <p className="text-center text-muted mb-2">
              Question {currentQuestion + 1} of {questions.length}
            </p>

            <h4 className="text-center mb-4">{question.question}</h4>

            <div className="d-flex justify-content-center gap-3 flex-wrap mb-5">
              {question.options.map((option) => {
                const selected =
                  answers[question.genre]?.includes(option) || false;

                return (
                  <button
                    key={option}
                    className={`btn ${
                      selected ? "btn-primary" : "btn-outline-primary"
                    } px-4`}
                    onClick={() => toggleOption(option)}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            <div className="d-flex justify-content-between">
              <button
                className="btn btn-outline-secondary"
                disabled={currentQuestion === 0}
                onClick={() => setCurrentQuestion((prev) => prev - 1)}
              >
                Back
              </button>

              {currentQuestion === questions.length - 1 ? (
                <button
                  className="btn btn-success"
                  onClick={handleQuizSubmit}
                  disabled={!hasAnswer}
                >
                  Finish
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => setCurrentQuestion((prev) => prev + 1)}
                  disabled={!hasAnswer}
                  style={{ background: "#004e72", color: "#FEFEFE" }}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Quizpage;
