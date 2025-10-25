import React, { useState, useEffect } from "react";
import Header from "../../components/ui/Header";
import FilterPanel from "./components/FilterPanel";
import EquipmentGrid from "./components/EquipmentGrid";
import QuickViewModal from "./components/QuickViewModal";
import Button from "../../components/ui/Button";
import Icon from "../../components/AppIcon";
import { mockEquipment } from "./equipment-data";
import HeroSection from "./components/HeroSection";
import Footer from "../../components/ui/Footer";

const EquipmentCatalog = () => {
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    location: "",
    priceRange: [0, 2000000],
    sortBy: "relevance",
  });

  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // ✅ Apply filters and sorting here
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      let filtered = [...mockEquipment];

      // Filter by location
      // Filter by location
if (filters.location) {
  filtered = filtered.filter((item) =>
    item.location.toLowerCase().includes(filters.location.toLowerCase())
  );
}

// Filter by price range
filtered = filtered.filter(
  (item) =>
    item.price >= filters.priceRange[0] &&
    item.price <= filters.priceRange[1]
);

// ✅ Filter by category
if (filters.categories?.length > 0) {
  filtered = filtered.filter((item) =>
    filters.categories.includes(item.type)
  );
}

// ✅ Filter by brand
if (filters.brands?.length > 0) {
  filtered = filtered.filter((item) =>
    filters.brands.some((b) =>
      item.brand?.toLowerCase().replace(/[^a-z0-9]/g, "").includes(b)
    )
  );
}


// ✅ Sort logic
switch (filters.sortBy) {
  case "price_low":
    filtered.sort((a, b) => a.price - b.price);
    break;
  case "price_high":
    filtered.sort((a, b) => b.price - a.price);
    break;
  case "rating":
    filtered.sort((a, b) => b.rating - a.rating);
    break;
  default:
    break; // relevance keeps original order
}


      setEquipment(filtered);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [filters]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleAddToCart = (item) => {
    setCartCount((prev) => prev + (item?.quantity || 1));
    console.log("Added to cart:", item);
  };

  const handleQuickView = (item) => {
    setSelectedEquipment(item);
    setIsQuickViewOpen(true);
  };

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setEquipment((prev) => [...prev, ...mockEquipment.slice(0, 4)]);
      setLoading(false);
      setHasMore(false);
    }, 1000);
  };

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    const filtered = mockEquipment.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setEquipment(filtered);
  };


  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={cartCount} />
      <main className="pt-16">
        <HeroSection 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
        />

        {/* Main Content */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Desktop Filter Panel */}
            <FilterPanel
              products={mockEquipment} // 👈 add this line
              filters={filters}
              onFiltersChange={handleFiltersChange}
              isOpen={isMobileFilterOpen}
              onToggle={toggleMobileFilter}
            />

            {/* Main Section */}
            <div className="flex-1 space-y-6">
              {/* Mobile Header with Filter */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <FilterPanel
                        products={mockEquipment} // 👈 and this too
                        filters={filters}
                        onFiltersChange={handleFiltersChange}
                        isOpen={isMobileFilterOpen}
                        onToggle={toggleMobileFilter}
                        isMobile={true}
                      />
                  <h2 className="font-heading font-semibold text-xl text-foreground">
                    Camping Equipment
                  </h2>
                </div>

                {/* View Options */}
                <div className="hidden sm:flex items-center space-x-2">
                  <Button variant="ghost" size="sm" iconName="Grid3X3">
                    Grid
                  </Button>
                  <Button variant="ghost" size="sm" iconName="List">
                    List
                  </Button>
                </div>
              </div>

              {/* Equipment List */}
              <EquipmentGrid
                equipment={equipment}
                loading={loading}
                onAddToCart={handleAddToCart}
                onQuickView={handleQuickView}
                hasMore={hasMore}
                onLoadMore={handleLoadMore}
              />
            </div>
          </div>
        </section>
      </main>

      {/* Quick View Modal */}
      <QuickViewModal
        equipment={selectedEquipment}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default EquipmentCatalog;
