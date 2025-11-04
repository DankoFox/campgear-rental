// @ts-nocheck
import React from "react";
import HeroSection from "../../pages/equipment-catalog/components/HeroSection.jsx";
import Footer from "../../components/ui/Footer.jsx";
import { mockEquipment } from "../../data/equipment-data.js";
// import { mockEquipment } from "backend/data/equipment-data.json"
import Button from "../../components/ui/Button.jsx";
import Image from "../../components/AppImage.jsx"; // use your app image component if available

const LandingPage = ({ addToCart }) => {
  // Get all unique brands
  const brands = [...new Set(mockEquipment.map((item) => item.brand))];

  // Group equipment by brand (make sure this is defined BEFORE the JSX that uses it)
  const equipmentByBrand = {};
  mockEquipment.forEach((item) => {
    if (!equipmentByBrand[item.brand]) equipmentByBrand[item.brand] = [];
    equipmentByBrand[item.brand].push(item);
  });

  // Handle "Add All" logic
  const handleAddAll = (brandName) => {
    const items = equipmentByBrand[brandName] || [];
    console.log("AddAll -> brand:", brandName, items);
    items.forEach((item) => addToCart(item));
  };


  // Helper to safely get the brand image (handles string or array)
  const getBrandImage = (sampleItem) => {
    if (!sampleItem) return null;
    const img = sampleItem.image;
    if (!img) return null;
    if (Array.isArray(img)) return img[0];
    return img; // string
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="flex flex-col gap-8">
        <HeroSection />

        <section className="px-6">
          <h2 className="text-xl font-bold mb-6 text-center">
            Available Brands
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {brands.map((brand) => {
              const sampleItem = equipmentByBrand[brand]?.[0]; // first product for this brand
              const imgSrc = getBrandImage(sampleItem);

              console.log(brand, sampleItem);
              
              return (
                <div
                  key={brand}
                  className="p-6 border rounded-xl bg-card shadow-sm flex flex-col items-center gap-4 hover:shadow-lg transition"
                >
                  {/* Brand image */}
                  {imgSrc ? (
                    <Image
                      src={imgSrc}
                      alt={brand}
                      className="w-full h-40 object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-full h-40 bg-muted rounded-md flex items-center justify-center">
                      <span className="text-sm text-muted-foreground">No image</span>
                    </div>
                  )}

                  <h3 className="text-lg font-semibold">{brand}</h3>

                  {/* Optional: show how many items */}
                  <p className="text-sm text-muted-foreground">
                    {equipmentByBrand[brand]?.length || 0} item
                    {equipmentByBrand[brand]?.length > 1 ? "s" : ""}
                  </p>

                  {/* Starting price (optional) */}
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

        <Footer />
      </main>
    </div>
  );
};

export default LandingPage;
