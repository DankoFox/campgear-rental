// @ts-nocheck
import React, { useState, useEffect } from "react";
import HeroSection from "../../pages/equipment-catalog/components/HeroSection.jsx";
import Footer from "../../components/ui/Footer.jsx";
import EquipmentList from "./components/EquipmentList";

const LandingPage = () => {
  const [equipmentData, setEquipmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch equipment data from API
  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await fetch("http://localhost:5050/api/equipment");
        if (!response.ok) {
          throw new Error("Failed to fetch equipment data");
        }
        const data = await response.json();
        setEquipmentData(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, []);

  if (loading)
    return <div className="text-center mt-8">Loading equipment...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between">
      {/* Hero Section */}
      <main className="flex flex-col gap-8">
        <HeroSection />
        <div>
          <h2 className="text-xl font-bold mb-4 text-center">
            Available Equipment
          </h2>
          <EquipmentList equipmentData={equipmentData} />
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
