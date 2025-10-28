import React, { useState } from "react";
import AppRoutes from "./Routes";

function App() {
  const [cartCount, setCartCount] = useState(0);
  return <AppRoutes cartCount={cartCount} setCartCount={setCartCount} />;
}

export default App;
