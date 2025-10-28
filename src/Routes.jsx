// src/Routes.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";

import ShoppingCart from "./pages/shopping-cart";
import EquipmentCatalog from "./pages/equipment-catalog";
import LoginPage from "./pages/login";
import UserDashboard from "./pages/user-dashboard";
import EquipmentDetails from "./pages/equipment-details";
import RegisterPage from "./pages/register";
import LandingPage from "./pages/landing-page";
import MainLayout from "./MainLayout";

const AppRoutes = ({ cartCount, setCartCount, cartItems, setCartItems }) => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <Routes>
          {/* Routes WITH layout */}
          <Route
            path="/"
            element={
              <MainLayout cartCount={cartCount}>
                <LandingPage
                  cartCount={cartCount}
                  setCartCount={setCartCount}
                />
              </MainLayout>
            }
          />
          <Route
            path="/main"
            element={
              <MainLayout cartCount={cartCount}>
                <LandingPage />
              </MainLayout>
            }
          />
          <Route
            path="/shopping-cart"
            element={
              <MainLayout cartCount={cartCount}>
                <ShoppingCart
                  cartCount={cartCount}
                  setCartCount={setCartCount}
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                />
              </MainLayout>
            }
          />
          <Route
            path="/equipment-catalog"
            element={
              <MainLayout cartCount={cartCount}>
                <EquipmentCatalog
                  cartCount={cartCount}
                  setCartCount={setCartCount}
                  setCartItems={setCartItems}
                />
              </MainLayout>
            }
          />
          <Route
            path="/equipment-details/:id"
            element={
              <MainLayout cartCount={cartCount}>
                <EquipmentDetails />
              </MainLayout>
            }
          />

          {/* Routes WITHOUT layout */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default AppRoutes;
