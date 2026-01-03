import React, { useState, useEffect, useContext } from "react";
import "../Style/Menu.css";
import bg from "../assets/background.webp";
import { Link } from "react-router-dom";
import api from "../api/axios";

import {
  FaArrowLeft,
  FaUtensils,
  FaIceCream,
  FaMugHot,
  FaCheese,
} from "react-icons/fa";

import { CartContext } from "../Context/CartContext";

function Menu() {
  const [category, setCategory] = useState("");
  const [menuData, setMenuData] = useState({});
  const { addToCart } = useContext(CartContext);

  // 🔴 BACKEND URL (VERY IMPORTANT)
  const API_URL = "http://localhost:5000";

  const categoryIcons = {
    Sandwiches: <FaUtensils />,
    Desserts: <FaIceCream />,
    "Hot Beverages": <FaMugHot />,
    Croissant: <FaCheese />,
  };

  /* ===============================
     FETCH MENU
  =============================== */
  useEffect(() => {
    api.get("/api/menu").then((res) => {
      const grouped = {};

      res.data.forEach((item) => {
        if (!categoryIcons[item.category]) return;

        if (!grouped[item.category]) {
          grouped[item.category] = {
            icon: categoryIcons[item.category],
            items: [],
          };
        }

        grouped[item.category].items.push(item);
      });

      setMenuData(grouped);
      setCategory(Object.keys(grouped)[0]);
    });
  }, []);

  /* ===============================
     UI
  =============================== */
  return (
    <div
      className="menu-page"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="menu-overlay"></div>

      <div className="menu-content">
        <h1 className="menu-title">Our Menu</h1>

        {/* CATEGORY BUTTONS */}
        <div className="menu-categories">
          {Object.keys(menuData).map((cat) => (
            <button
              key={cat}
              className={`category-btn ${
                category === cat ? "active" : ""
              }`}
              onClick={() => setCategory(cat)}
            >
              <span className="icon">{menuData[cat].icon}</span>
              {cat}
            </button>
          ))}
        </div>

        {/* MENU ITEMS */}
        <div className="menu-items">
          {menuData[category]?.items.map((item) => {
            // ✅ Decide correct image URL
            const imageSrc = item.image_url
              ? item.image_url.startsWith("/uploads")
                ? `${API_URL}${item.image_url}` // backend image
                : item.image_url // frontend static image
              : null;

            return (
              <div className="menu-card" key={item.id}>
                {/* IMAGE (OPTIONAL) */}
                {imageSrc && (
                  <img
                    src={imageSrc}
                    alt={item.name}
                    className="menu-image"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                )}

                <h2>{item.name}</h2>
                <span>${item.price}</span>

                <button
                  className="add-btn"
                  onClick={() =>
                    addToCart({
                      id: item.id,
                      name: item.name,
                      price: Number(item.price),
                      image: imageSrc,
                    })
                  }
                >
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>

        {/* BACK BUTTON */}
        <Link to="/" className="back-btn">
          <FaArrowLeft /> Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Menu;
