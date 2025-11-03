import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import BookingCard from "./components/BookingCard";
import AccountSummary from "./components/AccountSummary";
import NotificationCenter from "./components/NotificationCenter";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [purchaseLogs, setPurchaseLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user")) || {
    id: null,
    name: "Guest",
    email: "guest@gmail.com",
  };

  // Fetch all purchase logs from backend
  useEffect(() => {
    async function fetchLogs() {
      try {
        const res = await fetch("http://localhost:5050/api/purchase-logs");
        if (!res.ok) throw new Error("Failed to fetch purchase logs");

        const allLogs = await res.json();
        const userLogs = allLogs.filter((log) => log.userid === user?.id);
        setPurchaseLogs(userLogs);
      } catch (err) {
        console.error("❌ Error fetching purchase logs:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLogs();
  }, [user?.id]);

  // Build booking list from purchase logs
  const bookings = purchaseLogs.map((log) => ({
    id: log.id,
    totalPrice: log.total,
    startDate: log.timeSlot || "",
    equipment: {
      name: log.items?.map((i) => i.name).join(", ") || "No items",
      image: log.items?.[0]?.image || "",
      imageAlt: log.items?.[0]?.name || "",
    },
    status: "completed",
    provider: { name: "CampGear", rating: 5.0 },
  }));

  // Example stats
  const stats = {
    totalRentals: bookings.length,
    favoriteItems: 0,
    loyaltyPoints: 0,
    totalSpent: bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0),
  };

  // Temporary notifications placeholder
  const notifications = [
    {
      id: 1,
      type: "system",
      title: "System Notification",
      message: "Welcome to your CampGear Dashboard!",
      timestamp: new Date(),
      isRead: true,
    },
  ];

  const tabs = [
    { id: "overview", label: "Overview", count: null },
    { id: "bookings", label: "Bookings", count: bookings?.length },
    {
      id: "notifications",
      label: "Notifications",
      count: notifications?.filter((n) => !n?.isRead)?.length,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Dashboard - CampGear</title>
        <meta
          name="description"
          content="Manage your account and track your camping equipment rental orders"
        />
      </Helmet>

      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Page Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-2">
              Welcome back, {user?.name?.split(" ")?.pop()}!
            </h1>
            <p className="text-muted-foreground">
              Manage your rentals and track your activity
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
                    Recent Bookings
                  </h2>
                  <div className="space-y-4">
                    {bookings.length > 0 ? (
                      bookings
                        .slice(0, 3)
                        .map((booking) => (
                          <BookingCard key={booking?.id} booking={booking} />
                        ))
                    ) : (
                      <p className="text-muted-foreground">
                        You have no bookings yet.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <AccountSummary user={user} stats={stats} />
              </div>
            </div>
          )}

          {activeTab === "bookings" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
                  <h2 className="font-heading font-semibold text-foreground text-lg mb-4">
                    All Bookings
                  </h2>
                  <div className="space-y-4">
                    {bookings.length > 0 ? (
                      bookings.map((booking) => (
                        <BookingCard key={booking?.id} booking={booking} />
                      ))
                    ) : (
                      <p className="text-muted-foreground">
                        You have no bookings yet.
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <AccountSummary user={user} stats={stats} />
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <NotificationCenter notifications={notifications} />
              </div>
              <div className="space-y-6">
                <AccountSummary user={user} stats={stats} />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
