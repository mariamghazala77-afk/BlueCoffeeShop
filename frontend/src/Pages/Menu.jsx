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
  // State
  // ===============================
  const [category, setCategory] = useState("");
  const [menuData, setMenuData] = useState({});

  const { addToCart } = useContext(CartContext);

  // ===============================
  // Icons mapping
  // ===============================
  const categoryIcons = {
    Sandwiches: <FaUtensils />,
    Desserts: <FaIceCream />,
    "Hot Beverages": <FaMugHot />,
    Croissant: <FaCheese />,
  };

  // ===============================
  // Fetch menu data
  // ===============================
  useEffect(() => {
    axios
      .get("/api/menu")
      .then((res) => {
        const groupedMenu = {};

        res.data.forEach((item) => {
          if (!categoryIcons[item.category]) return;

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ===============================
  // Render menu items
  // ===============================
  const renderItems = (data) => {
    if (!data) return null;

    return (
      <div className="menu-items">
        {data.items.map((item) => (
          <div className="menu-card" key={item.id}>
            {item.image_url && (
              <img
                src={item.image_url}
                alt={item.name}
                className="menu-image"
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
    <div className="menu-page" style={{ backgroundImage: `url(${bg})` }}>
      <div className="menu-overlay"></div>

      <div className="menu-content">
        <h1 className="menu-title">Our Menu</h1>

        <div className="menu-categories">
          {Object.keys(menuData).map((cat) => (
            <button
              key={cat}
              className={`category-btn ${
                category === cat ? "active" : ""
              }`}
              onClick={() => setCategory(cat)}
            >
              <span className="icon">{menuData[cat].icon}</span> {cat}
            </button>
          ))}
        </div>

        {renderItems(menuData[category])}

        <Link to="/" className="back-btn">
          <FaArrowLeft />
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Menu;
