import React, { useEffect, useState } from "react";
import "../Style/Loader.css";
import logo from "../assets/logo.png";

function Loader() {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 5500); // longer stay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`loader-container ${fadeOut ? "fade-out" : ""}`}>
      <div className="logo-wrapper">
        <div className="circle-glow"></div>
        <div className="shine-effect"></div>
        <img src={logo} alt="Blue Coffee Logo" className="loader-logo" />
      </div>
    
    </div>
  );
}

export default Loader;



