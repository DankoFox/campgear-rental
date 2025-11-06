// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "./components/CartItem";
import OrderSummary from "./components/OrderSummary";
import EmptyCart from "./components/EmptyCart";
import CheckoutSection from "./components/CheckoutSection";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import { ConfirmDialog } from "../../components/ConfirmDialog";
import { PaymentModal } from "./components/PaymentModal";
import { calculateRentalPrice } from "@/utils/pricing";

// const LOCAL_STORAGE_KEY = "shoppingCartItems";

const ShoppingCart = ({ cartItems, setCartItems, setCartCount }) => {
  const navigate = useNavigate();
  // Core
  const [promoCode, setPromoCode] = useState("");

  // Pop-up Modal
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [confirmClearAll, setConfirmClearAll] = useState(false);

  const [isProcessing, setIsProcessing] = useState(false);
  const [user] = useState({
    name: JSON.parse(localStorage.getItem("user"))?.name || "Guest",
    email: JSON.parse(localStorage.getItem("user"))?.email || "guest@gmail.com",
  });

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // New states for delivery info
  const [deliveryOption, setDeliveryOption] = useState("delivery"); // default delivery
  const [timeSlot, setTimeSlot] = useState(""); // initial empty time slot

  const handleProceedToCheckout = async (checkoutData) => {
    setDeliveryOption(checkoutData.deliveryOption);
    setTimeSlot(checkoutData.timeSlot);

    setIsPaymentModalOpen(true); // Open payment modal when ready to checkout
  };

  const handlePaymentSuccess = () => {
    setCartItems([]);
    setCartCount(0);
    navigate("/thank-you");
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    setCartItems((items) =>
      items.map((item) => {
        if (item.id !== itemId) return item;

        const { totalPrice } = calculateRentalPrice(
          new Date(item.startDate),
          new Date(item.endDate),
          item.productPrice,
          newQuantity
        );

        return {
          ...item,
          quantity: newQuantity,
          orderPrice: totalPrice,
        };
      })
    );
  };

  const handleUpdateDates = (itemId, startDate, endDate) => {
    setCartItems((items) =>
      items.map((item) => {
        if (item.id !== itemId) return item;

        const { totalPrice } = calculateRentalPrice(
          new Date(startDate),
          new Date(endDate),
          item.productPrice,
          item.quantity
        );

        return {
          ...item,
          startDate,
          endDate,
          orderPrice: totalPrice,
        };
      })
    );
  };

  const handleRemoveItem = (itemId) => {
    setDeleteTarget(itemId); // open confirmation dialog
  };

  const confirmRemoveItem = () => {
    const updated = cartItems.filter((item) => item.id !== deleteTarget);
    setCartItems(updated);
    setCartCount(updated.length);
    setDeleteTarget(null);
  };

  const confirmRemoveAll = () => {
    setCartItems([]);
    setCartCount(0);
    setConfirmClearAll(false);
  };

  const handleApplyPromo = (code) => {
    setPromoCode(code);
  };

  const handleRemovePromo = () => {
    setPromoCode("");
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce(
      (total, item) => total + (item.orderPrice || 0),
      0
    );

    const deliveryFee = subtotal > 1000000 ? 0 : 50000;
    const tax = subtotal * 0.1;
    const discount = promoCode ? subtotal * 0.1 : 0;

    return subtotal + deliveryFee + tax - discount;
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <main>
          <EmptyCart />
        </main>
      </div>
    );
  }
  // Persist cart in localStorage whenever it changes
  // useEffect(() => {
  //   // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
  // }, [cartItems]);
  return (
    <div className="min-h-screen bg-background">
      <main>
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <button
                onClick={() => navigate("/equipment-catalog")}
                className="hover:text-primary"
              >
                Home
              </button>
              <Icon name="ChevronRight" size={16} />
              <span>Cart</span>
            </div>
            <h1 className="font-heading font-bold text-3xl text-foreground">
              Your Shopping Cart
            </h1>
            <p className="text-muted-foreground mt-2">
              Re-check and Adjust Cart Items before Purchasing
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {/* Items Header */}
              <div className="flex items-center justify-between">
                <h2 className="font-heading font-semibold text-xl text-foreground">
                  Cart Items ({cartItems.length})
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Trash2"
                  iconPosition="left"
                  onClick={() => setConfirmClearAll(true)}
                  className="text-destructive hover:text-destructive"
                >
                  Clear Cart
                </Button>
              </div>

              {/* Cart Items List */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onUpdateDates={handleUpdateDates}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </div>

              {/* Continue Shopping */}
              <div className="pt-6 border-t border-border">
                <Button
                  variant="outline"
                  iconName="ArrowLeft"
                  iconPosition="left"
                  onClick={() => navigate("/equipment-catalog")}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <OrderSummary
                cartItems={cartItems}
                promoCode={promoCode}
                onApplyPromo={handleApplyPromo}
                onRemovePromo={handleRemovePromo}
              />

              <CheckoutSection
                cartItems={cartItems}
                total={calculateTotal()}
                isProcessing={isProcessing}
                onProceedToCheckout={handleProceedToCheckout}
              />
            </div>
          </div>

          {/* Mobile Sticky Checkout */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 z-50">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-foreground">Total: </span>
              <span className="font-semibold text-lg text-primary">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(calculateTotal())}
              </span>
            </div>
            <Button
              variant="default"
              size="lg"
              fullWidth
              loading={isProcessing}
              iconName="CreditCard"
              iconPosition="left"
              onClick={() =>
                handleProceedToCheckout({
                  deliveryOption: "delivery",
                  timeSlot: "9-12",
                })
              }
            >
              {isProcessing ? "Processing..." : "Proceed to purchase"}
            </Button>
          </div>
        </div>
      </main>

      {/* Confirmation Modals */}
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete Cart Item?"
        description="Are you sure you want to delete this item"
        onConfirm={confirmRemoveItem}
      />

      <ConfirmDialog
        open={confirmClearAll}
        onOpenChange={setConfirmClearAll}
        title="Clear All Cart Item?"
        description="Are you sure you want to clear the cart"
        onConfirm={confirmRemoveAll}
      />

      <PaymentModal
        open={isPaymentModalOpen}
        onOpenChange={setIsPaymentModalOpen}
        onPaymentSuccess={handlePaymentSuccess}
        total={calculateTotal()} // Pass the total amount
        cartItems={cartItems} // Pass cart items for review or any other purposes
        checkoutData={{
          deliveryOption: deliveryOption,
          timeSlot: timeSlot,
        }} // Pass the checkout data
      />
    </div>
  );
};

export default ShoppingCart;
