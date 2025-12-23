import { useState } from "react";
import React from "react";

import { useNavigate } from "react-router-dom";

import logo from "./pictures/homepage/logo.png";
import "./css/Homepage.css";

const questions = [
  {
    id: 1,
    question: "What do you want to use the operating system for?",
    options: ["Gaming", "Hosting", "Editing", "Programming"],
  },
  {
    id: 2,
    question: "Which level of experience do you have?",
    options: ["Beginner", "Intermediate", "Advanced"],
  },
  {
    id: 3,
    question: "How important is performance for you?",
    options: ["Not important", "Balanced", "Very important"],
  },
  {
    id: 4,
    question: "Do you prefer a graphical user interface?",
    options: ["Yes", "No", "Both"],
  },
  {
    id: 5,
    question: "How important is stability?",
    options: ["Low", "Medium", "High"],
  },
  {
    id: 6,
    question: "Do you want long-term support?",
    options: ["Yes", "No"],
  },
  {
    id: 7,
    question: "How much do you like customization?",
    options: ["Low", "Medium", "High"],
  },
  {
    id: 8,
    question: "Which hardware are you using?",
    options: ["Old hardware", "Mid-range", "High-end"],
  },
  {
    id: 9,
    question: "Do you care about open-source?",
    options: ["Yes", "No", "Doesn't matter"],
  },
  {
    id: 10,
    question: "How important is ease of use?",
    options: ["Low", "Medium", "High"],
  },
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const question = questions[currentQuestion];

  const toggleOption = (option) => {
    const currentAnswers = answers[question.id] || [];
    const updated = currentAnswers.includes(option)
      ? currentAnswers.filter((o) => o !== option)
      : [...currentAnswers, option];

    setAnswers({
      ...answers,
      [question.id]: updated,
    });
  };

  const navigate = useNavigate();

  const handleRedirectHome = () => {
    navigate("/");
  };

  const submitQuiz = async () => {
    try {
      const response = await fetch("http://localhost:3100/quiz/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Quiz submitted successfully!");
        console.log("Backend response:", data);
        handleRedirectHome("/");
      } else {
        alert(data.message || "Submission failed");
      }
    } catch (error) {
      console.error("Error:", error);
      handleRedirectHome("/");
      alert("Something went wrong!");
    }
  };

  return (
    <>
      <nav className="navbar navbar-light bg-white shadow-sm myContainer">
        <div className="d-flex align-items-center">
          <img
            src={logo}
            alt="myOS logo"
            className="me-2"
            style={{ width: 40, height: 40 }}
          />
          <span
            className="navbar-brand fw-bold mb-0"
            style={{ color: "#4FC3f7" }}
          >
            myOS
          </span>
        </div>

        <button
          className="btn ms-auto"
          onClick={() => handleRedirectLogin("/login")}
          style={{ background: "#004e72", color: "#FEFEFE" }}
        >
          Log in
        </button>
      </nav>

      <div className="container d-flex align-items-center justify-content-center min-vh-100">
        <div className="w-100" style={{ maxWidth: "700px" }}>
          <p className="text-center text-muted mb-2">
            Question {currentQuestion + 1} of {questions.length}
          </p>

          <h4 className="text-center mb-4">{question.question}</h4>

          <div className="d-flex justify-content-center gap-3 flex-wrap mb-5">
            {question.options.map((option) => {
              const selected = answers[question.id]?.includes(option) || false;

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
              <button className="btn btn-success" onClick={submitQuiz}>
                Finish
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => setCurrentQuestion((prev) => prev + 1)}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
