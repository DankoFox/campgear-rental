// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import CartItem from "./components/CartItem";
import OrderSummary from "./components/OrderSummary";
import EmptyCart from "./components/EmptyCart";
import CheckoutSection from "./components/CheckoutSection";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import { ConfirmDialog } from "../../components/ConfirmDialog";

const LOCAL_STORAGE_KEY = "shoppingCartItems";

const ShoppingCart = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();
  // Core
  const [promoCode, setPromoCode] = useState("");

  // Pop-up Modal
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [confirmClearAll, setConfirmClearAll] = useState(false);

  const [isProcessing, setIsProcessing] = useState(false);
  const [user] = useState({
    name: "Nguyễn Văn An",
    email: "nguyen.van.an@email.com",
  });

  const calculateOrderPrice = (startDate, endDate, quantity, pricePerDay) => {
    console.log(startDate, endDate, quantity, pricePerDay);
    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffTime = end - start;
    if (isNaN(diffTime) || diffTime < 0) return 0;

    const totalDays = Math.max(
      1,
      Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
    );

    const chargeableDays = Math.floor(totalDays / 7) * 5 + (totalDays % 7);
    return chargeableDays * pricePerDay * quantity;
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    setCartItems((items) => {
      const newItems = items.map((item) => {
        if (item.id !== itemId) return item;

        const newOrderPrice = calculateOrderPrice(
          item.startDate,
          item.endDate,
          newQuantity,
          item.productPrice
        );

        console.log("Updated orderPrice:", newOrderPrice);

        return {
          ...item,
          quantity: newQuantity,
          orderPrice: newOrderPrice,
        };
      });

      return newItems;
    });
  };

  const handleUpdateDates = (itemId, startDate, endDate) => {
    setCartItems((items) => {
      const newItems = items.map((item) => {
        if (item.id !== itemId) return item;

        const newOrderPrice = calculateOrderPrice(
          startDate,
          endDate,
          item.quantity,
          item.productPrice
        );

        console.log("Updated orderPrice:", newOrderPrice);

        return {
          ...item,
          startDate,
          endDate,
          orderPrice: newOrderPrice,
        };
      });

      return newItems;
    });
  };

  const handleRemoveItem = (itemId) => {
    setDeleteTarget(itemId); // open confirmation dialog
  };

  const confirmRemoveItem = async () => {
    // setCartItems((items) => items.filter((item) => item.id !== deleteTarget));
    try {
      const response = await fetch(
        `http://localhost:5000/api/data/${deleteTarget}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();

      if (response.ok) {
        setCartItems(result.data); // update frontend after backend delete
      } else {
        console.error("Failed to delete item:", result.message);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
    setDeleteTarget(null);
  };

  const confirmRemoveAll = () => {
    setCartItems([]);
    setConfirmClearAll(false);
  };

  const handleApplyPromo = (code) => {
    setPromoCode(code);
  };

  const handleRemovePromo = () => {
    setPromoCode("");
  };

  const calculateDays = (item) => {
    const start = new Date(item.startDate);
    const end = new Date(item.endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  const calculateDaysFromDates = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((total, item) => {
      const days = calculateDays(item);
      return total + item.pricePerDay * days * item.quantity;
    }, 0);

    const deliveryFee = subtotal > 1000000 ? 0 : 50000;
    const tax = subtotal * 0.1;
    const discount = promoCode ? subtotal * 0.1 : 0;

    return subtotal + deliveryFee + tax - discount;
  };

  const handleProceedToCheckout = (checkoutData) => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      alert("Chuyển đến trang thanh toán...");
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        {/* <Header user={user} cartCount={0} /> */}
        <main>
          <EmptyCart />
        </main>
      </div>
    );
  }
  // Persist cart in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);
  return (
    <div className="min-h-screen bg-background">
      <Header user={user} cartCount={cartItems.length} />
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
    </div>
  );
};

export default ShoppingCart;
