import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="display-1 text-danger">404</h1>
      <p className="fs-4">Oops! Die Seite wurde nicht gefunden 😕</p>
      <div className="mt-3">
        <button className="btn btn-primary me-2" onClick={() => navigate("/")}>
          Zur Startseite
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/quizpage")}
        >
          Zum Quiz
        </button>
      </div>
    </div>
  );
}

export default NotFound;
