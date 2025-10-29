// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ImageGallery from "./components/ImageGallery";
import ProductInfo from "./components/ProductInfo";
import SpecificationsPanel from "./components/SpecificationsPanel";
import AvailabilityCalendar from "./components/AvailabilityCalendar";
import BookingWidget from "./components/BookingWidget";
import ProviderContact from "./components/ProviderContact";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import { mockIncludedItems } from "./some-mock-data";

const EquipmentDetails = ({ setCartCount, setCartItems }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedDates, setSelectedDates] = useState({
    start: null,
    end: null,
  });
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
      name: "CampGear Viet Nam",
      location: "District 1, TP.HCM",
      responseTime: "2 hours",
      businessType: "Camping gear store",
      memberSince: "2020",
      address: "123 Nguyen Hue, District 1, TP.HCM",
      phone: "0901 234 567",
      deliveryAvailable: true,
      businessHours: {
        Monday: "8:00 - 18:00",
        Tuesday: "8:00 - 18:00",
        Wednesday: "8:00 - 18:00",
        Thursay: "8:00 - 18:00",
        Friday: "8:00 - 18:00",
        Saturday: "9:00 - 17:00",
        Sunday: "9:00 - 17:00",
      },
      certifications: ["Official Coleman dealer", "ISO quality certification"],
      coordinates: {
        lat: 10.7769,
        lng: 106.7009,
      },
    },
  };

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

  const handleAddToCart = (cartItem) => {
    setCartCount((prev) => prev + 1);
    setCartItems((prev) => [...prev, cartItem]);
    console.log("dạng của 1 booking trong trang detial", cartItem);
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
        console.log("Product detail được set ở ngay đây nha", equipment);
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
      <main>
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
              <ImageGallery
                images={equipment?.image}
                productName={equipment?.name}
              />

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
                product={equipment}
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
