// @ts-nocheck
import React, { useState, useEffect } from "react";
import HeroSection from "../../pages/equipment-catalog/components/HeroSection.jsx";
import Footer from "../../components/ui/Footer.jsx";
import { mockEquipment } from "../../data/equipment-data.js";
import Button from "../../components/ui/Button.jsx";
import Image from "../../components/AppImage.jsx";
import { useNavigate } from "react-router-dom";
import CategoryCard from "./components/CategoryCard.jsx";

const LandingPage = ({ addToCart }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [types, setTypes] = useState([]);
  const [loadingTypes, setLoadingTypes] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTypes = async () => {
      setLoadingTypes(true);
      try {
        const response = await fetch("http://localhost:5050/api/types");
        if (!response.ok) throw new Error("Failed to fetch types");
        const data = await response.json();
        setTypes(data);
      } catch (error) {
        console.error("Error fetching types:", error);
      } finally {
        setLoadingTypes(false);
      }
    };
    fetchTypes();
  }, []);

  const categoryImages = {
    Tent: "public/assets/imgs/tent-a.png",
    Cooking: "public/assets/imgs/cooking-a.png",
    Sleeping: "public/assets/imgs/sleeping-c.png",
    Tools: "public/assets/imgs/tool-a.png",
    Trekkingpoles: "public/assets/imgs/trekking-a.png",
    Backpacks: "public/assets/imgs/backpack-a.png",
    Lighting: "public/assets/imgs/light-c.png",
    Purifier: "public/assets/imgs/purifier-b.png",
  };

  const brands = [...new Set(mockEquipment.map((item) => item.brand))];
  const equipmentByBrand = {};
  mockEquipment.forEach((item) => {
    if (!equipmentByBrand[item.brand]) equipmentByBrand[item.brand] = [];
    equipmentByBrand[item.brand].push(item);
  });

  const handleAddAll = (brandName) => {
    const items = equipmentByBrand[brandName] || [];
    items.forEach((item) => addToCart(item));
  };

  const getBrandImage = (sampleItem) => {
    if (!sampleItem) return null;
    const img = sampleItem.image;
    if (!img) return null;
    return Array.isArray(img) ? img[0] : img;
  };

  const handleSearch = () => {
    navigate(`/equipment-catalog?search=${searchTerm}`);
  };

  const handleCategoryClick = (type) => {
    const normalizedType = type.toLowerCase().replace(/\s+/g, "");
    navigate(`/equipment-catalog?category=${normalizedType}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="flex flex-col gap-10">
        <HeroSection
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
        />

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
                        categoryImages[type] || "public/assets/imgs/default.jpg"
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
            Available Brands
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {brands.map((brand) => {
              const sampleItem = equipmentByBrand[brand]?.[0];
              const imgSrc = getBrandImage(sampleItem);
              return (
                <div
                  key={brand}
                  className="p-6 border rounded-xl bg-card shadow-sm flex flex-col items-center gap-4 hover:shadow-lg transition"
                >
                  {imgSrc ? (
                    <Image
                      src={imgSrc}
                      alt={brand}
                      className="w-full h-40 object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-full h-40 bg-muted rounded-md flex items-center justify-center">
                      <span className="text-sm text-muted-foreground">
                        No image
                      </span>
                    </div>
                  )}
                  <h3 className="text-lg font-semibold">{brand}</h3>
                  <p className="text-sm text-muted-foreground">
                    {equipmentByBrand[brand]?.length || 0} item
                    {equipmentByBrand[brand]?.length > 1 ? "s" : ""}
                  </p>
                  {sampleItem?.price && (
                    <p className="text-sm text-muted-foreground">
                      From{" "}
                      <span className="font-bold text-foreground">
                        {sampleItem.price.toLocaleString()}₫
                      </span>
                    </p>
                  )}
                  <Button
                    onClick={() => handleAddAll(brand)}
                    className="w-full mt-2"
                    variant="secondary"
                  >
                    Add All {brand} Products
                  </Button>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
