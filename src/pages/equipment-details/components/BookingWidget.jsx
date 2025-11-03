import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import { calculateRentalPrice, formatPrice } from "@/utils/pricing";
import { Input } from "@/components/ui/Input";

const BookingWidget = ({ product, selectedDates, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [rentalDays, setRentalDays] = useState(0);

  const calculateRentalDetails = () => {
    const { rentalDays, totalPrice } = calculateRentalPrice(
      selectedDates?.start,
      selectedDates?.end,
      product?.dailyPrice || product?.price,
      quantity
    );

    setRentalDays(rentalDays);
    setTotalPrice(totalPrice);
    console.log("Price calculation here:", totalPrice);
  };

  useEffect(() => {
    calculateRentalDetails();
  }, [selectedDates, quantity, product]);

  const handleQuantityChange = (newQuantity) => {
    const qty = Math.max(
      1,
      Math.min(newQuantity, product?.availableQuantity || 10)
    );
    setQuantity(qty);
  };

  const handleAddToCart = () => {
    if (!selectedDates?.start || !selectedDates?.end) {
      alert("Please select your rental dates");
      return;
    }

    const bookingData = {
      id: product?.id,
      name: product?.name,
      brand: product?.brand,
      type: product?.type,
      image: product?.image,
      productPrice: product?.price,
      orderPrice: totalPrice,
      location: product?.location,
      availability: product?.availability,
      features: product?.features,
      quantity,
      startDate: selectedDates?.start?.toISOString().split("T")[0],
      endDate: selectedDates?.end?.toISOString().split("T")[0],
    };

    onAddToCart(bookingData);
  };

  const canBook =
    selectedDates?.start &&
    selectedDates?.end &&
    product?.availability === "available";

  return (
    <div className="sticky top-20 bg-card border border-border rounded-lg p-6 space-y-6">
      <div className="text-center">
        <h3 className="font-heading font-semibold text-lg mb-2">Rent now</h3>
        <p className="text-sm text-muted-foreground">Rental information</p>
      </div>

      {/* Date Selection Summary */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Received date:</span>
          <span className="font-medium">
            {selectedDates?.start
              ? selectedDates?.start?.toLocaleDateString("en-US")
              : "Not selected"}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Return date:</span>
          <span className="font-medium">
            {selectedDates?.end
              ? selectedDates?.end?.toLocaleDateString("en-US")
              : "Not selected"}
          </span>
        </div>
        {rentalDays > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Rent for:</span>
            <span className="font-medium">{rentalDays} day(s)</span>
          </div>
        )}
      </div>

      {/* Quantity Selector */}
      <div>
        <label className="block text-sm font-medium mb-2">Amount</label>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
            className="w-10 h-10 border border-border rounded-md flex items-center justify-center hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-micro"
          >
            <Icon name="Minus" size={16} />
          </button>
          <Input
            type="number"
            value={quantity}
            onChange={(e) =>
              handleQuantityChange(parseInt(e?.target?.value) || 1)
            }
            className="w-20 text-center"
            min="1"
            max={product?.availableQuantity || 10}
          />
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= (product?.availableQuantity || 10)}
            className="w-10 h-10 border border-border rounded-md flex items-center justify-center hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-micro"
          >
            <Icon name="Plus" size={16} />
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Available: {product?.availableQuantity || 10} product(s)
        </p>
      </div>

      {/* Price Breakdown */}
      {rentalDays > 0 && (
        <div className="space-y-2 p-4 bg-muted/30 rounded-md">
          <div className="flex justify-between text-sm">
            <span>
              Rental price ({rentalDays} day(s) × {quantity} product(s)):
            </span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          {rentalDays >= 7 && (
            <div className="flex justify-between text-sm text-success">
              <span>Weekly rental discount</span>
              <span>
                -
                {formatPrice(
                  rentalDays * product?.price * quantity - totalPrice
                )}
              </span>
            </div>
          )}
          <div className="border-t border-border pt-2">
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span className="text-primary">{formatPrice(totalPrice)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          variant="default"
          fullWidth
          disabled={!canBook}
          onClick={handleAddToCart}
          iconName="ShoppingCart"
          iconPosition="left"
        >
          Add to cart
        </Button>

        <Button
          variant="outline"
          fullWidth
          disabled={!canBook}
          iconName="MessageCircle"
          iconPosition="left"
        >
          Contact provider
        </Button>
      </div>

      {/* Additional Info */}
      <div className="text-xs text-muted-foreground space-y-1">
        <div className="flex items-center space-x-1">
          <Icon name="Shield" size={12} />
          <span>Equipment insurance available</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Truck" size={12} />
          <span>Home delivery available</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="RotateCcw" size={12} />
          <span>100% refund if canceled at least 24 hours in advance</span>
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;
