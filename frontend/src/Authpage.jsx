import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./css/Homepage.css";
import Navbar from "./components/Navbar.jsx";

import { login, register } from "./services/AuthRequests.js";

function AuthPage() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("You need to give your username AND your password!");
      return;
    }

    if (!isLogin && password.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }

    let result;
    if (isLogin) {
      result = await login(username, password);
    } else {
      result = await register(username, password);
    }

    if (result.ok) {
      if (isLogin) {
        alert("Login successful: " + result.data.username);
        navigate("/");
      } else {
        alert("Registration successful: " + result.data.username);
        navigate("/login");
      }
    } else {
      alert("Error: " + result.data.message);
    }
  };

  let title = "";
  let description = "";
  let submitLabel = "";
  let switchLabel = "";

  if (isLogin) {
    title = "Log in";
    description = "If you already have an account, you need just to log in.";
    submitLabel = "Log in";
    switchLabel = "Create an account, if you don't have";
  } else {
    title = "Register";
    description = "If you don't have an account, you can create one.";
    submitLabel = "Register";
    switchLabel = "Have an Account already?";
  }

  return (
    <>
      <Navbar />

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
              <h3 className="fw-bold mb-2">{title}</h3>
              <p className="text-muted mb-4">{description}</p>

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
                  {submitLabel}
                </button>
              </form>

              <div className="text-center">
                <button
                  className="btn btn-link p-0"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {switchLabel}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthPage;
