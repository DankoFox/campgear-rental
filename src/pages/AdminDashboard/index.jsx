// @ts-nocheck
import React, { useState, useEffect, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Footer from "../../components/ui/Footer";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

const COLORS = [
  "#4F46E5",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#22C55E",
  "#F97316",
  "#0EA5E9",
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [purchaseLogs, setPurchaseLogs] = useState([]);
  const [viewBy, setViewBy] = useState("revenue");
  const [groupBy, setGroupBy] = useState("brand");
  const [timeRange, setTimeRange] = useState("3m");
  const [loading, setLoading] = useState(true);

  // ✅ Protect route (only admin can view)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login", { replace: true });
      return;
    }

    try {
      const user = JSON.parse(storedUser);
      if (user.role !== "admin") {
        navigate("/equipment-catalog", { replace: true });
      }
    } catch {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  // ✅ Load real data from backend
  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch("http://localhost:5050/api/purchase-logs");
        const data = await response.json();
        setPurchaseLogs(data);
      } catch (error) {
        console.error("❌ Failed to fetch purchase logs:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // ✅ Apply time range filter (simplified version)
  const filteredData = useMemo(() => {
    if (!purchaseLogs.length) return [];
    const cutoff =
      timeRange === "3m" ? 0.6 : timeRange === "6m" ? 0.8 : 1.0;
    return purchaseLogs.slice(0, Math.floor(purchaseLogs.length * cutoff));
  }, [purchaseLogs, timeRange]);

  // ✅ Compute grouped stats
  const groupedStats = useMemo(() => {
    const stats = {};
    filteredData.forEach((log) => {
      log.items.forEach((item) => {
        const key = groupBy === "brand" ? item.brand : item.category;
        if (!stats[key]) stats[key] = { count: 0, revenue: 0 };
        stats[key].count += item.quantity || 1;
        stats[key].revenue += log.total / log.items.length;
      });
    });
    return stats;
  }, [filteredData, groupBy]);

  // ✅ Prepare chart data
  const chartData = useMemo(() => {
    return Object.entries(groupedStats).map(([name, stats]) => ({
      name,
      value: viewBy === "revenue" ? stats.revenue : stats.count,
    }));
  }, [groupedStats, viewBy]);

  // ✅ Summary
  const totalTransactions = filteredData.length;
  const totalRevenue = filteredData.reduce((sum, log) => sum + log.total, 0);
  const totalItemsSold = Object.values(groupedStats).reduce(
    (sum, stats) => sum + stats.count,
    0
  );

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading purchase data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-heading font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout} iconName="LogOut">
          Logout
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-lg p-4 shadow-card">
          <h2 className="font-semibold text-lg text-muted-foreground">
            Total Revenue (₫)
          </h2>
          <p className="text-3xl font-bold text-green-600">
            {totalRevenue.toLocaleString()}
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 shadow-card">
          <h2 className="font-semibold text-lg text-muted-foreground">
            Total Transactions
          </h2>
          <p className="text-3xl font-bold">{totalTransactions}</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 shadow-card">
          <h2 className="font-semibold text-lg text-muted-foreground">
            Items for hired
          </h2>
          <p className="text-3xl font-bold">{totalItemsSold}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="font-medium text-muted-foreground">Group by:</span>
          <Button
            variant={groupBy === "brand" ? "default" : "outline"}
            onClick={() => setGroupBy("brand")}
          >
            Brand
          </Button>
          <Button
            variant={groupBy === "category" ? "default" : "outline"}
            onClick={() => setGroupBy("category")}
          >
            Category
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-medium text-muted-foreground">View by:</span>
          <Button
            variant={viewBy === "revenue" ? "default" : "outline"}
            onClick={() => setViewBy("revenue")}
          >
            Revenue
          </Button>
          <Button
            variant={viewBy === "count" ? "default" : "outline"}
            onClick={() => setViewBy("count")}
          >
            Item Count
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-medium text-muted-foreground">Time range:</span>
          <Button
            variant={timeRange === "3m" ? "default" : "outline"}
            onClick={() => setTimeRange("3m")}
          >
            3 Months
          </Button>
          <Button
            variant={timeRange === "6m" ? "default" : "outline"}
            onClick={() => setTimeRange("6m")}
          >
            6 Months
          </Button>
          <Button
            variant={timeRange === "1y" ? "default" : "outline"}
            onClick={() => setTimeRange("1y")}
          >
            1 Year
          </Button>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-card">
        <h2 className="text-xl font-semibold mb-4">
          Purchase Distribution ({groupBy} / {viewBy})
        </h2>

        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-muted-foreground text-center py-10">
            No data available to display
          </p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
