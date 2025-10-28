import React, { useState } from "react";
import AppRoutes from "./Routes";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  return (
    <AppRoutes
      cartCount={cartCount}
      setCartCount={setCartCount}
      cartItems={cartItems}
      setCartItems={setCartItems}
    />
  );
}

export default App;
