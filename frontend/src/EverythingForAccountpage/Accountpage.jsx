import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NAVBAR from "../SharedComponents/NavbarComponent.jsx";
import {
  AccountHeader,
  AccountButtons,
  ForumPart,
} from "./AccountpageComponents.jsx";

import { useAuth } from "../SharedComponents/authContext";

function Accountpage() {
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [loading, user, navigate]);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // Delete account
  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This cannot be undone."
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3100/auth/delete/${user.username}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.ok) {
        await logout();
        alert("Account deleted.");
        navigate("/");
      } else {
        alert("Error deleting account.");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Network error.");
    }
  };

  if (loading) return null;
  if (!user) return null;

  return (
    <>
      <NAVBAR />

      <div
        className="container"
        style={{ color: "#004E72", marginTop: "8rem" }}
      >
        <AccountHeader username={user.username} />

        <AccountButtons
          logout={handleLogout}
          deleteAccount={handleDeleteAccount}
        />

        <ForumPart />
      </div>
    </>
  );
}

export default Accountpage;
