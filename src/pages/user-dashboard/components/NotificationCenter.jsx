import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const NotificationCenter = ({ notifications }) => {
  const [showAll, setShowAll] = useState(false);

  const getNotificationIcon = (type) => {
    switch (type) {
      case "booking":
        return "Calendar";
      case "payment":
        return "CreditCard";
      case "promotion":
        return "Tag";
      case "reminder":
        return "Clock";
      case "system":
        return "Settings";
      default:
        return "Bell";
    }
  };

  const getNotificationColor = (type, isRead) => {
    const baseColor = isRead ? "text-muted-foreground" : "text-foreground";
    const bgColor = isRead ? "bg-muted/30" : "bg-primary/10";

    switch (type) {
      case "booking":
        return `${baseColor} ${isRead ? "bg-muted/30" : "bg-success/10"}`;
      case "payment":
        return `${baseColor} ${isRead ? "bg-muted/30" : "bg-primary/10"}`;
      case "promotion":
        return `${baseColor} ${isRead ? "bg-muted/30" : "bg-accent/10"}`;
      case "reminder":
        return `${baseColor} ${isRead ? "bg-muted/30" : "bg-warning/10"}`;
      default:
        return `${baseColor} ${bgColor}`;
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} phút trước`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} giờ trước`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} ngày trước`;
    }
  };

  const displayedNotifications = showAll
    ? notifications
    : notifications?.slice(0, 5);
  const unreadCount = notifications?.filter((n) => !n?.isRead)?.length;

  return (
    <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-heading font-semibold text-foreground text-lg">
            Thông báo
          </h3>
          {unreadCount > 0 && (
            <span className="bg-accent text-accent-foreground text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </div>

        {unreadCount > 0 && (
          <Button variant="ghost" size="sm">
            Đánh dấu đã đọc
          </Button>
        )}
      </div>
      <div className="space-y-3">
        {displayedNotifications?.map((notification) => (
          <div
            key={notification?.id}
            className={`flex items-start gap-3 p-3 rounded-lg transition-micro ${
              notification?.isRead ? "bg-transparent" : "bg-muted/30"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getNotificationColor(
                notification?.type,
                notification?.isRead
              )}`}
            >
              <Icon name={getNotificationIcon(notification?.type)} size={14} />
            </div>

            <div className="flex-1 min-w-0">
              <p
                className={`text-sm mb-1 ${
                  notification?.isRead
                    ? "text-muted-foreground"
                    : "text-foreground font-medium"
                }`}
              >
                {notification?.title}
              </p>
              <p className="text-xs text-muted-foreground mb-1">
                {notification?.message}
              </p>
              <span className="text-xs text-muted-foreground">
                {formatTimeAgo(notification?.timestamp)}
              </span>
            </div>

            {!notification?.isRead && (
              <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
            )}
          </div>
        ))}
      </div>
      {notifications?.length === 0 && (
        <div className="text-center py-8">
          <Icon
            name="Bell"
            size={48}
            className="text-muted-foreground mx-auto mb-3"
          />
          <p className="text-muted-foreground text-sm">Chưa có thông báo nào</p>
        </div>
      )}
      {notifications?.length > 5 && (
        <div className="mt-4 pt-4 border-t border-border text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll
              ? "Thu gọn"
              : `Xem thêm ${notifications?.length - 5} thông báo`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
