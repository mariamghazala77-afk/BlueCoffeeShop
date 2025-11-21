import React, { useContext, useState } from "react";
import { CartContext } from "../Context/CartContext";
import { Link } from "react-router-dom";
import "../Style/Cart.css";
import {
  FaArrowLeft,
  FaTrash,
  FaPlus,
  FaMinus,
  FaShoppingCart,
  FaCheckCircle,
} from "react-icons/fa";

function Cart() {
  const { cart, addToCart, removeFromCart, decreaseQty } =
    useContext(CartContext);

  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace("$", ""));
    return sum + price * item.qty;
  }, 0);

  return (
    <div className="cart-page">
      <div className="cart-overlay"></div>

      <div className="cart-content">
        <h1 className="cart-title">Your Cart</h1>

        {cart.length === 0 && (
          <div className="empty-cart-container">
            <div className="empty-cart-card">
              <FaShoppingCart className="empty-cart-icon" />
              <h2>Your cart is empty</h2>
              <p>Add delicious items from our menu 🤍</p>

              <Link to="/menu" className="cart-back-btn">
                <FaArrowLeft style={{ marginRight: "8px" }} />
                Back to Menu
              </Link>
            </div>
          </div>
        )}

        {cart.length > 0 && (
          <div className="cart-items-grid">
            {cart.map((item, i) => (
              <div className="cart-card" key={i}>
                <h2>{item.name}</h2>

                <span className="cart-price">{item.price}</span>

                <div className="qty-controls">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="qty-btn"
                  >
                    <FaMinus />
                  </button>

                  <span className="qty-number">{item.qty}</span>

                  <button
                    onClick={() => addToCart(item)}
                    className="qty-btn"
                  >
                    <FaPlus />
                  </button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  <FaTrash /> Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {cart.length > 0 && (
          <div className="cart-total-box">
            <h2>Total: ${total.toFixed(2)}</h2>

            {/* ⭐ LEFT-ALIGNED BUTTONS */}
            <div className="cart-buttons">
              {!orderPlaced && (
                <button
                  className="order-btn"
                  onClick={() => setOrderPlaced(true)}
                >
                  Place Order
                </button>
              )}

              <Link to="/" className="cart-back-btn">
                <FaArrowLeft style={{ marginRight: "8px" }} />
                Back to Home
              </Link>
            </div>

            {/* ⭐ ORDER MESSAGE */}
            {orderPlaced && (
              <div className="order-message">
                <FaCheckCircle className="order-icon" />
                <h3>Your order has been placed!</h3>
                <p>We will start preparing it shortly.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;





