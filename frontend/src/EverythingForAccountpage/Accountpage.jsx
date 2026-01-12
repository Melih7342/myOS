import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NAVBAR from "../SharedComponents/NavbarComponent.jsx";

function Accountpage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This cannot be undone.")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3100/auth/delete/${user.username}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Account deleted.");
        handleLogout();
      } else {
        alert("Error deleting account.");
      }
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  if (!user) return null;

  return (
    <>
      <NAVBAR />

      <div className="container" style={{ color: "#004E72", marginTop: "8rem" }}>
        <h2 className="mb-4">{user.username}</h2>
        <p>My favourite OS is <b>Ubuntu</b>.</p>
        <p style={{ marginBottom: "8rem" }}>My profession is <b>managing servers</b>.</p>

        <div className="d-flex flex-row gap-4 mb-4">
          <button className="btn btn-primary px-4 py-2" style={{ background: "#004E72", color: "#FEFEFE", borderRadius: "0.6rem" }}>
            Change Password
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="btn btn-primary px-4 py-2"
            style={{ background: "transparent", color: "#004E72", borderColor: "#004E72", borderRadius: "0.6rem" }}>
            Log out
          </button>

          {/* Delete Account Button */}
          <button
            onClick={handleDeleteAccount}
            className="btn btn-primary px-4 py-2"
            style={{ background: "transparent", color: "#FF2132", borderColor: "#FF2132", borderRadius: "0.6rem" }}>
            Delete Account
          </button>
        </div>

        <div>
          <h3>My Forums</h3>
          <p>Here come the forums!</p>
        </div>
      </div>
    </>
  );
}

export default Accountpage;