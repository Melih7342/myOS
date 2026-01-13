import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pictures/css/Homepage.css";
import logo from "../pictures/homepage/logo.png";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:3100/auth/check", {
          credentials: "include",
        });

        if (!res.ok) {
          setUser(null);
          return;
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Auth check failed:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return null;

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
          style={{ width: 50}}
        />
        <span
          className="navbar-brand fw-bold mb-0"
          style={{ color: "#4FC3f7" }}
        >
          myOS
        </span>
      </div>

      {user ? (
        <button
          className="btn ms-auto"
          onClick={() => navigate("/account")}
          style={{
            background: "transparent",
            color: "#004e72",
            fontWeight: "bold",
          }}
        >
          {user.username}
        </button>
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
