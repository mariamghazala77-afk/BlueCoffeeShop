import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Style/AdminOrders.css";

function AdminOrders() {
  // ===============================
  // STATE
  // ===============================
  // Stores all active orders (pending / preparing)
  const [orders, setOrders] = useState([]);

  // ===============================
  // NAVIGATION
  // ===============================
  const navigate = useNavigate();

  // Logout admin and redirect to login page
  const logout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin/login");
  };

  // ===============================
  // FETCH ACTIVE ORDERS (ADMIN)
  // ===============================
  const fetchOrders = async () => {
    const res = await axios.get(
      "api/orders/admin"
    );
    setOrders(res.data);
  };

  // Load orders once page opens
  useEffect(() => {
    fetchOrders();
  }, []);

  // ===============================
  // UPDATE ORDER STATUS
  // ===============================
  const updateStatus = async (id, status) => {
    await axios.put(
      `api/orders/${id}/status`,
      { status }
    );

    // Reload orders after update
    // ✅ If status becomes "completed", it disappears
    // because backend returns only active orders
    fetchOrders();
  };

  // ===============================
  // WHATSAPP NOTIFICATION
  // ===============================
  const notifyWhatsApp = (phone, name) => {
    // Ensure country code (example: Lebanon = 961)
    const formattedPhone = phone.startsWith("961")
      ? phone
      : `961${phone}`;

    // Message sent to customer
    const message = `Hello ${name} 👋
Your order from Blue Coffee Shop ☕ is ready!
Thank you for choosing us 💙`;

    // Open WhatsApp Web with pre-filled message
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="admin-orders-page">
      <div className="admin-orders-card">

        {/* ===============================
            HEADER
        =============================== */}
        <div className="admin-orders-header">
          <h1 className="admin-title">Admin Orders</h1>

          <div className="admin-orders-buttons">
            {/* Back to menu management */}
            <button
              className="back-menu-btn"
              onClick={() => navigate("/admin/menu")}
            >
              Back to Menu
            </button>

            {/* Logout */}
            <button
              className="logout-btn"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>

        {/* ===============================
            ORDERS LIST
        =============================== */}
        {orders.length === 0 ? (
          <p className="no-orders">No active orders</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="order-card">

              {/* Order information */}
              <div className="order-info">
                <p><b>Name:</b> {order.customer_name}</p>
                <p><b>Phone:</b> {order.customer_phone}</p>
                <p><b>Total:</b> ${order.total_price}</p>
                <p><b>Status:</b> {order.status}</p>
              </div>

              {/* Order actions */}
              <div className="order-actions">

                {/* From pending → preparing */}
                {order.status === "pending" && (
                  <button
                    className="prepare-btn"
                    onClick={() =>
                      updateStatus(order.id, "preparing")
                    }
                  >
                    Mark Preparing
                  </button>
                )}

                {/* From preparing → completed + WhatsApp */}
                {order.status === "preparing" && (
                  <>
                    <button
                      className="complete-btn"
                      onClick={() =>
                        updateStatus(order.id, "completed")
                      }
                    >
                      Mark Completed
                    </button>

                    <button
                      className="whatsapp-btn"
                      onClick={() =>
                        notifyWhatsApp(
                          order.customer_phone,
                          order.customer_name
                        )
                      }
                    >
                      Notify via WhatsApp
                    </button>
                  </>
                )}
              </div>

            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default AdminOrders;
