import React, { useContext, useState } from "react";
import axios from "axios";
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
  const [showCustomerForm, setShowCustomerForm] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  // ===============================
  // Calculate total
  // ===============================
  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.qty,
    0
  );

  // ===============================
  // Confirm order (send to backend)
  // ===============================
  const confirmOrder = async () => {
    if (!customerName || !customerPhone) {
      alert("Please enter your name and phone number");
      return;
    }

    try {
      const orderItems = cart.map((item) => ({
        id: item.id,
        price: Number(item.price),
        quantity: item.qty,
      }));

      await axios.post("api/orders", {
        customer_name: customerName,
        customer_phone: customerPhone,
        items: orderItems,
      });

      setOrderPlaced(true);
      setShowCustomerForm(false);
    } catch (error) {
      console.error("Order failed:", error);
      alert("Failed to place order");
    }
  };

  return (
    <div className="cart-page">
      <div className="cart-overlay"></div>

      <div className="cart-content">
        <h1 className="cart-title">Your Cart</h1>

        {/* ===============================
            Empty Cart
        =============================== */}
        {cart.length === 0 && (
          <div className="empty-cart-container">
            <div className="empty-cart-card">
              <FaShoppingCart className="empty-cart-icon" />
              <h2>Your cart is empty</h2>

              <Link to="/menu" className="cart-back-btn">
                <FaArrowLeft /> Back to Menu
              </Link>
            </div>
          </div>
        )}

        {/* ===============================
            Cart Items
        =============================== */}
        {cart.length > 0 && (
          <>
            <div className="cart-items-grid">
              {cart.map((item) => (
                <div className="cart-card" key={item.id}>
                  <h2>{item.name}</h2>
                  <span className="cart-price">
                    ${Number(item.price).toFixed(2)}
                  </span>

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

            {/* ===============================
                TOTAL & ACTIONS
            =============================== */}
            <div className="cart-total-box">
              <h2>Total: ${total.toFixed(2)}</h2>

              {/* Show Place Order button */}
              {!showCustomerForm && !orderPlaced && (
                <button
                  className="order-btn"
                  onClick={() => setShowCustomerForm(true)}
                >
                  Place Order
                </button>
              )}

              {/* ===============================
                  CUSTOMER FORM (CARD)
              =============================== */}
              {showCustomerForm && !orderPlaced && (
                <div className="order-message">
                  <h3>Enter your details</h3>

                  <div className="customer-info">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />

                    <input
                      type="text"
                      placeholder="Phone Number"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                    />
                  </div>

                  <button className="order-btn" onClick={confirmOrder}>
                    Confirm Order
                  </button>
                </div>
              )}

              {/* ===============================
                  SUCCESS MESSAGE
              =============================== */}
              {orderPlaced && (
                <div className="order-message">
                  <FaCheckCircle className="order-icon" />
                  <h3>Your order has been placed!</h3>
                  <p>We will start preparing it shortly.</p>
                </div>
              )}

              <Link to="/" className="cart-back-btn">
                <FaArrowLeft /> Back to Home
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;



