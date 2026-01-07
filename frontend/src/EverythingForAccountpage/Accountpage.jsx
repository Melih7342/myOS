import React from "react";
import { useLocation } from "react-router-dom";

import NAVBAR from "../SharedComponents/NavbarComponent.jsx";

function Accountpage() {
  return (
    <>
      <NAVBAR />

      <div className="container" style={{ color: "#004E72", marginTop: "8rem" }}>
        <h2 className="mb-4">Maisam Mohammadi</h2>
        <p>My favourite OS is <b>Ubuntu</b>.</p>
        <p style={{ marginBottom: "8rem" }}>My profession is <b>managing servers</b>.</p>
        <div className="d-flex flex-row gap-4 mb-4">
          <button className="btn btn-primary px-4 py-2" style={{ background: "#004E72", color: "#FEFEFE", borderRadius: "0.6rem" }}>Change Password</button>
          <button className="btn btn-primary px-4 py-2" style={{ background: "#004e7200", color: "#004E72", borderColor: "#004E72", borderRadius: "0.6rem" }}>Log out</button>
          <button className="btn btn-primary px-4 py-2" style={{ background: "#004E7200", color: "#FF2132", borderColor: "#FF2132", borderRadius: "0.6rem" }}>Delete Account</button>
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
