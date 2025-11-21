import React from "react";
import "../Style/Services.css";
import { FaWifi, FaMugHot, FaBirthdayCake, FaLeaf, FaUsers, FaLaptop, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <div className="services-page">

      <h1 className="services-title">Our Services</h1>

      <p className="services-subtext">
        At Blue Coffee Shop, we offer more than just great coffee. 
        We create a warm and welcoming environment where comfort meets quality.
      </p>

      {/* ===== SERVICES GRID ===== */}
      <div className="services-grid">

        <div className="service-card">
          <FaMugHot className="service-icon" />
          <h3>Signature Drinks</h3>
          <p>Enjoy our exclusive coffee blends, iced drinks, matcha, and specialty flavors.</p>
        </div>

        <div className="service-card">
          <FaWifi className="service-icon" />
          <h3>Free Wi-Fi</h3>
          <p>Work, study, or browse with high-speed internet in a cozy setting.</p>
        </div>

        <div className="service-card">
          <FaLaptop className="service-icon" />
          <h3>Study-Friendly</h3>
          <p>Comfortable seating and peaceful atmosphere for students & freelancers.</p>
        </div>

        <div className="service-card">
          <FaBirthdayCake className="service-icon" />
          <h3>Small Event Booking</h3>
          <p>Book a corner for birthdays, gatherings, or special celebrations.</p>
        </div>

        <div className="service-card">
          <FaLeaf className="service-icon" />
          <h3>Fresh Ingredients</h3>
          <p>All our drinks and desserts use fresh, high-quality ingredients.</p>
        </div>

        <div className="service-card">
          <FaUsers className="service-icon" />
          <h3>Friendly Staff</h3>
          <p>Our baristas are always ready to help and serve you with a smile.</p>
        </div>

      </div>

      {/* ===== BACK TO HOME ===== */}
      <Link to="/" className="back-btn">
        <FaArrowLeft style={{ marginRight: "8px" }} />
        Back to Home
      </Link>

    </div>
  );
};

export default Services;
