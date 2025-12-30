//This component for now is used only in the Homepage. This is the block with "Answer questions and get operating systems"

import { useState } from "react";
import React from "react";
import "../css/Homepage.css";

import step1 from "../pictures/homepage/step1.png";
import step2 from "../pictures/homepage/step2.png";
import step3 from "../pictures/homepage/step3.png";

import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <div
        className="card shadow-lg rounded-4 p-4 text-center bg-info bg-opacity-25"
        style={{ background: "#b3e5fc" }}
      >
        <h3 className="mb-4" style={{ color: "#004e72" }}>
          Answer questions and get operating systems
        </h3>

        <div className="row text-center mb-4">
          <div className="col-md-4">
            <img
              src={step1}
              alt="Create account"
              className="d-block mx-auto mb-3"
              style={{ width: 80, height: 80 }}
            />
            <p style={{ color: "#004e72" }}>
              <strong>1.</strong> Create an account
            </p>
          </div>

          <div className="col-md-4">
            <img
              src={step2}
              alt="Create account"
              className="d-block mx-auto mb-3"
              style={{ width: 80, height: 80 }}
            />
            <p style={{ color: "#004e72" }}>
              <strong>2.</strong> Answer some questions
            </p>
          </div>

          <div className="col-md-4">
            <img
              src={step3}
              alt="Create account"
              className="d-block mx-auto mb-3"
              style={{ width: 80, height: 80 }}
            />
            <p style={{ color: "#004e72" }}>
              <strong>3.</strong> We suggest the best OS for you
            </p>
          </div>
        </div>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-primary px-4"
            onClick={() => navigate("/quizpage")}
            style={{ background: "#004e72", color: "#FEFEFE" }}
          >
            Get Started
          </button>
          <button
            className="btn btn-outline-primary px-4"
            onClick={() => navigate("/auth")}
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
