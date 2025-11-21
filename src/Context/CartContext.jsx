import { createContext, useState } from "react";

// Create the Cart Context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ================================
  // Add item to cart
  // ================================
  const addToCart = (item) => {
    const exist = cart.find((x) => x.id === item.id);

    if (exist) {
      // If item already exists → increase qty
      setCart(
        cart.map((x) =>
          x.id === item.id ? { ...x, qty: x.qty + 1 } : x
        )
      );
    } else {
      // If new item → add to cart with qty = 1
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  // ================================
  // Decrease quantity
  // ================================
  const decreaseQty = (id) => {
    const exist = cart.find((x) => x.id === id);

    if (exist.qty === 1) {
      // If qty becomes 0 → remove item completely
      removeFromCart(id);
    } else {
      setCart(
        cart.map((x) =>
          x.id === id ? { ...x, qty: x.qty - 1 } : x
        )
      );
    }
  };

  // ================================
  // Remove item completely
  // ================================
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, decreaseQty }}
    >
      {children}
    </CartContext.Provider>
  );
};
