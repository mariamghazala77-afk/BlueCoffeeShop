import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/AdminLogin.css";
import api from "../api/axios";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/api/admin/login", {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("adminLoggedIn", "true");
        navigate("/admin/menu");
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h1 className="admin-login-title">Admin Login</h1>

        <form onSubmit={handleLogin} className="admin-login-form">
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="admin-error">{error}</p>}

          <button type="submit" className="admin-login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
