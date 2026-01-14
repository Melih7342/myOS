import React from "react";
import { useNavigate } from "react-router-dom";

function Results({distro}) {
  const navigate = useNavigate();
  const identifier = distro.logo_name || distro.name.toLowerCase().replace(/\s/g, "");
  const logoUrl = `https://distrowatch.com/images/yvzhuwbpy/${identifier}.png`;

  return (
    <div className="card-body">
      <div className="ms-5 d-none d-sm-block">
        <img
          src={logoUrl}
          alt={`${distro.name} logo`}
          referrerPolicy="no-referrer" // This helps bypass some hotlink protections
          style={{
            width: "100px",
            height: "100px",
            objectFit: "contain",
            marginBottom: "60px",
            marginTop: "50px",
          }}
          // Fallback: If image fails, hide the broken icon
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      </div>
      <h5 className="card-title">{distro.name}</h5>
      <p className="card-text">{distro.description}</p>
      <p>
        <strong>Category:</strong> {distro.category.split(",").join(", ")}
      </p>
      <p>
        <strong>Price:</strong> {distro.price}
      </p>
      <p>
        <strong>Installation Video: </strong>
        <a
          href={distro.install_video}
          target="_blank"
          rel="noopener noreferrer"
        >
          Watch on YouTube
        </a>
      </p>
      <p>
        <strong>Match Score:</strong> {distro.match_score}%
      </p>
    </div>
  );
}

export default Results;
