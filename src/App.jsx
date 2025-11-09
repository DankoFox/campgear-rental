import React, { useState, useEffect } from "react";
import AppRoutes from "./Routes";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  // Load cart data from localStorage on initial load
  useEffect(() => {
    const storedCartCount = localStorage.getItem("cartCount");
    const storedCartItems = localStorage.getItem("cartItems");

    if (storedCartCount && storedCartItems) {
      setCartCount(Number(storedCartCount));
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  // Save cart data to localStorage when cart state changes
  useEffect(() => {
    localStorage.setItem("cartCount", cartCount);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartCount, cartItems]);

  const addToCart = (item) => {
    if (!item || !item.id) {
      console.warn("Cannot add item without ID:", item);
      return;
    }

    console.log("🛒 addToCart called with:", item);

    const productPrice = Number(item.price) || 0;

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === item.id);

      if (existing) {
        return prev.map((p) =>
          p.id === item.id
            ? {
                ...p,
                quantity: p.quantity + 1,
                orderPrice: (p.quantity + 1) * productPrice,
              }
            : p
        );
      } else {
        return [
          ...prev,
          {
            ...item,
            productPrice,
            quantity: 1,
            orderPrice: productPrice,
            startDate: today.toISOString().split("T")[0],
            endDate: tomorrow.toISOString().split("T")[0],
          },
        ];
      }
    });

    setCartCount((count) => count + 1);
  };

  return (
    <AppRoutes
      cartCount={cartCount}
      setCartCount={setCartCount}
      cartItems={cartItems}
      setCartItems={setCartItems}
      addToCart={addToCart} // pass this down to all pages
    />
  );
}

export default App;
