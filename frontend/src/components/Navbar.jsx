//This component for now is used basically everywhere. This is our navigation bar.

import { useState } from "react";
import React from "react";
import "../css/Homepage.css";
import logo from "../pictures/homepage/logo.png";

import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-light bg-white shadow-sm myContainer">
      <div className="d-flex align-items-center">
        <img
          src={logo}
          alt="myOS logo"
          className="me-2"
          style={{ width: 40, height: 40 }}
          onClick={() => navigate("/")}
        />
        <span
          className="navbar-brand fw-bold mb-0"
          style={{ color: "#4FC3f7" }}
          onClick={() => navigate("/")}
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
