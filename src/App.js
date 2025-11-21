import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { AnimatePresence } from "framer-motion";
import ScrollToTop from "./Components/ScrollToTop";
import FloatingCart from "./Components/FloatingCart";

// ⭐ Loader (You imported it, but never SHOWED it)
import Loader from "./Components/Loader";

// Pages
import Home from "./Pages/Home";
import Menu from "./Pages/Menu";
import VisitUs from "./Pages/VisitUs";
import About from "./Pages/About";
import Services from "./Pages/Services";
import Cart from "./Pages/Cart";

import "./Style/Responsive.css";
import { CartProvider } from "./Context/CartContext";

/* Animation Routes */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/visit" element={<VisitUs />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  // ⭐ Show loader for 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <FloatingCart />

        {/* ⭐ SHOW LOADER WHEN loading === true */}
        {loading ? (
          <Loader />
        ) : (
          <AnimatedRoutes />
        )}
      </Router>
    </CartProvider>
  );
}

export default App;










