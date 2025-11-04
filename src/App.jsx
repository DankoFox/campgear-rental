import React, { useState } from "react";
import AppRoutes from "./Routes";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
  // Safely get the image
  const image =
    (Array.isArray(item.image) && item.image.length > 0
      ? item.image[0]
      : item.image) ||
    (Array.isArray(item.images) && item.images.length > 0
      ? item.images[0]
      : null);

  // Ensure price is numeric
  const price = Number(item.price) || 0;

  const newItem = {
    id: item.id,
    name: item.name,
    brand: item.brand,
    price,
    image,
    quantity: 1,
  };

  setCartItems((prev) => {
    const existing = prev.find((p) => p.id === newItem.id);
    if (existing) {
      return prev.map((p) =>
        p.id === newItem.id ? { ...p, quantity: p.quantity + 1 } : p
      );
    } else {
      return [...prev, newItem];
    }
  });

  setCartCount((prev) => prev + 1);
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
