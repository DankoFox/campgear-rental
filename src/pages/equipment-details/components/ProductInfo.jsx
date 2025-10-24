import React from "react";
import Icon from "../../../components/AppIcon";

const ProductInfo = ({ product }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN")?.format(price) + "₫";
  };

  const getRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon
          key={i}
          name="Star"
          size={16}
          className="text-yellow-400 fill-current"
        />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon
          key="half"
          name="StarHalf"
          size={16}
          className="text-yellow-400 fill-current"
        />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={16} className="text-muted" />
      );
    }

    return stars;
  };

  return (
    <div className="space-y-6">
      {/* Product Title and Category */}
      <div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
          <Icon name="Tag" size={16} />
          <span>{product?.category}</span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground">
          {product?.name}
        </h1>
      </div>
      {/* Pricing */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Giá thuê/ngày</p>
            <p className="text-xl font-bold text-primary">
              {formatPrice(product?.dailyPrice)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Giá thuê/tuần</p>
            <p className="text-xl font-bold text-secondary">
              {formatPrice(product?.weeklyPrice)}
            </p>
            <p className="text-xs text-success">
              Tiết kiệm{" "}
              {Math.round(
                ((product?.dailyPrice * 7 - product?.weeklyPrice) /
                  (product?.dailyPrice * 7)) *
                  100
              )}
              %
            </p>
          </div>
        </div>
      </div>
      {/* Provider Information */}
      <div className="border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-heading font-semibold">Nhà cung cấp</h3>
          <div className="flex items-center space-x-1">
            {getRatingStars(product?.provider?.rating)}
            <span className="text-sm text-muted-foreground ml-1">
              ({product?.provider?.reviewCount} đánh giá)
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-medium">
              {product?.provider?.name?.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-medium">{product?.provider?.name}</p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={14} />
                <span>{product?.provider?.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={14} />
                <span>Phản hồi trong {product?.provider?.responseTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Availability Status */}
      <div className="flex items-center space-x-2">
        <div
          className={`w-3 h-3 rounded-full ${
            product?.availability === "available"
              ? "bg-success"
              : product?.availability === "limited"
              ? "bg-warning"
              : "bg-error"
          }`}
        />
        <span className="text-sm font-medium">
          {product?.availability === "available" && "Có sẵn"}
          {product?.availability === "limited" && "Số lượng có hạn"}
          {product?.availability === "unavailable" && "Tạm hết hàng"}
        </span>
        {product?.availableQuantity && (
          <span className="text-sm text-muted-foreground">
            ({product?.availableQuantity} sản phẩm)
          </span>
        )}
      </div>
      {/* Key Features */}
      <div>
        <h3 className="font-heading font-semibold mb-3">Tính năng nổi bật</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {product?.keyFeatures?.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon
                name="Check"
                size={16}
                className="text-success flex-shrink-0"
              />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
