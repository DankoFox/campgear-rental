import React, { createContext, useState, useContext } from "react";

// Create the context
const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add item to cart
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((i) => i.id === item.id);
      if (existing) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  // Remove item
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((i) => i.id !== id));
  };

  // Clear
  const clearCart = () => setCartItems([]);

  const updateQuantity = (id, quantity) => {
  setCartItems((prevItems) =>
    prevItems.map((i) => (i.id === id ? { ...i, quantity } : i))
  );
};

const updateDates = (id, startDate, endDate) => {
  setCartItems((prevItems) =>
    prevItems.map((i) =>
      i.id === id ? { ...i, startDate, endDate } : i
    )
  );
};


  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        updateDates,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
