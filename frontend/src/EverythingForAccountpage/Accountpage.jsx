import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NAVBAR from "../SharedComponents/NavbarComponent.jsx";
import {
  AccountHeader,
  AccountButtons,
  ForumPart,
} from "./AccountpageComponents.jsx";


function Accountpage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check session & load user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // RICHTIG: Check-Auth Route verwenden, nicht Logout!
        const response = await fetch("http://localhost:3100/auth/check", {
          method: "GET",
          credentials: "include", // Wichtig für Cookies/Session
        });

        if (!response.ok) {
          navigate("/login");
          return;
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Auth check failed:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  // Logout
  const handleLogout = async () => {
    try {
      await fetch(`http://localhost:3100/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      navigate("/");
    }
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
