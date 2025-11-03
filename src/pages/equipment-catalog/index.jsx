// @ts-nocheck
import React, { useState, useEffect } from "react";
import FilterPanel from "./components/FilterPanel";
import EquipmentGrid from "./components/EquipmentGrid";
import QuickViewModal from "./components/QuickViewModal";
import Button from "../../components/ui/Button";
import HeroSection from "./components/HeroSection";
import Footer from "../../components/ui/Footer";
import { useNavigate } from "react-router-dom";

const EquipmentCatalog = ({ cartCount, setCartCount, setCartItems }) => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    location: "",
    priceRange: [0, 200000],
    sortBy: "relevance",
  });
  const [equipment, setEquipment] = useState([]);
  const [allEquipment, setAllEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser.role !== "user") {
        navigate("/login", { replace: true });
      }
    } else {
      navigate("/login", { replace: true });
    }
  }, []); // ✅ only run once on mount

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5050/api/equipment");
        if (!res.ok) throw new Error("Failed to fetch equipment");
        const data = await res.json();
        setEquipment(data);
        setAllEquipment(data);
      } catch (err) {
        console.error("Error fetching equipment:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, []);

  // ✅ Apply filters and sorting
  useEffect(() => {
    if (!allEquipment.length) return;

    setLoading(true);
    const timer = setTimeout(() => {
      let filtered = [...allEquipment];

      // Filter by location
      if (filters.location) {
        filtered = filtered.filter((item) =>
          item.location?.toLowerCase().includes(filters.location.toLowerCase())
        );
      }

      // Filter by price range
      filtered = filtered.filter(
        (item) =>
          item.price >= filters.priceRange[0] &&
          item.price <= filters.priceRange[1]
      );

      // Filter by categories
      if (filters.categories?.length > 0) {
        filtered = filtered.filter((item) =>
          filters.categories.includes(item.type)
        );
      }

      // Filter by brands
      if (filters.brands?.length > 0) {
        filtered = filtered.filter((item) =>
          filters.brands.some((b) =>
            item.brand
              ?.toLowerCase()
              .replace(/[^a-z0-9]/g, "")
              .includes(b)
          )
        );
      }

      // Sort results
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
          break;
      }

      setEquipment(filtered);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [filters, allEquipment]);

  const handleFiltersChange = (newFilters) => setFilters(newFilters);

  const handleAddToCart = (item) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        const updatedCart = prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
                orderPrice: (cartItem.quantity + 1) * cartItem.productPrice,
              }
            : cartItem
        );
        return updatedCart;
      } else {
        // If new item → add to cart
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const newCartItem = {
          ...item,
          productPrice: item.price,
          quantity: 1,
          orderPrice: item.price,
          startDate: today.toISOString().split("T")[0],
          endDate: tomorrow.toISOString().split("T")[0],
        };

        setCartCount((prevCount) => prevCount + 1);
        return [...prevCart, newCartItem];
      }
    });
  };

  const handleQuickView = (item) => {
    setSelectedEquipment(item);
    setIsQuickViewOpen(true);
  };

  const handleLoadMore = () => {
    setHasMore(false);
  };

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  const handleSearch = () => {
    const filtered = allEquipment.filter((item) =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setEquipment(filtered);
  };

  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
        />

        <section className="container mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Desktop Filter Panel */}
            <FilterPanel
              products={allEquipment}
              filters={filters}
              onFiltersChange={handleFiltersChange}
              isOpen={isMobileFilterOpen}
              onToggle={toggleMobileFilter}
              className="sticky top-20" // <-- makes it stick
            />

            {/* Main Section */}
            <div className="flex-1 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FilterPanel
                    products={allEquipment}
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

                <div className="hidden sm:flex items-center space-x-2">
                  <Button variant="ghost" size="sm" iconName="Grid3X3">
                    Grid
                  </Button>
                  <Button variant="ghost" size="sm" iconName="List">
                    List
                  </Button>
                </div>
              </div>

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

      <QuickViewModal
        equipment={selectedEquipment}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default EquipmentCatalog;
