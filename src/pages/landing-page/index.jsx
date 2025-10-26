// @ts-nocheck
import React, { useState } from "react";
import Header from "../../components/ui/Header.jsx";
import HeroSection from "../../pages/equipment-catalog/components/HeroSection.jsx";
import Footer from "../../components/ui/Footer.jsx";
import EquipmentList from "./components/EquipmentList";
import { mockEquipment } from "../../data/equipment-data.js";

const LandingPage = () => {
  const [cartCount, setCartCount] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <Header cartCount={cartCount} />

      {/* Hero Section */}
      <main className="pt-16 flex flex-col gap-8">
        <HeroSection />
        <div>
          <h2 className="text-xl font-bold mb-4 text-center">
            Available Equipment
          </h2>
          <EquipmentList equipmentData={mockEquipment} />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
