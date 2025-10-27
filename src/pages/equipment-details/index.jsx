// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Header from "../../components/ui/Header";
import ImageGallery from "./components/ImageGallery";
import ProductInfo from "./components/ProductInfo";
import SpecificationsPanel from "./components/SpecificationsPanel";
import AvailabilityCalendar from "./components/AvailabilityCalendar";
import BookingWidget from "./components/BookingWidget";
import ProviderContact from "./components/ProviderContact";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import { mockIncludedItems } from "./some-mock-data";

const EquipmentDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedDates, setSelectedDates] = useState({
    start: null,
    end: null,
  });
  const [cartCount, setCartCount] = useState(2);
  const [equipment, setEquipment] = useState(false);
  const [instruction, setInstruction] = useState(false);
  const [specifications, setSpecifications] = useState(false);

  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams(); // Mock user data
  const mockUser = {
    name: "Nguyễn Văn An",
    email: "nguyen.van.an@email.com",
  };

  // Mock product data
  const mockProduct = {
    id: "tent-001",
    name: "Lều Cắm Trại 4 Người Coleman Sundome",
    category: "Lều cắm trại",
    dailyPrice: 150000,
    weeklyPrice: 900000,
    availability: "available",
    availableQuantity: 5,
    keyFeatures: [
      "Chống thấm nước hoàn toàn",
      "Thiết lập dễ dàng trong 10 phút",
      "Hệ thống thông gió tối ưu",
      "Chất liệu bền bỉ chống UV",
      "Túi đựng gọn nhẹ",
      "Bảo hành 2 năm",
    ],

    provider: {
      name: "CampGear Việt Nam",
      location: "Quận 1, TP.HCM",
      responseTime: "2 giờ",
      businessType: "Cửa hàng thiết bị cắm trại",
      memberSince: "2020",
      address: "123 Đường Nguyễn Huệ, Quận 1, TP.HCM",
      phone: "0901 234 567",
      deliveryAvailable: true,
      businessHours: {
        "thứ 2": "8:00 - 18:00",
        "thứ 3": "8:00 - 18:00",
        "thứ 4": "8:00 - 18:00",
        "thứ 5": "8:00 - 18:00",
        "thứ 6": "8:00 - 18:00",
        "thứ 7": "9:00 - 17:00",
        "chủ nhật": "9:00 - 17:00",
      },
      certifications: [
        "Đại lý chính thức Coleman",
        "Chứng nhận chất lượng ISO",
      ],
      coordinates: {
        lat: 10.7769,
        lng: 106.7009,
      },
    },
  };

  // Mock product images
  const mockImages = [
    {
      url: "https://images.unsplash.com/photo-1687762035856-cab4f81f2b39",
      alt: "Orange Coleman Sundome tent set up in green forest clearing with four-person capacity",
    },
    {
      url: "https://images.unsplash.com/photo-1502943615053-d8bd8c74eb1b",
      alt: "Interior view of spacious camping tent showing sleeping area with sleeping bags and gear storage",
    },
    {
      url: "https://images.unsplash.com/photo-1633005619430-3ae90a73d56f",
      alt: "Close-up of tent entrance with zippered door and mesh ventilation panels",
    },
    {
      url: "https://images.unsplash.com/photo-1532555283690-cbf89e69cec7",
      alt: "Camping tent setup process showing easy assembly with color-coded poles and clips",
    },
  ];

  // Mock availability data
  const mockAvailabilityData = [
    { date: "2025-10-21", available: true, price: 150000, isPeak: false },
    { date: "2025-10-22", available: true, price: 150000, isPeak: false },
    { date: "2025-10-23", available: false, price: 0, isPeak: false },
    { date: "2025-10-24", available: true, price: 180000, isPeak: true },
    { date: "2025-10-25", available: true, price: 180000, isPeak: true },
    { date: "2025-10-26", available: true, price: 180000, isPeak: true },
    { date: "2025-10-27", available: true, price: 150000, isPeak: false },
    { date: "2025-10-28", available: true, price: 150000, isPeak: false },
    { date: "2025-10-29", available: true, price: 150000, isPeak: false },
    { date: "2025-10-30", available: false, price: 0, isPeak: false },
  ];

  const handleDateSelect = (dates) => {
    setSelectedDates(dates);
  };

  const handleAddToCart = (bookingData) => {
    console.log("Adding to cart:", bookingData);
    setCartCount((prev) => prev + 1);
    alert("Đã thêm vào giỏ hàng thành công!");
  };

  const handleBackToCatalog = () => {
    navigate("/equipment-catalog");
  };
  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5050/api/equipment/${id}`);
        if (!res.ok) throw new Error("Equipment not found");
        const data = await res.json();
        setEquipment(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEquipment();
  }, [id]);

  useEffect(() => {
    if (!equipment?.type) return;
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const [instructionRes, specRes] = await Promise.all([
          fetch(`http://localhost:5050/api/instructions/${equipment.type}`),
          fetch(`http://localhost:5050/api/specifications/${equipment.type}`),
        ]);

        if (!instructionRes.ok || !specRes.ok)
          throw new Error("Failed to fetch details");
        const [instructionData, specData] = await Promise.all([
          instructionRes.json(),
          specRes.json(),
        ]);
        setInstruction(instructionData);
        setSpecifications(specData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [equipment?.type]);

  return (
    <div className="min-h-screen bg-background">
      <Header user={mockUser} cartCount={cartCount} />
      <main className="pt-16">
        {/* Breadcrumb */}
        <div className="bg-muted/30 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
            <div className="flex items-center space-x-2 text-sm">
              <button
                onClick={handleBackToCatalog}
                className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-micro"
              >
                <Icon name="ArrowLeft" size={16} />
                <span>Thiết bị cắm trại</span>
              </button>
              <Icon name="ChevronRight" size={16} className="text-muted" />
              <span className="text-foreground font-medium">
                {equipment?.category}
              </span>
              <Icon name="ChevronRight" size={16} className="text-muted" />
              <span className="text-muted-foreground truncate">
                {equipment?.name}
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Product Images and Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              <ImageGallery images={mockImages} productName={equipment?.name} />

              {/* Product Information */}
              {equipment && <ProductInfo product={equipment} />}

              {/* Specifications Panel */}
              <SpecificationsPanel
                specifications={specifications?.specifications || []}
                includedItems={mockIncludedItems}
                usageGuidelines={instruction?.instructions || []}
              />

              {/* Availability Calendar - Mobile */}
              <div className="lg:hidden">
                <AvailabilityCalendar
                  availabilityData={mockAvailabilityData}
                  onDateSelect={handleDateSelect}
                />
              </div>

              {/* Provider Contact */}
              <ProviderContact provider={mockProduct?.provider} />
            </div>

            {/* Right Column - Booking Widget and Calendar */}
            <div className="space-y-6">
              {/* Availability Calendar - Desktop */}
              <div className="hidden lg:block">
                <AvailabilityCalendar
                  availabilityData={mockAvailabilityData}
                  onDateSelect={handleDateSelect}
                />
              </div>

              {/* Booking Widget */}
              <BookingWidget
                product={mockProduct}
                selectedDates={selectedDates}
                onAddToCart={handleAddToCart}
              />
            </div>
          </div>
        </div>

        {/* Mobile Sticky Booking Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 z-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Giá từ</p>
              <p className="font-bold text-primary">
                {new Intl.NumberFormat("vi-VN")?.format(
                  mockProduct?.dailyPrice
                )}
                ₫/ngày
              </p>
            </div>
            <Button
              variant="default"
              onClick={() => {
                if (selectedDates?.start && selectedDates?.end) {
                  handleAddToCart({
                    productId: mockProduct?.id,
                    productName: mockProduct?.name,
                    quantity: 1,
                    startDate: selectedDates?.start,
                    endDate: selectedDates?.end,
                  });
                } else {
                  alert("Vui lòng chọn ngày thuê");
                }
              }}
              iconName="ShoppingCart"
              iconPosition="left"
            >
              Thêm vào giỏ
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EquipmentDetails;
