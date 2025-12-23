import { useState } from "react";
import React from "react";
import "./css/Homepage.css";

import logo from "./pictures/homepage/logo.png";
import forum from "./pictures/homepage/forum.png";

import step1 from "./pictures/homepage/step1.png";
import step2 from "./pictures/homepage/step2.png";
import step3 from "./pictures/homepage/step3.png";

import windows10 from "./pictures/homepage/top5OS/windows10.png";
import windows11 from "./pictures/homepage/top5OS/windows11.png";
import mint from "./pictures/homepage/top5OS/mint.png";
import ubuntu from "./pictures/homepage/top5OS/ubuntu.png";
import cachyos from "./pictures/homepage/top5OS/cachyos.png";

import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();

  const handleRedirectLogin = () => {
    navigate("/login");
  };
  const handleRedirectRegister = () => {
    navigate("/register");
  };
  const handleRedirectQuizpage = () => {
    navigate("/quizpage");
  };

  return (
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
              onClick={() => handleRedirectQuizpage("/quizpage")}
              style={{ background: "#004e72", color: "#FEFEFE" }}
            >
              Get Started
            </button>
            <button
              className="btn btn-outline-primary px-4"
              onClick={() => handleRedirectLogin("/login")}
            >
              Log in
            </button>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <h4 className="mb-4">Top 5 popular operating systems</h4>

        <div className="row align-items-center">
          <div className="col-md-8">
            <div className="row text-center">
              {[
                { name: "Windows 11", img: windows11 },
                { name: "Ubuntu", img: ubuntu },
                { name: "Windows 10", img: windows10 },
                { name: "CachyOS", img: cachyos },
                { name: "Linux Mint", img: mint },
              ].map((os, index) => (
                <div
                  className="col-6 col-md-2 mb-4 d-flex flex-column align-items-center"
                  key={os.name}
                >
                  <div
                    className="bg-light rounded d-flex justify-content-center align-items-center mb-2"
                    style={{ width: 80, height: 80 }}
                  >
                    <img
                      src={os.img}
                      alt={os.name}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <small>
                    {index + 1}. {os.name}
                  </small>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm p-4 text-center bg-primary text-white rounded-4">
              <img
                src={forum}
                alt="Make forum"
                className="d-block mx-auto mb-3"
                style={{ width: 80, height: 80 }}
              />
              <h5>Make a forum</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
