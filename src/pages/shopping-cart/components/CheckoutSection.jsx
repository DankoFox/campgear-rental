import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Select from "../../../components/ui/Select";
import { ConfirmDialog } from "../../../components/ConfirmDialog";

const CheckoutSection = ({
  cartItems,
  total,
  isProcessing,
  onProceedToCheckout,
}) => {
  const navigate = useNavigate();
  const [deliveryOption, setDeliveryOption] = useState("delivery");
  const [timeSlot, setTimeSlot] = useState("");

  const [showTimeSlotAlert, setShowTimeSlotAlert] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    })?.format(price);
  };

  const deliveryOptions = [
    { value: "delivery", label: "Home Delivery" },
    { value: "pickup", label: "Pick up at Store" },
  ];

  const timeSlotOptions = [
    { value: "9-12", label: "9:00 - 12:00" },
    { value: "12-15", label: "12:00 - 15:00" },
    { value: "15-18", label: "15:00 - 18:00" },
    { value: "18-21", label: "18:00 - 21:00" },
  ];

  const handleProceedToCheckout = () => {
    if (!timeSlot) {
      setShowTimeSlotAlert(true);
      return;
    }
    onProceedToCheckout({ deliveryOption, timeSlot });
  };

  return (
    <div className="space-y-6">
      {/* Delivery Options */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <h3 className="font-heading font-semibold text-lg text-foreground">
          Delivery Options
        </h3>

        <Select
          label="Delivery Methods"
          options={deliveryOptions}
          value={deliveryOption}
          onChange={setDeliveryOption}
        />

        <Select
          label="Time Window"
          options={timeSlotOptions}
          value={timeSlot}
          onChange={setTimeSlot}
          placeholder="Chọn khung giờ"
          required
        />

        {deliveryOption === "delivery" && (
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-start gap-3">
              <Icon name="Info" size={16} className="text-primary mt-0.5" />
              <div className="text-sm space-y-1">
                <p className="font-medium text-foreground">
                  Delivery Information
                </p>
                <p className="text-muted-foreground">
                  Free delivery for orders over 1,000,000₫. Estimated delivery
                  time: 1–2 business days.
                </p>
              </div>
            </div>
          </div>
        )}

        {deliveryOption === "pickup" && (
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-start gap-3">
              <Icon name="MapPin" size={16} className="text-primary mt-0.5" />
              <div className="text-sm space-y-1">
                <p className="font-medium text-foreground">Store Address</p>
                <p className="text-muted-foreground">
                  123 Lê Lợi, Sai Gon Ward, Ho Chi Minh City
                  <br />
                  Business Hours: 8:00 - 20:00 (Mon - Sun)
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Order Summary Mobile */}
      <div className="lg:hidden bg-card border border-border rounded-lg p-4">
        <div className="flex justify-between items-center">
          <span className="font-medium text-foreground">Tổng cộng:</span>
          <span className="font-semibold text-lg text-primary">
            {formatPrice(total)}
          </span>
        </div>
      </div>
      {/* Checkout Button */}
      <div className="space-y-4">
        <Button
          variant="default"
          size="lg"
          fullWidth
          loading={isProcessing}
          iconName="CreditCard"
          iconPosition="left"
          onClick={handleProceedToCheckout}
          disabled={cartItems?.length === 0}
        >
          {isProcessing ? "Processing..." : "Proceed to purchasing"}
        </Button>

        <div className="text-center">
          <button
            onClick={() => navigate("/equipment-catalog")}
            className="text-sm text-primary hover:underline"
          >
            ← Continue Shopping
          </button>
        </div>
      </div>
      {/* Security Information */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Icon name="Shield" size={16} />
          <span>Payment is secured using SSL 256-bit</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Your payment information is encrypted and safely protected
        </p>
      </div>
      {/* Session Timer */}
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <Icon name="Clock" size={16} className="text-warning" />
          <div className="text-sm">
            <p className="font-medium text-warning">
              Your package will be saved within 30 minutes
            </p>
            <p className="text-muted-foreground">
              Finishing the orders' payment to not lose your chosen items
            </p>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={showTimeSlotAlert}
        onOpenChange={setShowTimeSlotAlert}
        title="Delivery Time Window Not Selected"
        description="Please choose a Delivery Time Window before Proceeding to Checkout"
        onConfirm={() => setShowTimeSlotAlert(false)}
      />
    </div>
  );
};

export default CheckoutSection;
