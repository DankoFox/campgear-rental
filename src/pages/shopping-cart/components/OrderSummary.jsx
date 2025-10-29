import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { formatPrice } from "@/utils/pricing";

const OrderSummary = ({
  cartItems,
  promoCode,
  onApplyPromo,
  onRemovePromo,
}) => {
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");

  const calculateSubtotal = () => {
    return cartItems?.reduce(
      (total, item) => total + (item.orderPrice || 0),
      0
    );
  };

  const subtotal = calculateSubtotal();
  const deliveryFee = subtotal > 1000000 ? 0 : 50000; // Free delivery over 1M VND
  const tax = subtotal * 0.1; // 10% VAT
  const discount = promoCode ? subtotal * 0.1 : 0; // 10% discount if promo applied
  const total = subtotal + deliveryFee + tax - discount;

  const handleApplyPromo = () => {
    setPromoError("");

    // Mock promo validation
    const validPromoCodes = ["CAMP10", "OUTDOOR15", "NEWUSER"];

    if (validPromoCodes?.includes(promoInput?.toUpperCase())) {
      onApplyPromo(promoInput?.toUpperCase());
      setPromoInput("");
    } else {
      setPromoError("Invalid Promo Code");
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      <h2 className="font-heading font-semibold text-xl text-foreground">
        Order summary
      </h2>
      {/* Order Details */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            Subtotal ({cartItems?.length} item{cartItems?.length > 1 ? "s" : ""}
            )
          </span>
          <span className="text-foreground">{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping fee</span>
          <span className="text-foreground">
            {deliveryFee === 0 ? "Free of Charge" : formatPrice(deliveryFee)}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">VAT (10%)</span>
          <span className="text-foreground">{formatPrice(tax)}</span>
        </div>

        {promoCode && (
          <div className="flex justify-between text-sm">
            <span className="text-success">Promotion ({promoCode})</span>
            <span className="text-success">-{formatPrice(discount)}</span>
          </div>
        )}

        <div className="border-t border-border pt-3">
          <div className="flex justify-between font-semibold text-lg">
            <span className="text-foreground">Total</span>
            <span className="text-primary">{formatPrice(total)}</span>
          </div>
        </div>
      </div>
      {/* Promo Code Section */}
      <div className="space-y-3">
        <h3 className="font-medium text-foreground">Promo Code</h3>

        {!promoCode ? (
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter Promo Code"
                value={promoInput}
                onChange={(e) => setPromoInput(e?.target?.value)}
                error={promoError}
              />
            </div>
            <Button
              variant="outline"
              onClick={handleApplyPromo}
              disabled={!promoInput?.trim()}
            >
              Apply
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between p-3 bg-success/10 border border-success/20 rounded-lg">
            <div className="flex items-center gap-2">
              <Icon name="Check" size={16} className="text-success" />
              <span className="text-sm font-medium text-success">
                Promo Code {promoCode} had been applied
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={() => onRemovePromo()}
              className="text-muted-foreground hover:text-foreground"
            />
          </div>
        )}
      </div>
      {/* Delivery Information */}
      <div className="space-y-3 pt-3 border-t border-border">
        <h3 className="font-medium text-foreground">Delivery Information</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Icon name="Truck" size={16} className="text-muted-foreground" />
            <span className="text-muted-foreground">
              Standard Delivery: 1-2 days
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Icon name="MapPin" size={16} className="text-muted-foreground" />
            <span className="text-muted-foreground">Or Pick Up at Store</span>
          </div>
        </div>
      </div>
      {/* Security Badges */}
      <div className="space-y-3 pt-3 border-t border-border">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Icon name="Shield" size={14} />
            <span>Secured Payment</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Lock" size={14} />
            <span>SSL Encryption</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>We Accept:</span>
          <div className="flex items-center gap-1">
            <div className="w-6 h-4 bg-primary rounded-sm flex items-center justify-center">
              <span className="text-[8px] text-primary-foreground font-bold">
                VISA
              </span>
            </div>
            <div className="w-6 h-4 bg-accent rounded-sm flex items-center justify-center">
              <span className="text-[8px] text-accent-foreground font-bold">
                MC
              </span>
            </div>
            <div className="w-6 h-4 bg-secondary rounded-sm flex items-center justify-center">
              <span className="text-[8px] text-secondary-foreground font-bold">
                ATM
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
