import React from "react";
import { useNavigate } from "react-router-dom";

function Results({distro}) {
  const navigate = useNavigate();

  return (
    <div className="card-body">
      <h5 className="card-title">{distro.name}</h5>
      <p className="card-text">{distro.description}</p>
      <p>
        <strong>Category:</strong> {distro.category}
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
