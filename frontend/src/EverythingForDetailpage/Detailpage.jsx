import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import NAVBAR from "../SharedComponents/NavbarComponent.jsx";
import { useAuth } from "../SharedComponents/authContext";
import { getDistroLogo } from "../SharedComponents/LogoURL.jsx";
import InfoTooltip from "../SharedComponents/InfoTooltip.jsx";
import Footer from "../SharedComponents/FooterComponent.jsx";

function Detailpage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { user, refreshAuth } = useAuth();
  const origin = location.state?.from;

  const [distro, setDistro] = useState(location.state?.distro || null);
  const [loading, setLoading] = useState(!distro);

  let logoUrl = getDistroLogo(distro);

  const handleBackClick = () => {
    if (origin === "catalog") {
      navigate("/catalog");
    } else if (origin === "results" || origin === "home") {
      navigate(-1); // This goes back to the exact results or home
    } else {
      navigate("/catalog"); // Default fallback
    }
  };

  const isFavorite =
    user && distro?.id
      ? Number(user.favorite_distro_id) === Number(distro.id)
      : false;

  const handleToggleFavorite = async () => {
    if (!user) {
      alert("Please log in first to set a favorite OS.");
      return;
    }
    try {
      const response = await fetch("http://localhost:3100/api/user/favorite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ distro_id: distro.id }),
      });
      if (response.ok) {
        await refreshAuth();
      }
    } catch (err) {
      console.error("Toggle Favorite Error:", err);
    }
  };

  useEffect(() => {
    if (!distro || !distro.download_url || !distro.youtube_link) {
      setLoading(true);
      fetch(`http://localhost:3100/distros/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setDistro(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Fetch error:", err);
          setLoading(false);
        });
    }
  }, [id, distro]);

  if (loading || !distro) {
    return (
      <>
        <NAVBAR />
        <div
          className="container"
          style={{ marginTop: "8rem", textAlign: "center" }}
        >
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2">Loading Operating System...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <NAVBAR />
      <main>
        <div
          className="container"
          style={{ color: "#004E72", marginTop: "8rem" }}
        >
          <div className="row justify-content-between gap-5 pb-4">
            <div className="col-md-7">
              <h3 className="pb-4">
                <b>{distro.name}</b>
                <button
                  onClick={handleToggleFavorite}
                  className={`btn ms-3 ${isFavorite ? "btn-warning fw-bold" : "btn-outline-warning"}`}
                  style={{ borderRadius: "0.8rem", transition: "0.3s" }}
                >
                  {isFavorite ? "⭐ Favored" : "☆ Set as Favorite"}
                </button>
              </h3>

              <div className="row gap-3 pb-3" style={{ fontSize: "13pt" }}>
                <p className="col">
                  OS type: <b>{distro.os_type || "N/A"}</b>
                </p>
                <p className="col">
                  {" "}
                  <InfoTooltip link="/glossary" />
                  Category:{" "}
                  <b>
                    {distro.category
                      ? distro.category.split(",").join(", ")
                      : "N/A"}
                  </b>
                </p>
              </div>

              <p style={{ fontSize: "11pt", lineHeight: "1.6" }}>
                {distro.description || "No description available"}
              </p>

              <div className="d-flex gap-5 pb-2">
                <span>
                  Based on:{" "}
                  <b>
                    {distro.based_on
                      ? distro.based_on.split(",").join(", ")
                      : "N/A"}
                  </b>
                </span>
                <span>
                  <InfoTooltip
                    text="The Desktop Environment is the graphical interface you see, including the menus, icons, and windows."
                    link="/glossary"
                  />
                  Desktop:{" "}
                  <b>
                    {distro.desktop
                      ? distro.desktop.split(",").join(", ")
                      : "N/A"}
                  </b>
                </span>
              </div>
              <div className="d-flex gap-5 pb-4">
                <span>
                  Price: <b>{distro.price || "Free"}</b>
                </span>
                <span>
                  Beginner friendly:{" "}
                  <b>{distro.beginner_friendly ? "Yes" : "No"}</b>
                </span>
                {distro.image_size && (
                  <span>
                    Image size:{" "}
                    <b>
                      {distro.image_size.toLowerCase().includes("b")
                        ? distro.image_size
                        : `${distro.image_size} MB`}
                    </b>
                  </span>
                )}
              </div>

              <div
                className="p-4 rounded-4"
                style={{ backgroundColor: "#f0f7fa" }}
              >
                <h5 className="mb-3">Resources & Guides</h5>

                <p className="mb-2">
                  <strong>Installation Video: </strong>
                  <a
                    href={distro.install_video || distro.youtube_link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                  >
                    {distro.install_video || distro.youtube_link
                      ? "Watch Tutorial on YouTube ↗"
                      : "Searching for video..."}
                  </a>
                </p>

                {distro.security_info && (
                  <p className="mb-2">
                    <strong>Security Hardening: </strong>
                    <a
                      href={distro.security_info.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none"
                    >
                      {distro.security_info.label} ↗
                    </a>
                  </p>
                )}
                {distro.download_url && (
                  <p className="mb-0">
                    <strong>Download OS: </strong>
                    <a
                      href={distro.download_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none"
                    >
                      Download Link ↗
                    </a>
                  </p>
                )}
              </div>

            <div className="col-md-4 d-flex justify-content-center align-items-start mt-5 mt-md-0">
              <div
                style={{
                  width: "15rem",
                  height: "15rem",
                  backgroundColor: "#f8f9fa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "1.5rem",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
                  overflow: "hidden",
                }}
              >
                {logoUrl ? (
                  <img
                    //key={logoUrl}
                    src={logoUrl}
                    alt={`${distro.name} logo`}
                    referrerPolicy="no-referrer"
                    style={{
                      maxWidth: "70%",
                      maxHeight: "70%",
                      objectFit: "contain",
                    }}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  <span className="text-muted">No Logo Found</span>
                )}
              </div>
            </div>
          </div>
          </div>

          <div className="mt-5 pb-5">
            <button
              onClick={handleBackClick}
              className="btn btn-sm"
              style={{
                background: "#004E72",
                color: "#ffffff",
                borderRadius: "0.5rem",
                padding: "0.4rem 1rem",
              }}
            >
              {origin === "catalog" ? "← Back to Catalog" : "← Back"}
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Detailpage;
