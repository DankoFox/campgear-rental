import React from "react";
import Icon from "../../../components/AppIcon";

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case "booking":
        return "Calendar";
      case "payment":
        return "CreditCard";
      case "message":
        return "MessageCircle";
      case "review":
        return "Star";
      case "cancellation":
        return "X";
      default:
        return "Bell";
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case "booking":
        return "text-success bg-success/10";
      case "payment":
        return "text-primary bg-primary/10";
      case "message":
        return "text-accent bg-accent/10";
      case "review":
        return "text-warning bg-warning/10";
      case "cancellation":
        return "text-error bg-error/10";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} phút trước`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} giờ trước`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} ngày trước`;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
      <h3 className="font-heading font-semibold text-foreground text-lg mb-4">
        Hoạt động gần đây
      </h3>
      <div className="space-y-4">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex items-start gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getActivityColor(
                activity?.type
              )}`}
            >
              <Icon name={getActivityIcon(activity?.type)} size={14} />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground mb-1">{activity?.title}</p>
              <p className="text-xs text-muted-foreground mb-1">
                {activity?.description}
              </p>
              <span className="text-xs text-muted-foreground">
                {formatTimeAgo(activity?.timestamp)}
              </span>
            </div>

            {activity?.actionRequired && (
              <div className="flex-shrink-0">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
                  Cần xử lý
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      {activities?.length === 0 && (
        <div className="text-center py-8">
          <Icon
            name="Activity"
            size={48}
            className="text-muted-foreground mx-auto mb-3"
          />
          <p className="text-muted-foreground text-sm">
            Chưa có hoạt động nào gần đây
          </p>
        </div>
      )}
      <div className="mt-6 pt-4 border-t border-border">
        <button className="text-sm text-primary hover:text-primary/80 font-medium transition-micro">
          Xem tất cả hoạt động
        </button>
      </div>
    </div>
  );
};

export default ActivityFeed;
