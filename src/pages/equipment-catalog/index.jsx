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

  // Simulate loading equipment
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setEquipment(mockEquipment);
      setLoading(false);
    }, 1000);

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
    // Simulate loading more items
    setTimeout(() => {
      setEquipment((prev) => [...prev, ...mockEquipment?.slice(0, 4)]);
      setLoading(false);
      setHasMore(false); // For demo purposes, stop after one "load more"
    }, 1000);
  };

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={cartCount} />
      <main className="pt-16">
        <HeroSection />

        {/* Main Content */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Desktop Filter Panel */}
            <FilterPanel
              filters={filters}
              onFiltersChange={handleFiltersChange}
              isOpen={isMobileFilterOpen}
              onToggle={toggleMobileFilter}
            />

            {/* Content Area */}
            <div className="flex-1 space-y-6">
              {/* Mobile Filter Toggle & Results Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <FilterPanel
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

                {/* View Toggle */}
                <div className="hidden sm:flex items-center space-x-2">
                  <Button variant="ghost" size="sm" iconName="Grid3X3">
                    Grid
                  </Button>
                  <Button variant="ghost" size="sm" iconName="List">
                    List
                  </Button>
                </div>
              </div>

              {/* Equipment Grid */}
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
