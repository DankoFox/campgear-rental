import React from "react";
import Icon from "../../../components/AppIcon";

const AccountSummary = ({ user, stats }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    })?.format(price);
  };

  const getLoyaltyLevel = (points) => {
    if (points >= 1000)
      return { level: "Vàng", color: "text-warning", bgColor: "bg-warning/10" };
    if (points >= 500)
      return {
        level: "Bạc",
        color: "text-muted-foreground",
        bgColor: "bg-muted",
      };
    return { level: "Đồng", color: "text-accent", bgColor: "bg-accent/10" };
  };

  const loyalty = getLoyaltyLevel(stats?.loyaltyPoints);

  return (
    <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
          <span className="text-primary-foreground font-heading font-bold text-lg">
            {user?.name?.charAt(0)?.toUpperCase()}
          </span>
        </div>
        <div>
          <h2 className="font-heading font-semibold text-foreground text-lg">
            {user?.name}
          </h2>
          <p className="text-muted-foreground text-sm">{user?.email}</p>
        </div>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <div className="text-2xl font-heading font-bold text-foreground mb-1">
            {stats?.totalRentals}
          </div>
          <div className="text-xs text-muted-foreground">Tổng lần thuê</div>
        </div>
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <div className="text-2xl font-heading font-bold text-foreground mb-1">
            {stats?.favoriteItems}
          </div>
          <div className="text-xs text-muted-foreground">Yêu thích</div>
        </div>
      </div>
      {/* Loyalty Points */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            Điểm tích lũy
          </span>
          <span className={`text-sm font-semibold ${loyalty?.color}`}>
            {loyalty?.level}
          </span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <Icon name="Award" size={16} className={loyalty?.color} />
          <span className="text-sm font-semibold text-foreground">
            {stats?.loyaltyPoints} điểm
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className={`h-2 rounded-full ${loyalty?.bgColor}`}
            style={{
              width: `${Math.min(
                ((stats?.loyaltyPoints % 500) / 500) * 100,
                100
              )}%`,
            }}
          />
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          {500 - (stats?.loyaltyPoints % 500)} điểm để lên hạng tiếp theo
        </div>
      </div>
      {/* Total Spent */}
      <div className="border-t border-border pt-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Tổng chi tiêu</span>
          <span className="font-semibold text-foreground">
            {formatPrice(stats?.totalSpent)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AccountSummary;
