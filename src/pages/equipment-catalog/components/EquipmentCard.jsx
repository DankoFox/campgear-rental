// @ts-nocheck
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";

const EquipmentCard = ({ equipment, onAddToCart, onQuickView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleAddToCart = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    onAddToCart(equipment);
  };

  const handleQuickView = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    onQuickView(equipment);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US")?.format(price);
  };

  const getAvailabilityStatus = () => {
    if (equipment?.availability === "available") {
      return {
        text: "Available",
        color: "text-success",
        bgColor: "bg-success/10",
      };
    } else if (equipment?.availability === "limited") {
      return {
        text: "Limited",
        color: "text-warning",
        bgColor: "bg-warning/10",
      };
    } else {
      return {
        text: "Out of stock",
        color: "text-error",
        bgColor: "bg-error/10",
      };
    }
  };

  const availability = getAvailabilityStatus();

  return (
    <div
      className="group bg-card border border-border rounded-lg overflow-hidden shadow-card hover:shadow-modal transition-all duration-300 cursor-pointer w-full sm:w-[260px] md:w-[280px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to="/equipment-details" className="block">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {imageLoading && (
            <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
              <Icon name="Image" size={32} className="text-muted-foreground" />
            </div>
          )}

          <Image
            src={equipment?.image}
            alt={equipment?.imageAlt}
            className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
              imageLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setImageLoading(false)}
          />

          {/* Overlay Actions - Desktop Only */}
          {isHovered && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex">
              <div className="flex flex-col items-center justify-center space-y-2">
                <Button
                  variant="default"
                  size="xs"
                  onClick={handleQuickView}
                  iconName="Eye"
                  iconPosition="left"
                >
                  Quick View
                </Button>
                <Button
                  variant="outline"
                  size="xs"
                  onClick={handleAddToCart}
                  iconName="ShoppingCart"
                  iconPosition="left"
                  disabled={equipment?.availability === "unavailable"}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          )}

          {/* Availability Badge */}
          <div
            className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${availability?.color} ${availability?.bgColor}`}
          >
            {availability?.text}
          </div>

          {/* Wishlist Button */}
          <button className="absolute top-3 right-3 w-8 h-8 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-card transition-colors">
            <Icon
              name="Heart"
              size={16}
              className="text-muted-foreground hover:text-accent"
            />
          </button>

          {/* Discount Badge */}
          {equipment?.discount && (
            <div className="absolute top-3 right-12 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
              -{equipment?.discount}%
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Provider Info */}
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground text-xs font-medium">
                {equipment?.provider?.name?.charAt(0)}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              {equipment?.provider?.name}
            </span>
            <div className="flex items-center space-x-1">
              <Icon
                name="Star"
                size={12}
                className="text-warning fill-current"
              />
              <span className="text-xs text-muted-foreground">
                {equipment?.provider?.rating}
              </span>
            </div>
          </div>

          {/* Equipment Name */}
          <h3 className="font-heading font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {equipment?.name}
          </h3>

          {/* Features */}
          <div className="flex flex-wrap gap-1">
            {equipment?.features?.slice(0, 2)?.map((feature, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
              >
                {feature}
              </span>
            ))}
            {equipment?.features?.length > 2 && (
              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                +{equipment?.features?.length - 2}
              </span>
            )}
          </div>

          {/* Location */}
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Icon name="MapPin" size={14} />
            <span>{equipment?.location}</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-baseline space-x-2">
                <span className="text-lg font-bold text-foreground">
                  {formatPrice(equipment?.price)}₫
                </span>
                {equipment?.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(equipment?.originalPrice)}₫
                  </span>
                )}
              </div>
              <span className="text-xs text-muted-foreground">/ day</span>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-1">
              <Icon
                name="Star"
                size={16}
                className="text-warning fill-current"
              />
              <span className="font-medium text-foreground">
                {equipment?.rating}
              </span>
              <span className="text-sm text-muted-foreground">
                ({equipment?.reviewCount})
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="p-4 pt-0 md:hidden">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleQuickView}
              iconName="Eye"
              iconPosition="left"
              className="flex-1"
            >
              Quick View
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleAddToCart}
              iconName="ShoppingCart"
              iconPosition="left"
              className="flex-1"
              disabled={equipment?.availability === "unavailable"}
            >
              Rent Now
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EquipmentCard;
