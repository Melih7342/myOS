import { useState } from "react";
import React from "react";

import { useNavigate } from "react-router-dom";

import logo from "./pictures/homepage/logo.png";
import "./css/Homepage.css";

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

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const question = questions[currentQuestion];

  const toggleOption = (option) => {
    const currentAnswers = answers[question.genre] || [];
    const updated = currentAnswers.includes(option)
      ? currentAnswers.filter((o) => o !== option)
      : [...currentAnswers, option];

    setAnswers({
      ...answers,
      [question.genre]: updated,
    });
  };

  const navigate = useNavigate();

  const handleRedirectHome = () => {
    navigate("/");
  };

  const handleRedirectLogin = () => {
    navigate("/login");
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
      <div className="backgroundForHomepage">
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
                <button className="btn btn-success" onClick={submitQuiz}>
                  Finish
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => setCurrentQuestion((prev) => prev + 1)}
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
