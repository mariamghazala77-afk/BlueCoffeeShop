import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/AdminOrders.css";
import api from "../api/axios";

function AdminOrders() {
  /* ===============================
     STATE
  =============================== */
  const [orders, setOrders] = useState([]);

  /* ===============================
     NAVIGATION
  =============================== */
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin/login");
  };

  /* ===============================
     FETCH ACTIVE ORDERS (ADMIN)
  =============================== */
  const fetchOrders = async () => {
    try {
      const res = await api.get("/api/orders/admin");
      setOrders(res.data);
    } catch (err) {
      console.error("FETCH ORDERS ERROR:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* ===============================
     UPDATE ORDER STATUS
  =============================== */
  const updateStatus = async (id, status) => {
    try {
      await api.put(`/api/orders/${id}/status`, { status });
      fetchOrders();
    } catch (err) {
      console.error("UPDATE STATUS ERROR:", err);
    }
  };

  /* ===============================
     WHATSAPP NOTIFICATION
  =============================== */
  const notifyWhatsApp = (phone, name) => {
    if (!phone) {
      alert("Phone number not available");
      return;
    }

    const cleanPhone = phone.replace(/\D/g, "");
    const formattedPhone = cleanPhone.startsWith("961")
      ? cleanPhone
      : `961${cleanPhone}`;

    const message = `Hello ${name} 👋
Your order from Blue Coffee Shop ☕ is ready!
Thank you for choosing us 💙`;

    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  /* ===============================
     UI
  =============================== */
  return (
    <div className="admin-orders-page">
      <div className="admin-orders-card">

        {/* HEADER */}
        <div className="admin-orders-header">
          <h1 className="admin-title">Admin Orders</h1>

          <div className="admin-orders-buttons">
            <button
              className="back-menu-btn"
              onClick={() => navigate("/admin/menu")}
            >
              Back to Menu
            </button>

            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </div>
        </div>

        {/* ORDERS LIST */}
        {orders.length === 0 ? (
          <p className="no-orders">No active orders</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="order-card">
              {/* ORDER INFO */}
              <div className="order-info">
                <p><b>Name:</b> {order.customer_name}</p>
                <p><b>Phone:</b> {order.customer_phone}</p>
                <p><b>Total:</b> ${order.total_price}</p>
                <p><b>Status:</b> {order.status}</p>
              </div>

              {/* ACTIONS */}
              <div className="order-actions">
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
