import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import "./css/Homepage.css";
import logo from "./pictures/homepage/logo.png";

function Loginpage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRedirectHomepage = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("You need to give your username AND your password!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3100/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Login successful: ${data.username}`);
        navigate("/");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
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

      <div
        className="container-fluid d-flex align-items-center justify-content-center"
        style={{
          minHeight: "90vh",
          background: "linear-gradient(135deg, #f8fdff, #cfefff)",
        }}
      >
        <div className="row w-100 justify-content-center">
          <div className="col-md-5 col-lg-4">
            <div className="card shadow-lg border-0 rounded-4 p-4">
              <h3 className="fw-bold mb-2">Log in</h3>
              <p className="text-muted mb-4">
                If you already have an account, you need just to log in.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 mb-3"
                  style={{ background: "#004e72", color: "#FEFEFE" }}
                >
                  Log in
                </button>
              </form>

              <div className="text-center">
                <button
                  className="btn btn-link p-0"
                  onClick={() => navigate("/register")}
                >
                  Create an account, if you don't have
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Loginpage;
