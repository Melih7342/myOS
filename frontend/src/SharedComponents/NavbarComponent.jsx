//This component for now is used basically everywhere. This is our navigation bar.

import { useState } from "react";
import React from "react";
import "../pictures/css/Homepage.css";
import logo from "../pictures/homepage/logo.png";

import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-light bg-white shadow-sm myContainer">
      <div className="d-flex align-items-center" onClick={() => navigate("/")}>
        <img
          src={logo}
          alt="myOS logo"
          className="me-2"
          style={{ width: 50}}
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
        onClick={() => navigate("/auth")}
        style={{ background: "#004e72", color: "#FEFEFE" }}
      >
        Log in
      </button>
    </nav>
  );
}

export default Homepage;
