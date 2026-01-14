import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "../SharedComponents/NavbarComponent.jsx";
import Results from "./ResultBlockComponent.jsx";
import { generateResultsPDF } from "./PdfGenerator.js";

function ResultPage() {
  const location = useLocation();
  const { results } = location.state || { results: [] };
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    
    try {
      await generateResultsPDF(results);
    } catch (error) {
      console.error('PDF generation failed:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  if (!results.length) return <p>No results found.</p>;

  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Top 3 Recommendations</h2>
          
          <button 
            className="btn btn-primary mt-3"
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
          >
            {isGeneratingPDF ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Generating PDF...
              </>
            ) : (
              <>
                Save as PDF
              </>
            )}
          </button>
        </div>

        {results.map((distro, index) => (
          <div key={index} className="card mb-3">
            <Results distro={distro} />
          </div>
        ))}

        <div className="text-center mt-4 mb-5">
          <button 
            className="btn btn-primary mt-3"
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
          >
            {isGeneratingPDF ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Generating PDF...
              </>
            ) : (
              <>
                Save results as PDF
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default ResultPage;
