import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Style/AdminLogin.css";

/*
  AdminLogin Page
  ----------------
  - Allows admin to log in
  - Sends email & password to backend
  - On success → saves login flag in localStorage
  - Redirects to Admin Menu page
*/

function AdminLogin() {
  // ===============================
  // STATE
  // ===============================
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // ===============================
  // HANDLE LOGIN
  // ===============================
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Send login request to backend
      const res = await axios.post(
        "api/admin/login",
        {
          email,
          password,
        }
      );

      // ✅ If login is successful
      if (res.data.success) {
        // Save admin login flag
        localStorage.setItem("adminLoggedIn", "true");

        // Redirect to admin menu management page
        navigate("/admin/menu");
      }
    } catch (err) {
      // ❌ Invalid credentials
      setError("Invalid email or password");
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h1 className="admin-login-title">Admin Login</h1>

        <form onSubmit={handleLogin} className="admin-login-form">
          {/* EMAIL INPUT */}
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* PASSWORD INPUT */}
          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* ERROR MESSAGE */}
          {error && <p className="admin-error">{error}</p>}

          {/* LOGIN BUTTON */}
          <button type="submit" className="admin-login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
