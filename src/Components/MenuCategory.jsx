import React from "react";
import { FaCoffee } from "react-icons/fa";
import "../Style/Menu.css";

function MenuCategory({ title, items, icon }) {
  return (
    <div className="menu-category">
      <h3 className="drink-subtitle">
        {icon && <span className="icon">{icon}</span>} {title}
      </h3>
      <div className="menu-items">
        {items.map((item, i) => (
          <div className="menu-card" key={i}>
            <h2>{item.name}</h2>
            <span>{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuCategory;
