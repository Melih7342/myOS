import React from "react";
import { useLocation } from "react-router-dom";

import NAVBAR from "../SharedComponents/NavbarComponent.jsx";
import Results from "./ResultBlockComponent.jsx";

function ResultPage() {
  const location = useLocation();
  const { results } = location.state || { results: [] };

  if (!results.length) return <p>No results found.</p>;

  return (
    <>
      <NAVBAR />

      <div className="container mt-5">
        <h2>Top 3 Recommendations</h2>
        {results.map((distro, index) => (
          <div key={index} className="card mb-3">
            <Results distro={distro} />
          </div>
        ))}
      </div>
    </>
  );
}

export default ResultPage;
