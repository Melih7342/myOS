import { useState } from "react";
import React from "react";
import "./css/Homepage.css";

import NAVBAR from "./components/Navbar.jsx";
import HERO from "./components/Heroblock.jsx";
import TopOS from "./components/TopOS+ForumBlock.jsx";

function Homepage() {
  return (
    <div className="backgroundForHomepage">
      <NAVBAR />

      <HERO />

      <TopOS />
    </div>
  );
}

export default Homepage;
