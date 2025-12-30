import React from "react";
import { Link } from "react-router-dom";
import { FaCoffee } from "react-icons/fa";
import { motion } from "framer-motion";
import "../Style/Home.css";
import background from "../assets/background.webp";

function Home() {
  return (
    <motion.div
      className="home"
      style={{ backgroundImage: `url(${background})` }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="gradient-overlay"></div>

      <div className="content">
        <h1 className="logo">Blue Coffee Shop</h1>

        <div className="buttons">
          <Link to="/menu" className="btn menu">
            <FaCoffee style={{ marginRight: "8px", marginBottom: "-2px" }} /> 
            View Menu
          </Link>

          <Link to="/visit" className="btn about">
            Visit Us
          </Link>

          <Link to="/about" className="btn about">
            About Us
          </Link>

          <Link to="/services" className="btn about">
            Our Services
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default Home;




