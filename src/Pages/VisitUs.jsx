import React from "react";
import "../Style/VisitUs.css";
import { Link } from "react-router-dom";
import {
  FaCoffee,
  FaMapMarkerAlt,
  FaClock,
  FaArrowLeft,
  FaInstagram,
} from "react-icons/fa";

function VisitUs() {
  return (
    <div className="visit-container">
  <div className="visit-card">

    <h1 className="visit-title">Visit Us</h1>

    <div className="info-list">
      <div className="info-item">
        <FaMapMarkerAlt className="info-icon" />
        النبطية – حي الجامعات
      </div>

      <div className="info-item">
        <FaClock className="info-icon" />
        Every Day — 8 AM to 11 PM
      </div>
    </div>

    <div className="instagram-box">
      <a href="https://instagram.com" className="insta-btn">
        <FaInstagram className="insta-icon" />
      </a>
      <div className="insta-text">Follow us on Instagram</div>
    </div>

    <Link to="/" className="back-btn">
      <FaArrowLeft /> Back to Home
    </Link>

  </div>
</div>

  );
}

export default VisitUs;

