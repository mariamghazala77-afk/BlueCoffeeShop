import React, { useState, useEffect, useContext } from "react";
import "../Style/Menu.css";
import bg from "../assets/background.webp";
import { Link } from "react-router-dom";
import axios from "axios";

// Icons
import {
  FaArrowLeft,
  FaUtensils,
  FaIceCream,
  FaMugHot,
  FaCheese,
} from "react-icons/fa";

// Cart Context
import { CartContext } from "../Context/CartContext";

function Menu() {
  // ===============================
  // STATE
  // ===============================
  const [category, setCategory] = useState("");
  const [menuData, setMenuData] = useState({});

  const { addToCart } = useContext(CartContext);

  // ===============================
  // CATEGORY ICONS
  // ===============================
  const categoryIcons = {
    Sandwiches: <FaUtensils />,
    Desserts: <FaIceCream />,
    "Hot Beverages": <FaMugHot />,
    Croissant: <FaCheese />,
  };

  // ===============================
  // FETCH MENU FROM BACKEND
  // ===============================
  useEffect(() => {
    axios
      .get("/api/menu")
      .then((res) => {
        const groupedMenu = {};

        res.data.forEach((item) => {
          // Ignore unknown categories
          if (!categoryIcons[item.category]) return;

          // Create category group if not exists
          if (!groupedMenu[item.category]) {
            groupedMenu[item.category] = {
              icon: categoryIcons[item.category],
              items: [],
            };
          }

          groupedMenu[item.category].items.push(item);
        });

        setMenuData(groupedMenu);
        setCategory(Object.keys(groupedMenu)[0]);
      })
      .catch((error) => {
        console.error("Error fetching menu:", error);
      });
  }, []);

  // ===============================
  // RENDER MENU ITEMS
  // ===============================
  const renderItems = (data) => {
    if (!data) return null;

    return (
      <div className="menu-items">
        {data.items.map((item) => (
          <div className="menu-card" key={item.id}>
            {/* IMAGE — SIGNED URL FROM BACKEND */}
            {item.image_url && (
              <img
                src={item.image_url}
                alt={item.name}
                className="menu-image"
              />
            )}

            {/* ITEM NAME */}
            <h2>{item.name}</h2>

            {/* ITEM PRICE */}
            <span>${item.price}</span>

            {/* ADD TO CART */}
            <button
              className="add-btn"
              onClick={() =>
                addToCart({
                  id: item.id,
                  name: item.name,
                  price: Number(item.price),
                  image: item.image_url,
                })
              }
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    );
  };

  // ===============================
  // UI
  // ===============================
  return (
    <div
      className="menu-page"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* BACKGROUND OVERLAY */}
      <div className="menu-overlay"></div>

      {/* MAIN CONTENT */}
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
        {renderItems(menuData[category])}

        {/* BACK BUTTON */}
        <Link to="/" className="back-btn">
          <FaArrowLeft />
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Menu;
