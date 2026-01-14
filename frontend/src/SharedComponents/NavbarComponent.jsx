import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pictures/css/Homepage.css";
import logo from "../pictures/homepage/logo.png";
import { useAuth } from "../SharedComponents/authContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <nav className="navbar navbar-light bg-white shadow-sm myContainer">
        <div
          className="d-flex align-items-center"
          style={{ cursor: "pointer" }}
        >
          <img
            src={logo}
            alt="myOS logo"
            className="me-2"
            style={{ width: 50 }}
          />
          <span
            className="navbar-brand fw-bold mb-0"
            style={{ color: "#4FC3f7" }}
          >
            myOS
          </span>
        </div>
        <div className="ms-auto">
          <div
            className="spinner-border spinner-border-sm text-primary"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar navbar-light bg-white shadow-sm myContainer">
      <div
        className="d-flex align-items-center"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        <img
          src={logo}
          alt="myOS logo"
          className="me-2"
          style={{ width: 50 }}
        />
        <span
          className="navbar-brand fw-bold mb-0"
          style={{ color: "#4FC3f7" }}
        >
          myOS
        </span>
      </div>

      {user ? (
        <div className="d-flex align-items-center gap-3">
          <button
            className="btn"
            onClick={() => navigate("/account")}
            style={{
              background: "transparent",
              color: "#004e72",
              fontWeight: "bold",
            }}
          >
            {user.username}
          </button>
          {/* Optional: Logout Button */}
        </div>
      ) : (
        <button
          className="btn ms-auto"
          onClick={() => navigate("/auth")}
          style={{ background: "#004e72", color: "#FEFEFE" }}
        >
          Log in
        </button>
      )}
    </nav>
  );
}

export default Navbar;
