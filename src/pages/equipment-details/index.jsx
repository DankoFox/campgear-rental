import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../components/ui/Header";
import ImageGallery from "./components/ImageGallery";
import ProductInfo from "./components/ProductInfo";
import SpecificationsPanel from "./components/SpecificationsPanel";
import AvailabilityCalendar from "./components/AvailabilityCalendar";
import BookingWidget from "./components/BookingWidget";
import ReviewsSection from "./components/ReviewsSection";
import ProviderContact from "./components/ProviderContact";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";

const EquipmentDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedDates, setSelectedDates] = useState({
    start: null,
    end: null,
  });
  const [cartCount, setCartCount] = useState(2);

  // Mock user data
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
      rating: 4.8,
      reviewCount: 127,
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

  // Mock specifications
  const mockSpecifications = {
    "Kích thước": "2.7m x 2.4m x 1.8m",
    "Trọng lượng": "4.5 kg",
    "Chất liệu": "Polyester 75D chống thấm",
    "Sức chứa": "4 người",
    "Thời gian lắp đặt": "10 phút",
    "Chống thấm": "1500mm",
    "Số cửa": "1 cửa chính",
    "Số cửa sổ": "2 cửa sổ lưới",
    "Màu sắc": "Cam/Xám",
  };

  // Mock included items
  const mockIncludedItems = [
    {
      name: "Thân lều chính",
      description: "Lều polyester chống thấm với lớp phủ PU",
    },
    {
      name: "Bộ cọc và dây căng",
      description: "8 cọc thép và 6 dây căng có thể điều chỉnh",
    },
    {
      name: "Tấm lót đáy",
      description: "Tấm lót chống thấm tích hợp",
    },
    {
      name: "Túi đựng",
      description: "Túi đựng gọn nhẹ với dây kéo",
    },
    {
      name: "Hướng dẫn sử dụng",
      description: "Sách hướng dẫn tiếng Việt chi tiết",
    },
  ];

  // Mock usage guidelines
  const mockUsageGuidelines = [
    {
      title: "Chuẩn bị địa điểm",
      description:
        "Chọn mặt đất bằng phẳng, khô ráo và tránh xa các cành cây lớn. Dọn sạch đá, cành cây nhỏ có thể làm thủng đáy lều.",
    },
    {
      title: "Lắp đặt lều",
      description:
        "Trải tấm lót đáy trước, sau đó lắp khung cọc theo màu sắc tương ứng. Căng dây và cố định cọc theo góc 45 độ.",
    },
    {
      title: "Sử dụng an toàn",
      description:
        "Không sử dụng lửa trần bên trong lều. Đảm bảo thông gió tốt khi ngủ. Kiểm tra dây căng thường xuyên.",
    },
    {
      title: "Bảo quản sau sử dụng",
      description:
        "Làm khô hoàn toàn trước khi cất giữ. Gấp gọn theo hướng dẫn để tránh làm hỏng khóa kéo và vải.",
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

  // Mock reviews data
  const mockReviews = [
    {
      id: 1,
      userName: "Trần Minh Hoàng",
      rating: 5,
      date: "2025-10-15",
      comment:
        "Lều rất tốt, dễ lắp đặt và chống thấm hiệu quả. Đã sử dụng trong chuyến cắm trại 3 ngày 2 đêm ở Đà Lạt, hoàn toàn hài lòng với chất lượng.",
      isVerified: true,
      rentalPeriod: {
        start: "2025-10-12",
        end: "2025-10-14",
      },
      images: [
        {
          url: "https://images.unsplash.com/photo-1729449355231-dfdd3aa8fa84",
          alt: "Tent set up in mountain campsite with scenic valley view in background",
        },
      ],
    },
    {
      id: 2,
      userName: "Lê Thị Mai",
      rating: 4,
      date: "2025-10-10",
      comment:
        "Lều khá tốt, không gian rộng rãi cho 4 người. Tuy nhiên hướng dẫn lắp đặt hơi khó hiểu một chút. Nhân viên hỗ trợ rất nhiệt tình.",
      isVerified: true,
      rentalPeriod: {
        start: "2025-10-07",
        end: "2025-10-09",
      },
    },
    {
      id: 3,
      userName: "Phạm Văn Đức",
      rating: 5,
      date: "2025-10-05",
      comment:
        "Chất lượng tuyệt vời! Đã thuê nhiều lần cho các chuyến đi cùng gia đình. Lều chắc chắn, chống gió tốt và rất dễ dọn dẹp.",
      isVerified: true,
      rentalPeriod: {
        start: "2025-10-01",
        end: "2025-10-03",
      },
    },
    {
      id: 4,
      userName: "Nguyễn Thị Lan",
      rating: 4,
      date: "2025-09-28",
      comment:
        "Lều đẹp và tiện dụng. Giá thuê hợp lý. Sẽ thuê lại trong các chuyến đi tiếp theo.",
      isVerified: false,
      rentalPeriod: {
        start: "2025-09-25",
        end: "2025-09-27",
      },
    },
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

  // Calculate average rating
  const averageRating =
    mockReviews?.reduce((sum, review) => sum + review?.rating, 0) /
    mockReviews?.length;

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
                {mockProduct?.category}
              </span>
              <Icon name="ChevronRight" size={16} className="text-muted" />
              <span className="text-muted-foreground truncate">
                {mockProduct?.name}
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
                images={mockImages}
                productName={mockProduct?.name}
              />

              {/* Product Information */}
              <ProductInfo product={mockProduct} />

              {/* Specifications Panel */}
              <SpecificationsPanel
                specifications={mockSpecifications}
                includedItems={mockIncludedItems}
                usageGuidelines={mockUsageGuidelines}
              />

              {/* Availability Calendar - Mobile */}
              <div className="lg:hidden">
                <AvailabilityCalendar
                  availabilityData={mockAvailabilityData}
                  onDateSelect={handleDateSelect}
                />
              </div>

              {/* Reviews Section */}
              <ReviewsSection
                reviews={mockReviews}
                averageRating={averageRating}
                totalReviews={mockReviews?.length}
              />

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
