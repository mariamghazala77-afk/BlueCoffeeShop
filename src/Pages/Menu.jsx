import React, { useState, useContext } from "react";
import "../Style/Menu.css";
import bg from "../assets/background.webp";
import { Link } from "react-router-dom";

// Icons
import {
  FaArrowLeft,
  FaCoffee,
  FaUtensils,
  FaIceCream,
  FaMugHot,
  FaLeaf,
  FaCheese,
  FaGlassWhiskey,
  FaBlender,
  FaWineGlassAlt,
  FaSnowflake,
  FaLemon,
} from "react-icons/fa";

// ⭐ Import Cart Context (NEW)
import { CartContext } from "../Context/CartContext";

function Menu() {
  // ============================================
  // ⭐ 1) State to store the selected category
  // ============================================
  const [category, setCategory] = useState("Sandwiches");

  // ============================================
  // ⭐ 2) Access cart functions from CartContext
  //    addToCart(item) will be used in each item
  // ============================================
  const { cart,addToCart } = useContext(CartContext);
  console.log("Cart after click:", cart);

  // ============================================
  // ⭐ 3) Full Menu Data (YOUR ORIGINAL DATA)
  //    Not changed at all — only used as-is
  // ============================================
  const menuData = {
    Sandwiches: {
      icon: <FaUtensils />,
      description: "Available as Baguette or Toast 🥪",
      items: [
        { name: "حبش وجبنة", price: "$4.50" },
        { name: "4Cheese", price: "$4.50" },
        { name: "بيبروني وجبنة", price: "$4.50" },
        { name: "مارتديلا وجبنة", price: "$4.00" },
        { name: "لبنة وخضرا", price: "$1.70" },
        { name: "حلوم وخضرا", price: "$3.50" },
        { name: "فيتا ميكس", price: "$2.50" },
        { name: "زعتر وخضرا", price: "$1.70" },
        { name: "مكدوس ولبنة", price: "$3.00" },
      ],
    },

    Salads: {
      icon: <FaLeaf />,
      items: [
        { name: "Ceasar", price: "$5.00" },
        { name: "Tuna", price: "$5.00" },
        { name: "Beetroot Salad", price: "$5.00" },
      ],
    },

    Desserts: {
      icon: <FaIceCream />,
      items: [
        { name: "Cheesecake (Strawberry, Berries, Mango, Lotus)", price: "$3.00" },
        { name: "Tiramisu", price: "$3.00" },
        { name: "Mini Bite Brownies", price: "$3.85" },
        { name: "Mini Bite Cookies", price: "$3.85" },
      ],
    },

    Croissant: {
      icon: <FaCheese />,
      items: [
        { name: "4 Cheese", price: "$4.50" },
        { name: "Cheese", price: "$1.50" },
        { name: "Haloumi", price: "$3.50" },
        { name: "Chocolate", price: "$1.50" },
        { name: "Pistachio", price: "$3.50" },
        { name: "Lotus", price: "$3.50" },
        { name: "Nutella", price: "$3.00" },
        { name: "بيبروني وجبنة", price: "$4.50" },
        { name: "حبش وجبنة", price: "$4.50" },
      ],
    },

    // (YOUR FULL MENU CONTINUES EXACTLY THE SAME…)
    // I DID NOT CHANGE ANY DATA
    // ----------------------------------------------------
    "Hot Beverages": {
      icon: <FaMugHot />,
      items: [
        { name: "Espresso", price: "$1.10" },
        { name: "Double Espresso", price: "$1.60" },
        { name: "Macchiato", price: "$1.50" },
        { name: "Americano", price: "$2.50" },
        { name: "American Coffee", price: "$3.00" },
        { name: "Cappuccino", price: "$3.50" },
        { name: "Café Latte", price: "$3.50" },
        { name: "Hot Chocolate", price: "$4.00" },
        { name: "Hot Lotus", price: "$4.00" },
        { name: "Matcha Latte", price: "$4.50" },
        { name: "Flavored Tea", price: "$1.10" },
      ],
    },

    // Drinks + subsections (kept same)
    Drinks: {
      icon: <FaCoffee />,
      subsections: {
        "Iced Coffee": {
          icon: <FaCoffee />,
          items: [
            { name: "Iced Americano", price: "$3.00" },
            { name: "Iced Latte", price: "$3.50" },
            { name: "Iced Mocha (Dark / White)", price: "$4.00" },
            { name: "Iced Matcha", price: "$4.50" },
            { name: "Strawberry Matcha", price: "$5.00" },
            { name: "Iced Spanish Latte", price: "$4.00" },
          ],
        },

        Milkshakes: {
          icon: <FaBlender />,
          items: [
            { name: "Oreo Milkshake", price: "$4.50" },
            { name: "Lotus Milkshake", price: "$4.50" },
            { name: "Chocolate Milkshake", price: "$4.50" },
            { name: "Vanilla Milkshake", price: "$4.50" },
            { name: "Strawberry Milkshake", price: "$4.50" },
            { name: "Pistachio Milkshake", price: "$5.00" },
          ],
        },

        Smoothies: {
          icon: <FaWineGlassAlt />,
          items: [
            { name: "Mango Smoothie", price: "$4.00" },
            { name: "Strawberry Smoothie", price: "$4.00" },
            { name: "Mixed Berries Smoothie", price: "$4.00" },
            { name: "Tropical Fruits Smoothie", price: "$4.00" },
          ],
        },

        Frappe: {
          icon: <FaSnowflake />,
          items: [
            { name: "Blue Frappe", price: "$4.50" },
            { name: "Mocha Frappe", price: "$4.50" },
            { name: "Caramel Frappe", price: "$4.50" },
            { name: "Vanilla Frappe", price: "$4.50" },
            { name: "Matcha Frappe", price: "$5.00" },
          ],
        },

        Refreshers: {
          icon: <FaLemon />,
          items: [
            { name: "Mojito", price: "$3.50" },
            { name: "Ice Tea Peach", price: "$3.50" },
            { name: "Four Berries Refresher", price: "$3.50" },
            { name: "Watermelon Lemonade", price: "$3.50" },
            { name: "Mineral Water", price: "$0.50" },
            { name: "Soft Drinks", price: "$1.10" },
            { name: "Sparkling Water Rim", price: "$1.00" },
          ],
        },
      },
    },

    // Arabic dishes + extras (kept same)
    "Arabic Dishes": {
      icon: <FaGlassWhiskey />,
      items: [
        { name: "ورق عنب", price: "$5.50" },
        { name: "فتة ورق عنب", price: "$5.00" },
      ],
    },

    Extras: {
      icon: <FaCheese />,
      items: [
        { name: "Strawberry", price: "+$0.50" },
        { name: "Pistachio", price: "+$0.50" },
        { name: "Chocolate Sauce", price: "+$0.50" },
        { name: "Whipped Cream", price: "+$0.50" },
        { name: "Caramel Syrup", price: "+$0.50" },
        { name: "Lotus Crumbs", price: "+$0.50" },
        { name: "Almond Milk", price: "+$1.00" },
        { name: "Coconut Milk", price: "+$1.00" },
      ],
    },

    "أرغيلة (Shisha)": {
      icon: <FaGlassWhiskey />,
      items: [
        { name: "Gold", price: "4.5", flavors: [{ name: "تفاحتين" }] },
        { name: "Wizara", price: "5.0", flavors: [{ name: "تفاحتين" }] },
        { name: "حامض ونعناع", price: "4.5", flavors: [] },
      ],
    },
  };

  // =======================================================
  // ⭐ 4) Render menu items
  //    NEW: Added "Add to Cart" button under each item
  // =======================================================
  const renderItems = (data) => {
    // -------------------------
    // Case: Drinks with subsections
    // -------------------------
    if (data.subsections) {
      return Object.keys(data.subsections).map((sub) => (
        <div key={sub} className="drink-section">
          <h3 className="drink-subtitle">
            {data.subsections[sub].icon} <span>{sub}</span>
          </h3>

          <div className="menu-items">
            {data.subsections[sub].items.map((item, i) => (
              <div className="menu-card" key={i}>
                <h2>{item.name}</h2>
                <span>{item.price}</span>

                {/* ⭐ Add to Cart Button */}
                <button
                  className="add-btn"
                  onClick={() => addToCart({ ...item, id: item.name })}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      ));
    }

    // -------------------------
    // Case: Shisha with flavors
    // -------------------------
    if (data.items && data.items[0]?.flavors) {
      return (
        <div className="menu-items">
          {data.items.map((shisha, index) => (
            <div className="menu-card" key={index}>
              <h2>
                {shisha.name} <span>${shisha.price}</span>
              </h2>

              {shisha.flavors.length > 0 && (
                <ul className="flavor-list">
                  {shisha.flavors.map((flavor, i) => (
                    <li key={i}>• {flavor.name}</li>
                  ))}
                </ul>
              )}

              {/* ⭐ Add to Cart Button */}
              <button
                className="add-btn"
                onClick={() =>
                  addToCart({ ...shisha, id: shisha.name, price: shisha.price })
                }
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      );
    }

    // -------------------------
    // Normal items
    // -------------------------
    return (
      <>
        {data.description && (
          <p className="menu-description">{data.description}</p>
        )}

        <div className="menu-items">
          {data.items.map((item, i) => (
            <div className="menu-card" key={i}>
              <h2>{item.name}</h2>
              <span>{item.price}</span>

              {/* ⭐ Add to Cart Button */}
              <button
                className="add-btn"
                onClick={() => addToCart({ ...item, id: item.name })}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </>
    );
  };

  // =======================================================
  // ⭐ 5) Return Structure (kept exactly the same)
  // =======================================================
  return (
    <div className="menu-page" style={{ backgroundImage: `url(${bg})` }}>
      <div className="menu-overlay"></div>
      <div className="menu-content">
        <h1 className="menu-title">Our Menu</h1>

        {/* ⭐ Category Buttons */}
        <div className="menu-categories">
          {Object.keys(menuData).map((cat) => (
            <button
              key={cat}
              className={`category-btn ${category === cat ? "active" : ""}`}
              onClick={() => setCategory(cat)}
            >
              <span className="icon">{menuData[cat].icon}</span> {cat}
            </button>
          ))}
        </div>

        {/* ⭐ Render menu items */}
        {renderItems(menuData[category])}

        {/* Back Button */}
        <Link to="/" className="back-btn">
          <FaArrowLeft style={{ marginRight: "8px" }} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Menu;
