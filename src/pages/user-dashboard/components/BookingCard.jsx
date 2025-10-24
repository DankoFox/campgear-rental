import React from "react";
import { Link } from "react-router-dom";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const BookingCard = ({ booking }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-success/10 text-success border-success/20";
      case "upcoming":
        return "bg-accent/10 text-accent border-accent/20";
      case "completed":
        return "bg-muted text-muted-foreground border-border";
      case "cancelled":
        return "bg-error/10 text-error border-error/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Đang thuê";
      case "upcoming":
        return "Sắp tới";
      case "completed":
        return "Hoàn thành";
      case "cancelled":
        return "Đã hủy";
      default:
        return "Không xác định";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    })?.format(price);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-card transition-micro">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Equipment Image */}
        <div className="flex-shrink-0">
          <div className="w-full sm:w-20 h-32 sm:h-20 rounded-lg overflow-hidden bg-muted">
            <Image
              src={booking?.equipment?.image}
              alt={booking?.equipment?.imageAlt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Booking Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
            <div>
              <h3 className="font-heading font-semibold text-foreground text-sm sm:text-base line-clamp-1">
                {booking?.equipment?.name}
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Mã đặt: #{booking?.id}
              </p>
            </div>
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                booking?.status
              )}`}
            >
              {getStatusText(booking?.status)}
            </span>
          </div>

          {/* Rental Period */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-2">
            <Icon name="Calendar" size={14} />
            <span>
              {formatDate(booking?.startDate)} - {formatDate(booking?.endDate)}
            </span>
            <span className="text-foreground font-medium">
              ({booking?.duration} ngày)
            </span>
          </div>

          {/* Provider Info */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-3">
            <Icon name="Store" size={14} />
            <span>{booking?.provider?.name}</span>
            <div className="flex items-center gap-1">
              <Icon
                name="Star"
                size={12}
                className="text-warning fill-current"
              />
              <span>{booking?.provider?.rating}</span>
            </div>
          </div>

          {/* Price and Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="text-sm">
              <span className="text-muted-foreground">Tổng tiền: </span>
              <span className="font-semibold text-foreground">
                {formatPrice(booking?.totalPrice)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {booking?.status === "upcoming" && (
                <>
                  <Button variant="outline" size="xs">
                    Sửa đổi
                  </Button>
                  <Button variant="ghost" size="xs">
                    Hủy
                  </Button>
                </>
              )}
              {booking?.status === "active" && (
                <Button variant="outline" size="xs">
                  Liên hệ
                </Button>
              )}
              {booking?.status === "completed" && (
                <Button variant="outline" size="xs">
                  Đánh giá
                </Button>
              )}
              <Link to={`/booking-details/${booking?.id}`}>
                <Button variant="ghost" size="xs">
                  Chi tiết
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
