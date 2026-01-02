import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../pictures/css/Homepage.css";
import Navbar from "../SharedComponents/NavbarComponent.jsx";
import AuthComponent from "./AuthComponent.jsx";

import { auth } from "./AuthRequests.js";
import { validateAuthInput } from "./AuthValidator.js";

function AuthPage() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateAuthInput(username, password, isLogin);
    if (!validation.ok) {
      setErrorMessage(validation.message);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    const result = await auth(username, password, isLogin);

    if (result.ok) {
      if (isLogin) {
        setSuccessMessage("Login successful: " + result.data.username);
        navigate("/");
      } else {
        setSuccessMessage("Registration successful: " + result.data.username);
        setIsLogin(true);
      }
    } else {
      setErrorMessage("Error: " + result.data.message);
    }

    setIsSubmitting(false);
  };

  return (
    <>
      {/*
      Navbar: Is at the top of every single page.

      AuthComponent: This is the component that handles both Login and Registration forms. This is just a block
      that is centered in the middle of the page, where we can either log in or register, depending on the "isLogin" state.

      We pass down all necessary states and functions as props to the AuthComponent.
      */}
      <Navbar />

      <AuthComponent
        isLogin={isLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        toggleMode={() => setIsLogin(!isLogin)}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
    </>
  );
}

export default AuthPage;
