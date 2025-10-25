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

const ShoppingCart = () => {
  const navigate = useNavigate();

  // Core
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState("");

  // Pop-up Modal
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [confirmClearAll, setConfirmClearAll] = useState(false);

  const [isProcessing, setIsProcessing] = useState(false);
  const [user] = useState({
    name: "Nguyễn Văn An",
    email: "nguyen.van.an@email.com",
  });

  // Mock cart data
  useEffect(() => {
    const mockCartItems = [
      {
        id: 1,
        name: "Lều Cắm Trại Coleman Sundome 4 Người",
        category: "Lều trại",
        image: "https://images.unsplash.com/photo-1687762035856-cab4f81f2b39",
        imageAlt:
          "Orange dome tent set up in forest clearing with camping gear nearby",
        pricePerDay: 150000,
        quantity: 1,
        startDate: "2025-10-25",
        endDate: "2025-10-28",
        totalPrice: 450000,
      },
      {
        id: 2,
        name: "Túi Ngủ North Face Cat\'s Meow",
        category: "Đồ ngủ",
        image: "https://images.unsplash.com/photo-1623903441132-91d5ecc02b45",
        imageAlt:
          "Blue sleeping bag laid out on wooden cabin floor with camping equipment",
        pricePerDay: 80000,
        quantity: 2,
        startDate: "2025-10-25",
        endDate: "2025-10-28",
        totalPrice: 480000,
      },
      {
        id: 3,
        name: "Bếp Gas Mini Jetboil Flash",
        category: "Nấu ăn",
        image: "https://images.unsplash.com/photo-1722607731856-ff7d914b1be3",
        imageAlt:
          "Compact camping stove with orange flame cooking pot outdoors on rocky surface",
        pricePerDay: 60000,
        quantity: 1,
        startDate: "2025-10-25",
        endDate: "2025-10-28",
        totalPrice: 180000,
      },
    ];

    setCartItems(mockCartItems);
  }, []);

  const handleUpdateQuantity = (itemId, newQuantity) => {
    setCartItems((items) =>
      items?.map((item) =>
        item?.id === itemId
          ? {
              ...item,
              quantity: newQuantity,
              totalPrice: item?.pricePerDay * newQuantity * calculateDays(item),
            }
          : item,
      ),
    );
  };

  const handleUpdateDates = (itemId, startDate, endDate) => {
    setCartItems((items) =>
      items?.map((item) =>
        item?.id === itemId
          ? {
              ...item,
              startDate,
              endDate,
              totalPrice:
                item?.pricePerDay *
                item?.quantity *
                calculateDaysFromDates(startDate, endDate),
            }
          : item,
      ),
    );
  };

  const handleRemoveItem = (itemId) => {
    setDeleteTarget(itemId); // open confirmation dialog
  };

  const confirmRemoveItem = () => {
    setCartItems((items) => items?.filter((item) => item?.id !== deleteTarget));
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
    const subtotal = cartItems?.reduce((total, item) => {
      const days = calculateDays(item);
      return total + item?.pricePerDay * days * item?.quantity;
    }, 0);

    const deliveryFee = subtotal > 1000000 ? 0 : 50000;
    const tax = subtotal * 0.1;
    const discount = promoCode ? subtotal * 0.1 : 0;

    return subtotal + deliveryFee + tax - discount;
  };

  const handleProceedToCheckout = (checkoutData) => {
    setIsProcessing(true);

    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      // Navigate to payment page (would be implemented)
      console.log("Proceeding to checkout with:", checkoutData);
      alert("Chuyển đến trang thanh toán...");
    }, 2000);
  };

  if (cartItems?.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header user={user} cartCount={0} />
        <main className="pt-16">
          <EmptyCart />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} cartCount={cartItems?.length} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <button
                onClick={() => navigate("/equipment-catalog")}
                className="hover:text-primary"
              >
                Trang chủ
              </button>
              <Icon name="ChevronRight" size={16} />
              <span>Giỏ hàng</span>
            </div>
            <h1 className="font-heading font-bold text-3xl text-foreground">
              Giỏ hàng của bạn
            </h1>
            <p className="text-muted-foreground mt-2">
              Xem lại và chỉnh sửa các sản phẩm trước khi thanh toán
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {/* Items Header */}
              <div className="flex items-center justify-between">
                <h2 className="font-heading font-semibold text-xl text-foreground">
                  Sản phẩm ({cartItems?.length})
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Trash2"
                  iconPosition="left"
                  onClick={() => setConfirmClearAll(true)}
                  className="text-destructive hover:text-destructive"
                >
                  Xóa tất cả
                </Button>
              </div>

              {/* Cart Items List */}
              <div className="space-y-4">
                {cartItems?.map((item) => (
                  <CartItem
                    key={item?.id}
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
                  Tiếp tục mua sắm
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Order Summary */}
              <OrderSummary
                cartItems={cartItems}
                promoCode={promoCode}
                onApplyPromo={handleApplyPromo}
                onRemovePromo={handleRemovePromo}
              />

              {/* Checkout Section */}
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
              <span className="font-medium text-foreground">Tổng cộng:</span>
              <span className="font-semibold text-lg text-primary">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })?.format(calculateTotal())}
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
              {isProcessing ? "Đang xử lý..." : "Thanh toán ngay"}
            </Button>
          </div>
        </div>
      </main>

      {/* Confirmation Modals */}
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Xóa sản phẩm?"
        description="Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?"
        onConfirm={confirmRemoveItem}
      />

      <ConfirmDialog
        open={confirmClearAll}
        onOpenChange={setConfirmClearAll}
        title="Xóa tất cả sản phẩm?"
        description="Bạn có chắc chắn muốn xóa toàn bộ sản phẩm khỏi giỏ hàng?"
        onConfirm={confirmRemoveAll}
      />
    </div>
  );
};

export default ShoppingCart;
