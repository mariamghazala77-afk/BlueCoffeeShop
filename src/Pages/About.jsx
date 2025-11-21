import React from "react";
import "../Style/About.css";
import place from "../assets/place.jpg";
import { FaStar, FaChair, FaHeart, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="about-page">

      {/* ===== TOP IMAGE HERO ===== */}
      <div className="about-image-wrapper">
        <img
          src={place}
          alt="Blue Coffee Shop Interior"
          className="about-image"
        />
      </div>

      {/* ===== INFO CARD ===== */}
      <div className="about-container">

        <h1 className="about-title">About Blue Coffee Shop</h1>

        <p className="about-text">
          Blue Coffee Shop is a warm, cozy space inspired by elegance, comfort,
          and the soft blue tones you see in our interior. Every corner is
          designed to make you feel relaxed — whether you're studying, meeting
          friends, or enjoying a peaceful moment alone.
        </p>

        <h2 className="section-title">What Makes Us Special</h2>

        <div className="values-grid">

          <div className="value-card">
            <FaStar className="value-icon" />
            <h3>Premium Quality</h3>
            <p>We use high-quality beans and ingredients in every cup.</p>
          </div>

          <div className="value-card">
            <FaChair className="value-icon" />
            <h3>Cozy Environment</h3>
            <p>Our soft blue interior and lighting create a peaceful atmosphere.</p>
          </div>

          <div className="value-card">
            <FaHeart className="value-icon" />
            <h3>Made With Care</h3>
            <p>Every drink is crafted with passion and attention to detail.</p>
          </div>

        </div>

        {/* ===== BACK BUTTON ===== */}
        <Link to="/" className="back-btn">
          <FaArrowLeft style={{ marginRight: "8px" }} />
          Back to Home
        </Link>

      </div>
    </div>
  );
};

export default About;

;

