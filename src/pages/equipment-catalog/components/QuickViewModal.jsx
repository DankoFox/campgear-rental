// @ts-nocheck
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";

const QuickViewModal = ({ equipment, isOpen, onClose, onAddToCart }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !equipment) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US")?.format(price);
  };

  const handleAddToCart = () => {
    onAddToCart({ ...equipment, quantity });
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e?.target === e?.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center mt-12">
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm"
        onClick={handleBackdropClick}
      />
      <div className="relative bg-card border border-border rounded-lg shadow-modal max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-heading font-semibold text-lg">Quick View</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <Image
                src={equipment?.images?.[selectedImage] || equipment?.image}
                alt={equipment?.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>

            {equipment?.images && equipment?.images?.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {equipment?.images?.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                      selectedImage === index
                        ? "border-primary"
                        : "border-border"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${equipment?.name} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            {/* Provider */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground text-sm font-medium">
                  {equipment?.provider?.name?.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-medium text-foreground">
                  {equipment?.provider?.name}
                </p>
                <div className="flex items-center space-x-1">
                  <Icon
                    name="Star"
                    size={14}
                    className="text-warning fill-current"
                  />
                  <span className="text-sm text-muted-foreground">
                    {equipment?.provider?.rating}
                  </span>
                </div>
              </div>
            </div>

            {/* Name */}
            <h3 className="font-heading font-bold text-xl text-foreground">
              {equipment?.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {Array.from({ length: 5 })?.map((_, index) => (
                  <Icon
                    key={index}
                    name="Star"
                    size={16}
                    className={
                      index < Math.floor(equipment?.rating)
                        ? "text-warning fill-current"
                        : "text-muted"
                    }
                  />
                ))}
              </div>
              <span className="font-medium text-foreground">
                {equipment?.rating}
              </span>
              <span className="text-sm text-muted-foreground">
                ({equipment?.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-foreground">
                  {formatPrice(equipment?.price)}₫
                </span>
                {equipment?.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(equipment?.originalPrice)}₫
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Rental price per day
              </p>
            </div>

            {/* Features */}
            <div className="space-y-2">
              <h4 className="font-heading font-semibold text-foreground">
                Key Features
              </h4>
              <div className="flex flex-wrap gap-2">
                {equipment?.features?.map((feature, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center space-x-2">
              <Icon name="MapPin" size={16} className="text-muted-foreground" />
              <span className="text-muted-foreground">
                {equipment?.location}
              </span>
            </div>

            {/* Availability */}
            <div className="flex items-center space-x-2">
              <Icon
                name="CheckCircle"
                size={16}
                className={
                  equipment?.availability === "available"
                    ? "text-success"
                    : "text-warning"
                }
              />
              <span
                className={
                  equipment?.availability === "available"
                    ? "text-success"
                    : "text-warning"
                }
              >
                {equipment?.availability === "available"
                  ? "Available"
                  : "Limited Stock"}
              </span>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <label className="font-heading font-semibold text-foreground">
                Quantity
              </label>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Icon name="Minus" size={16} />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Icon name="Plus" size={16} />
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                variant="default"
                onClick={handleAddToCart}
                iconName="ShoppingCart"
                iconPosition="left"
                fullWidth
                disabled={equipment?.availability === "unavailable"}
              >
                Add to Cart
              </Button>

              <Link to="/equipment-details">
                <Button
                  variant="outline"
                  iconName="Eye"
                  iconPosition="left"
                  fullWidth
                >
                  View Full Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
