import { useState, useEffect } from "react";
import creditCardType from "credit-card-type";
import { QRCodeSVG } from "qrcode.react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../../components/ui/dialog.jsx";
import Button from "../../../components/ui/Button.jsx";
import  Input  from "../../../components/ui/input.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select.jsx";

export function PaymentModal({
  open,
  onOpenChange,
  onPaymentSuccess,
  total,
  cartItems,
  checkoutData,
}) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState("");
  const [cardType, setCardType] = useState(null);
  const [cvcLimit, setCvcLimit] = useState(null);
  const [cvc, setCvc] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCardNumberChange = (e) => {
    const cardNumber = e.target.value.replace(/\s/g, "");
    setPaymentDetails(cardNumber);

    if (cardNumber.length > 0) {
      const types = creditCardType(cardNumber);
      if (types.length > 0) {
        setCardType(types[0].niceType);
        setCvcLimit(types[0].code.size);
      } else {
        setCardType(null);
        setCvcLimit(null);
      }
    } else {
      setCardType(null);
      setCvcLimit(null);
    }
  };

  const getCvcPlaceholder = () => {
    return cvcLimit ? `Enter ${cvcLimit}-Digit CVC` : "CVC";
  };

  useEffect(() => {
    if (selectedPaymentMethod === "momo-qr") {
      setPaymentDetails("QR/Momo Payment Selected");
    } else {
      setPaymentDetails("");
    }
  }, [selectedPaymentMethod]);

  const handlePayment = async () => {
    setIsProcessing(true);

    const purchaseData = {
      total: total,
      deliveryOption: checkoutData.deliveryOption,
      timeSlot: checkoutData.timeSlot,
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.productName || item.name,
        brand: item.brand || "Unknown",
        category: item.type || "Equipment",
        quantity: item.quantity,
        price: item.productPrice,
        orderPrice: item.orderPrice,
      })),
    };

    try {
      const res = await fetch("http://localhost:5050/api/purchase-logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...purchaseData,
          method: selectedPaymentMethod,
          details: paymentDetails,
        }),
      });

      if (!res.ok) throw new Error("Payment failed");

      localStorage.setItem("latest_purchase", JSON.stringify(purchaseData));

      const result = await res.json();
      console.log("Payment processed:", result);

      onPaymentSuccess();

      onOpenChange(false);
    } catch (err) {
      console.error("Payment failed:", err);
      alert("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-white rounded-lg shadow-xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">
            Complete Your Payment
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Please review your order and choose a payment method to complete
            your purchase.
          </DialogDescription>
        </DialogHeader>

        {/* Order Summary */}
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-700">Total:</span>
              <span className="font-semibold text-lg text-primary">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(total)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Delivery Option:</span>
              <span className="text-gray-600">
                {checkoutData.deliveryOption}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Time Slot:</span>
              <span className="text-gray-600">{checkoutData.timeSlot}</span>
            </div>

            <div className="space-y-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.quantity} x {item.productName || item.name}
                  </span>
                  <span>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.orderPrice)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-gray-800">
            Select Payment Method
          </h4>
          <Select
            value={selectedPaymentMethod}
            onValueChange={setSelectedPaymentMethod}
            className="mt-2"
          >
            <SelectTrigger>
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="credit-card">Credit Card</SelectItem>
              <SelectItem value="momo-qr">Momo or QR Payment</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Payment Details for Credit Card */}
        {selectedPaymentMethod === "credit-card" && (
          <>
            <div className="mt-4">
              <Input
                type="text"
                value={paymentDetails}
                onChange={handleCardNumberChange}
                placeholder="Enter Card Number"
                className="border rounded-md p-2 w-full mb-4"
              />
            </div>
            <div className="flex gap-4 mt-4">
              <Input
                type="text"
                value={expiryDate}
                disabled={!paymentDetails}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder="MM/YY"
                className="border rounded-md p-2 w-full"
              />
              <Input
                type="text"
                disabled={!cvcLimit}
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                placeholder={getCvcPlaceholder()}
                className="border rounded-md p-2 w-full"
                maxLength={cvcLimit}
              />
            </div>
          </>
        )}

        {/* QR Code for Momo/QR Payment */}
        {selectedPaymentMethod === "momo-qr" && (
          <div className="mt-4 flex flex-col items-center justify-center text-center">
            <QRCodeSVG
              value={`https://payment-link.com/amount/${total}`}
              size={128}
              fgColor="#000000"
            />
            <p className="mt-2 text-gray-500">Scan to pay via Momo or QR</p>
          </div>
        )}

        {/* Card Type Display */}
        {cardType && selectedPaymentMethod === "credit-card" && (
          <div className="mt-2 text-gray-600">
            <strong>Card Type:</strong> {cardType}
          </div>
        )}

        {/* Dialog Footer */}
        <DialogFooter className="flex justify-between gap-4 pt-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full md:w-auto"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handlePayment}
            disabled={isProcessing || !selectedPaymentMethod || !paymentDetails}
            className="w-full md:w-auto"
          >
            {isProcessing ? "Processing..." : "Complete Payment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
