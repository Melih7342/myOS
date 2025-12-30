import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./css/Homepage.css";
import Navbar from "./components/NavbarComponent.jsx";
import AuthComponent from "./components/AuthComponent.jsx";

import { login, register } from "./services/AuthRequests.js";
import { validateAuthInput } from "./services/AuthValidator.js";

function AuthPage() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateAuthInput(username, password, isLogin);
    if (!validation.ok) {
      alert(validation.message);
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
        setIsLogin(true);
      }
    } else {
      alert("Error: " + result.data.message);
    }
  };

  return (
    <>
      <Navbar />

      <AuthComponent
        isLogin={isLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        toggleMode={() => setIsLogin(!isLogin)}
      />
    </>
  );
}

export default AuthPage;
