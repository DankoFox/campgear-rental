import React, { useState, useEffect } from "react";
import Header from "../../components/ui/Header";
import FilterPanel from "./components/FilterPanel";
import EquipmentGrid from "./components/EquipmentGrid";
import QuickViewModal from "./components/QuickViewModal";
import Button from "../../components/ui/Button";
import Icon from "../../components/AppIcon";

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

  // Mock equipment data
  const mockEquipment = [
    {
      id: 1,
      name: "Lều cắm trại Coleman Sundome 4 người",
      image: "https://images.unsplash.com/photo-1633805159007-8e198bbcc931",
      imageAlt:
        "Orange Coleman Sundome tent set up in grassy camping area with trees in background",
      images: [
        "https://images.unsplash.com/photo-1722607731856-ff7d914b1be3",
        "https://images.unsplash.com/photo-1611322470518-cce1805eb6b5",
        "https://images.unsplash.com/photo-1707462273294-cca519279b7d",
      ],

      price: 150000,
      originalPrice: 200000,
      rating: 4.8,
      reviewCount: 124,
      provider: {
        name: "CampGear Hà Nội",
        rating: 4.9,
      },
      location: "Hà Nội",
      availability: "available",
      features: ["Chống nước", "Dễ dựng", "4 người", "Có cửa sổ"],
      discount: 25,
    },
    {
      id: 2,
      name: "Túi ngủ The North Face Dolomite -7°C",
      image: "https://images.unsplash.com/photo-1606339777002-71a53b059c36",
      imageAlt:
        "Blue sleeping bag laid out on wooden camping platform with forest background",
      price: 80000,
      rating: 4.6,
      reviewCount: 89,
      provider: {
        name: "Outdoor Việt Nam",
        rating: 4.7,
      },
      location: "TP. Hồ Chí Minh",
      availability: "available",
      features: ["Ấm áp", "Nhẹ", "Chống ẩm", "Túi nén"],
    },
    {
      id: 3,
      name: "Bếp gas mini MSR PocketRocket 2",
      image: "https://images.unsplash.com/photo-1727150177117-62e9ed58154e",
      imageAlt:
        "Compact camping stove with blue flame burning under metal pot in outdoor setting",
      price: 45000,
      rating: 4.9,
      reviewCount: 156,
      provider: {
        name: "Adventure Store",
        rating: 4.8,
      },
      location: "Đà Nẵng",
      availability: "limited",
      features: ["Nhỏ gọn", "Tiết kiệm gas", "Nhanh", "Bền"],
    },
    {
      id: 4,
      name: "Ba lô trekking Deuter Aircontact 65+10L",
      image: "https://images.unsplash.com/photo-1702359061641-7c59b24d905f",
      imageAlt:
        "Large green hiking backpack with multiple compartments displayed against mountain landscape",
      price: 120000,
      rating: 4.7,
      reviewCount: 78,
      provider: {
        name: "Mountain Gear",
        rating: 4.6,
      },
      location: "Đà Lạt",
      availability: "available",
      features: ["75L", "Thông hơi", "Chống nước", "Nhiều ngăn"],
    },
    {
      id: 5,
      name: "Đèn pin LED Petzl Actik Core 450 lumens",
      image:
        "https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg",
      imageAlt:
        "Bright LED headlamp with adjustable strap illuminating dark forest path at night",
      price: 35000,
      rating: 4.5,
      reviewCount: 92,
      provider: {
        name: "Light & Gear",
        rating: 4.5,
      },
      location: "Hạ Long",
      availability: "available",
      features: ["Sạc USB", "Chống nước", "450 lumens", "Nhẹ"],
    },
    {
      id: 6,
      name: "Ấm đun nước Jetboil Flash 1L",
      image: "https://images.unsplash.com/photo-1516893623281-98535aaa2205",
      imageAlt:
        "Orange camping cookware system with integrated burner and insulated cup on rocky surface",
      price: 65000,
      rating: 4.8,
      reviewCount: 67,
      provider: {
        name: "Cook Outdoor",
        rating: 4.7,
      },
      location: "Nha Trang",
      availability: "available",
      features: ["Nhanh", "Tiết kiệm", "1L", "Cách nhiệt"],
    },
    {
      id: 7,
      name: "Ghế xếp Helinox Chair One",
      image:
        "https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg",
      imageAlt:
        "Lightweight folding camping chair in red fabric set up beside tent with mountain view",
      price: 55000,
      rating: 4.6,
      reviewCount: 45,
      provider: {
        name: "Comfort Camp",
        rating: 4.4,
      },
      location: "Hà Nội",
      availability: "limited",
      features: ["Siêu nhẹ", "Gọn", "Thoải mái", "Bền"],
    },
    {
      id: 8,
      name: "Màn chống muỗi Sea to Summit Nano",
      image:
        "https://images.pexels.com/photos/2662816/pexels-photo-2662816.jpeg",
      imageAlt:
        "Fine mesh mosquito net suspended over camping area with person sleeping peacefully inside",
      price: 40000,
      rating: 4.4,
      reviewCount: 38,
      provider: {
        name: "Bug Free Zone",
        rating: 4.3,
      },
      location: "TP. Hồ Chí Minh",
      availability: "available",
      features: ["Siêu nhẹ", "Lưới mịn", "Dễ dựng", "Gọn"],
    },
  ];

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
    // Show success notification (could be implemented with toast)
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
      setHasMore(false); // For demo, stop after first load more
    }, 1000);
  };

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={cartCount} />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                Thiết bị cắm trại chất lượng cao
              </h1>
              <p className="text-lg opacity-90 mb-6">
                Khám phá bộ sưu tập thiết bị cắm trại đa dạng từ các thương hiệu
                uy tín. Thuê ngay hôm nay để có chuyến phiêu lưu hoàn hảo!
              </p>

              {/* Search Bar */}
              <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
                <div className="relative flex-1">
                  <Icon
                    name="Search"
                    size={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    type="text"
                    placeholder="Tìm kiếm thiết bị cắm trại..."
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <Button
                  variant="secondary"
                  size="lg"
                  iconName="Search"
                  iconPosition="left"
                >
                  Tìm kiếm
                </Button>
              </div>
            </div>
          </div>
        </section>

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
              {/* Mobile Filter Toggle & Results Count */}
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
                    Thiết bị cắm trại
                  </h2>
                </div>

                {/* View Toggle */}
                <div className="hidden sm:flex items-center space-x-2">
                  <Button variant="ghost" size="sm" iconName="Grid3X3">
                    Lưới
                  </Button>
                  <Button variant="ghost" size="sm" iconName="List">
                    Danh sách
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
      <footer className="bg-card border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>
              &copy; {new Date()?.getFullYear()} CampGear. Tất cả quyền được bảo
              lưu.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EquipmentCatalog;
