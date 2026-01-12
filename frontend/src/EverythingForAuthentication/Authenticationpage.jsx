import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthComponent";
import NAVBAR from "../SharedComponents/NavbarComponent.jsx";

function Authenticationpage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);

    // Bestimmung des Endpoints basierend auf dem Modus
    const endpoint = isLogin ? "/auth/login" : "/auth/register";
    const url = `http://localhost:3100${endpoint}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          setSuccessMessage("Login successful! Redirecting...");

          localStorage.setItem("user", JSON.stringify({
            username: data.username,
            isLoggedIn: true
          }));

          setTimeout(() => navigate("/account"), 1500);
        } else {
          // --- REGISTER LOGIK ---
          setSuccessMessage("Registration successful! You can now log in.");
          setIsLogin(true);
          setPassword("");
        }
      } else {
        setErrorMessage(data.message || "An error occurred.");
      }
    } catch (error) {
      setErrorMessage("Connection to server failed. Is the Backend running?");
      console.error("Auth Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <NAVBAR />
      <div className="container">
        <AuthForm
          isLogin={isLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
          toggleMode={toggleMode}
          isSubmitting={isSubmitting}
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
      </div>
    </>
  );
}

export default Authenticationpage;