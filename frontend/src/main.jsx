import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import PageRoutes from "./SharedComponents/PageRouting.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <PageRoutes />
    </Router>
  </StrictMode>
);
