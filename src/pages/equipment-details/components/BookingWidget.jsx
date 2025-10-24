import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

const BookingWidget = ({ product, selectedDates, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [rentalDays, setRentalDays] = useState(0);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN")?.format(price) + "₫";
  };

  const calculateRentalDetails = () => {
    if (!selectedDates?.start || !selectedDates?.end) {
      setRentalDays(0);
      setTotalPrice(0);
      return;
    }

    const timeDiff =
      selectedDates?.end?.getTime() - selectedDates?.start?.getTime();
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
    setRentalDays(days);

    let pricePerDay = product?.dailyPrice;
    let total = 0;

    // Apply weekly discount if rental is 7+ days
    if (days >= 7) {
      const weeks = Math.floor(days / 7);
      const remainingDays = days % 7;
      total =
        weeks * product?.weeklyPrice + remainingDays * product?.dailyPrice;
    } else {
      total = days * pricePerDay;
    }

    setTotalPrice(total * quantity);
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
      alert("Vui lòng chọn ngày thuê");
      return;
    }

    const bookingData = {
      productId: product?.id,
      productName: product?.name,
      quantity,
      startDate: selectedDates?.start,
      endDate: selectedDates?.end,
      rentalDays,
      totalPrice,
      dailyPrice: product?.dailyPrice,
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
        <h3 className="font-heading font-semibold text-lg mb-2">
          Đặt thuê ngay
        </h3>
        <p className="text-sm text-muted-foreground">
          Chọn ngày và số lượng để thuê thiết bị
        </p>
      </div>
      {/* Date Selection Summary */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Ngày nhận:</span>
          <span className="font-medium">
            {selectedDates?.start
              ? selectedDates?.start?.toLocaleDateString("vi-VN")
              : "Chưa chọn"}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Ngày trả:</span>
          <span className="font-medium">
            {selectedDates?.end
              ? selectedDates?.end?.toLocaleDateString("vi-VN")
              : "Chưa chọn"}
          </span>
        </div>
        {rentalDays > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Số ngày thuê:</span>
            <span className="font-medium">{rentalDays} ngày</span>
          </div>
        )}
      </div>
      {/* Quantity Selector */}
      <div>
        <label className="block text-sm font-medium mb-2">Số lượng</label>
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
          Có sẵn: {product?.availableQuantity || 10} sản phẩm
        </p>
      </div>
      {/* Price Breakdown */}
      {rentalDays > 0 && (
        <div className="space-y-2 p-4 bg-muted/30 rounded-md">
          <div className="flex justify-between text-sm">
            <span>
              Giá thuê ({rentalDays} ngày × {quantity} sản phẩm):
            </span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          {rentalDays >= 7 && (
            <div className="flex justify-between text-sm text-success">
              <span>Giảm giá thuê tuần:</span>
              <span>
                -
                {formatPrice(
                  rentalDays * product?.dailyPrice * quantity - totalPrice
                )}
              </span>
            </div>
          )}
          <div className="border-t border-border pt-2">
            <div className="flex justify-between font-semibold">
              <span>Tổng cộng:</span>
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
          Thêm vào giỏ hàng
        </Button>

        <Button
          variant="outline"
          fullWidth
          disabled={!canBook}
          iconName="MessageCircle"
          iconPosition="left"
        >
          Liên hệ nhà cung cấp
        </Button>
      </div>
      {/* Additional Info */}
      <div className="text-xs text-muted-foreground space-y-1">
        <div className="flex items-center space-x-1">
          <Icon name="Shield" size={12} />
          <span>Bảo hiểm thiết bị có sẵn</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Truck" size={12} />
          <span>Hỗ trợ giao hàng tận nơi</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="RotateCcw" size={12} />
          <span>Hoàn tiền 100% nếu hủy trước 24h</span>
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;
