import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Components
import ScrollToTop from "./Components/ScrollToTop";
import FloatingCart from "./Components/FloatingCart";
import Loader from "./Components/Loader";

// Client Pages
import Home from "./Pages/Home";
import Menu from "./Pages/Menu";
import VisitUs from "./Pages/VisitUs";
import About from "./Pages/About";
import Services from "./Pages/Services";
import Cart from "./Pages/Cart";

// Admin Pages
import AdminLogin from "./Pages/AdminLogin";
import AdminMenu from "./Pages/AdminMenu";
import AdminOrders from "./Pages/AdminOrders";

// Route protection
import AdminRoute from "./routes/AdminRoute";

// Context
import { CartProvider } from "./Context/CartContext";

// Styles
import "./Style/Responsive.css";

/* ===============================
   Animated Routes
================================ */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* CLIENT */}
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/visit" element={<VisitUs />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/cart" element={<Cart />} />

        {/* ADMIN */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/menu"
          element={
            <AdminRoute>
              <AdminMenu />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

/* ===============================
   App Wrapper
================================ */
function AppWrapper() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      {!isAdminPage && <FloatingCart />}
      <AnimatedRoutes />
    </>
  );
}

/* ===============================
   Main App
================================ */
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <CartProvider>
      <Router>
        {loading ? <Loader /> : <AppWrapper />}
      </Router>
    </CartProvider>
  );
}

export default App;
