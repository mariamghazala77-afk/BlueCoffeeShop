import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "../Style/FloatingCart.css";

function FloatingCart() {
  const { cart } = useContext(CartContext);

  // Count total items (qty)
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <Link to="/cart" className="floating-cart">
      <FaShoppingCart size={22} />
      {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
    </Link>
  );
}

export default FloatingCart;
