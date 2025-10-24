import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import BookingCard from "./components/BookingCard";
import AccountSummary from "./components/AccountSummary";
import ActivityFeed from "./components/ActivityFeed";
import QuickActions from "./components/QuickActions";
import RecommendedEquipment from "./components/RecommendedEquipment";
import NotificationCenter from "./components/NotificationCenter";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock user data
  const mockUser = {
    id: 1,
    name: "Nguyễn Văn An",
    email: "nguyen.van.an@email.com",
    phone: "+84 901 234 567",
    joinDate: "2023-03-15",
    avatar: "https://images.unsplash.com/photo-1733054852918-5d5f32b0b604",
    avatarAlt:
      "Professional headshot of Vietnamese man with short black hair wearing white collared shirt",
  };

  // Mock account statistics
  const mockStats = {
    totalRentals: 12,
    favoriteItems: 8,
    loyaltyPoints: 750,
    totalSpent: 2450000,
  };

  // Mock bookings data
  const mockBookings = [
    {
      id: "BK001",
      equipment: {
        name: "Lều cắm trại Coleman Sundome 4 người",
        image: "https://images.unsplash.com/photo-1695918435048-1e48dab0c4e5",
        imageAlt:
          "Orange Coleman dome tent set up in forest clearing with camping chairs nearby",
      },
      startDate: "2024-10-25",
      endDate: "2024-10-28",
      duration: 3,
      status: "upcoming",
      provider: {
        name: "Outdoor Gear Saigon",
        rating: 4.8,
      },
      totalPrice: 450000,
    },
    {
      id: "BK002",
      equipment: {
        name: "Túi ngủ North Face Eco Trail Bed 20",
        image: "https://images.unsplash.com/photo-1611312449545-94176309c857",
        imageAlt:
          "Blue sleeping bag laid out on wooden deck with mountain view in background",
      },
      startDate: "2024-10-22",
      endDate: "2024-10-24",
      duration: 2,
      status: "active",
      provider: {
        name: "Mountain Equipment Co.",
        rating: 4.9,
      },
      totalPrice: 200000,
    },
    {
      id: "BK003",
      equipment: {
        name: "Bếp gas mini Jetboil Flash",
        image: "https://images.unsplash.com/photo-1722380195960-c87161dc74da",
        imageAlt:
          "Compact camping stove with orange pot boiling water on rocky surface outdoors",
      },
      startDate: "2024-10-15",
      endDate: "2024-10-18",
      duration: 3,
      status: "completed",
      provider: {
        name: "Adventure Gear Hub",
        rating: 4.7,
      },
      totalPrice: 180000,
    },
  ];

  // Mock activity feed
  const mockActivities = [
    {
      id: 1,
      type: "booking",
      title: "Đặt thuê thành công",
      description: "Lều cắm trại Coleman Sundome 4 người - Outdoor Gear Saigon",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      actionRequired: false,
    },
    {
      id: 2,
      type: "payment",
      title: "Thanh toán hoàn tất",
      description: "Đã thanh toán 450.000₫ cho đơn hàng #BK001",
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      actionRequired: false,
    },
    {
      id: 3,
      type: "message",
      title: "Tin nhắn mới từ nhà cung cấp",
      description:
        "Mountain Equipment Co. đã gửi thông tin về địa điểm nhận hàng",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      actionRequired: true,
    },
    {
      id: 4,
      type: "review",
      title: "Yêu cầu đánh giá",
      description: "Hãy đánh giá trải nghiệm thuê Bếp gas mini Jetboil Flash",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      actionRequired: true,
    },
  ];

  // Mock recommended equipment
  const mockRecommendations = [
    {
      id: 1,
      name: "Ba lô trekking Osprey Atmos AG 65L",
      image: "https://images.unsplash.com/photo-1699688945310-e9289b69e5cf",
      imageAlt:
        "Large blue hiking backpack with multiple compartments displayed against white background",
      category: "Ba lô",
      rating: 4.9,
      pricePerDay: 120000,
      available: true,
    },
    {
      id: 2,
      name: "Đèn pin LED Petzl Actik Core",
      image: "https://images.unsplash.com/photo-1731314811524-b7e3abe26357",
      imageAlt:
        "Compact LED headlamp with adjustable strap on rocky outdoor surface",
      category: "Đèn pin",
      rating: 4.8,
      pricePerDay: 35000,
      available: true,
    },
    {
      id: 3,
      name: "Giày trekking Merrell Moab 3",
      image: "https://images.unsplash.com/photo-1559826884-dbcc4a21caed",
      imageAlt:
        "Brown leather hiking boots with rugged sole on wooden surface with mountain backdrop",
      category: "Giày dép",
      rating: 4.7,
      pricePerDay: 80000,
      available: false,
    },
    {
      id: 4,
      name: "Áo khoác chống nước Patagonia Torrentshell",
      image: "https://images.unsplash.com/photo-1732294365458-91f5c3300532",
      imageAlt:
        "Blue waterproof jacket hanging on wooden hanger with forest background",
      category: "Quần áo",
      rating: 4.6,
      pricePerDay: 90000,
      available: true,
    },
  ];

  // Mock notifications
  const mockNotifications = [
    {
      id: 1,
      type: "reminder",
      title: "Nhắc nhở nhận hàng",
      message: "Đơn hàng #BK001 sẽ được nhận vào ngày mai lúc 9:00 AM",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      isRead: false,
    },
    {
      id: 2,
      type: "promotion",
      title: "Ưu đãi đặc biệt",
      message: "Giảm 20% cho lần thuê tiếp theo - Mã: CAMP20",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: false,
    },
    {
      id: 3,
      type: "booking",
      title: "Xác nhận đặt hàng",
      message: "Đơn hàng #BK001 đã được xác nhận bởi Outdoor Gear Saigon",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      isRead: true,
    },
    {
      id: 4,
      type: "system",
      title: "Cập nhật hệ thống",
      message: "Chúng tôi đã cải thiện tính năng tìm kiếm thiết bị",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      isRead: true,
    },
  ];

  const tabs = [
    { id: "overview", label: "Tổng quan", count: null },
    { id: "bookings", label: "Đặt thuê", count: mockBookings?.length },
    {
      id: "notifications",
      label: "Thông báo",
      count: mockNotifications?.filter((n) => !n?.isRead)?.length,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Bảng điều khiển - CampGear</title>
        <meta
          name="description"
          content="Quản lý tài khoản và theo dõi đơn hàng thuê thiết bị cắm trại của bạn"
        />
      </Helmet>
      <Header user={mockUser} cartCount={2} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Page Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-2">
              Chào mừng trở lại, {mockUser?.name?.split(" ")?.pop()}!
            </h1>
            <p className="text-muted-foreground">
              Quản lý đặt thuê và theo dõi hoạt động của bạn
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-border mb-6">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`relative py-3 px-1 text-sm font-medium whitespace-nowrap transition-micro ${
                    activeTab === tab?.id
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {tab?.label}
                    {tab?.count !== null && tab?.count > 0 && (
                      <span className="bg-accent text-accent-foreground text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                        {tab?.count > 99 ? "99+" : tab?.count}
                      </span>
                    )}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Recent Bookings */}
                <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
                  <h2 className="font-heading font-semibold text-foreground text-lg mb-4">
                    Đặt thuê gần đây
                  </h2>
                  <div className="space-y-4">
                    {mockBookings?.slice(0, 3)?.map((booking) => (
                      <BookingCard key={booking?.id} booking={booking} />
                    ))}
                  </div>
                </div>

                {/* Activity Feed */}
                <ActivityFeed activities={mockActivities} />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Account Summary */}
                <AccountSummary user={mockUser} stats={mockStats} />

                {/* Quick Actions */}
                <QuickActions />

                {/* Recommended Equipment */}
                <RecommendedEquipment
                  recommendations={mockRecommendations?.slice(0, 2)}
                />
              </div>
            </div>
          )}

          {activeTab === "bookings" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
                  <h2 className="font-heading font-semibold text-foreground text-lg mb-4">
                    Tất cả đặt thuê
                  </h2>
                  <div className="space-y-4">
                    {mockBookings?.map((booking) => (
                      <BookingCard key={booking?.id} booking={booking} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <AccountSummary user={mockUser} stats={mockStats} />
                <RecommendedEquipment
                  recommendations={mockRecommendations?.slice(0, 2)}
                />
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <NotificationCenter notifications={mockNotifications} />
              </div>
              <div className="space-y-6">
                <AccountSummary user={mockUser} stats={mockStats} />
                <QuickActions />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
