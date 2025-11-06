// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Components
import HeroSection from "../../pages/equipment-catalog/components/HeroSection.jsx";
import Button from "../../components/ui/Button.jsx";
import Image from "../../components/AppImage.jsx";
import CategoryCard from "./components/CategoryCard.jsx";
import SeasonalCard from "./components/SeasonalCard.jsx";

// Constants
const CATEGORY_IMAGES = {
  Tent: "public/assets/imgs/tent-a.png",
  Cooking: "public/assets/imgs/cooking-a.png",
  Sleeping: "public/assets/imgs/sleeping-c.png",
  Tools: "public/assets/imgs/tool-a.png",
  Trekkingpoles: "public/assets/imgs/trekking-a.png",
  Backpacks: "public/assets/imgs/backpack-a.png",
  Lighting: "public/assets/imgs/light-c.png",
  Purifier: "public/assets/imgs/purifier-b.png",
};

// Utility component for horizontal scroll grid
const HorizontalGrid = ({ children }) => (
  <div className="overflow-x-auto">
    <div
      className="
        grid grid-flow-col 
        auto-cols-[minmax(280px,1fr)] sm:auto-cols-[minmax(300px,1fr)] 
        md:auto-cols-[minmax(340px,1fr)] lg:auto-cols-[minmax(380px,1fr)]
        gap-8 
        snap-x snap-mandatory
        px-2 pb-4
      "
    >
      {children}
    </div>
  </div>
);

const LandingPage = ({ addToCart }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const [types, setTypes] = useState([]);
  const [seasonalCombos, setSeasonalCombos] = useState([]);
  const [equipments, setEquipments] = useState([]);

  const [loadingTypes, setLoadingTypes] = useState(false);
  const [loadingCombos, setLoadingCombos] = useState(false);
  const [loadingEquipments, setLoadingEquipments] = useState(false);

  // --- Fetch types ---
  useEffect(() => {
    const fetchTypes = async () => {
      setLoadingTypes(true);
      try {
        const res = await fetch("http://localhost:5050/api/types");
        if (!res.ok) throw new Error("Failed to fetch types");
        setTypes(await res.json());
      } catch (err) {
        console.error("Error fetching types:", err);
      } finally {
        setLoadingTypes(false);
      }
    };
    fetchTypes();
  }, []);

  // --- Fetch combos ---
  useEffect(() => {
    const fetchCombos = async () => {
      setLoadingCombos(true);
      try {
        const res = await fetch("http://localhost:5050/api/combo");
        if (!res.ok) throw new Error("Failed to fetch combos");
        setSeasonalCombos(await res.json());
      } catch (err) {
        console.error("Error fetching combos:", err);
      } finally {
        setLoadingCombos(false);
      }
    };
    fetchCombos();
  }, []);

  // --- Fetch equipments ---
  useEffect(() => {
    const fetchEquipments = async () => {
      setLoadingEquipments(true);
      try {
        const res = await fetch("http://localhost:5050/api/equipment");
        if (!res.ok) throw new Error("Failed to fetch equipments");
        setEquipments(await res.json());
      } catch (err) {
        console.error("Error fetching equipments:", err);
      } finally {
        setLoadingEquipments(false);
      }
    };
    fetchEquipments();
  }, []);

  // --- Handlers ---
  const handleSearch = () => {
    navigate(`/equipment-catalog?search=${searchTerm}`);
  };

  const handleCategoryClick = (type) => {
    const normalized = type.toLowerCase().replace(/\s+/g, "");
    navigate(`/equipment-catalog?category=${normalized}`);
  };

  const handleAddCombo = (combo) => {
    if (Array.isArray(combo["items-list"])) {
      combo["items-list"].forEach((id) => {
        const equipment = equipments.find((eq) => String(eq.id) === String(id));

        if (equipment) {
          addToCart(equipment);
        } else {
          console.warn(
            `! Equipment with ID ${id} not found for combo ${combo.name}`,
          );
        }
      });
    } else {
      console.warn("! Combo items-list is not an array:", combo);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="flex flex-col gap-10">
        {/* Hero */}
        <HeroSection
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
        />

        {/* Categories */}
        <section className="px-6">
          <h2 className="text-xl font-bold mb-6 text-center">Categories</h2>
          {loadingTypes ? (
            <p className="text-center text-muted-foreground">
              Loading categories...
            </p>
          ) : (
            <HorizontalGrid>
              {types.map((type) => (
                <div key={type} className="snap-center">
                  <CategoryCard
                    title={type}
                    image={CATEGORY_IMAGES[type] || "/assets/imgs/default.jpg"}
                    onClick={() => handleCategoryClick(type)}
                  />
                </div>
              ))}
            </HorizontalGrid>
          )}
        </section>

        {/* Seasonal Combos */}
        <section className="px-6">
          {loadingTypes ? (
            <p className="text-center text-muted-foreground">
              Loading categories...
            </p>
          ) : (
            <div className="overflow-x-auto">
              <div
                className="
          grid grid-flow-col 
          auto-cols-[minmax(280px,1fr)] sm:auto-cols-[minmax(300px,1fr)] 
          md:auto-cols-[minmax(340px,1fr)] lg:auto-cols-[minmax(380px,1fr)]
          gap-8 
          snap-x snap-mandatory
          px-2 pb-4
        "
              >
                {types.map((type) => (
                  <div key={type} className="snap-center">
                    <CategoryCard
                      title={type}
                      image={
                        CATEGORY_IMAGES[type] ||
                        "public/assets/imgs/default.jpg"
                      }
                      onClick={() => handleCategoryClick(type)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <section className="px-6">
          <h2 className="text-xl font-bold mb-6 text-center">
            Seasonal Combos
          </h2>

          {loadingCombos || loadingEquipments ? (
            <p className="text-center text-muted-foreground">
              Loading combos...
            </p>
          ) : seasonalCombos.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No combos available
            </p>
          ) : (
            <HorizontalGrid>
              {seasonalCombos.map((combo) => (
                <div key={combo.id || combo.name} className="snap-center">
                  <SeasonalCard
                    image={combo.image || "/assets/imgs/default.jpg"}
                    title={combo.name}
                    description={
                      combo.description ||
                      `${combo["items-list"]?.length || 0} items in this combo`
                    }
                    onAddToCart={() => handleAddCombo(combo)}
                  />
                </div>
              ))}
            </HorizontalGrid>
          )}
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
