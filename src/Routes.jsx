import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";

import ShoppingCart from "./pages/shopping-cart";
import EquipmentCatalog from "./pages/equipment-catalog";

// Not yet copied pages
// import LoginPage from "./pages/login";
// import UserDashboard from "./pages/user-dashboard";
// import EquipmentDetails from "./pages/equipment-details";
// import RegisterPage from "./pages/register";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Define your route here */}
          <Route path="/" element={<EquipmentCatalog />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
          <Route path="/equipment-catalog" element={<EquipmentCatalog />} />
          {/* <Route path="/login" element={<LoginPage />} /> */}
          {/* <Route path="/user-dashboard" element={<UserDashboard />} /> */}
          {/* <Route path="/equipment-details" element={<EquipmentDetails />} /> */}
          {/* <Route path="/register" element={<RegisterPage />} /> */}
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
