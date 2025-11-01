// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";

const ThankYouPage = () => {
  const navigate = useNavigate();
  const [purchaseData, setPurchaseData] = useState(null);

  useEffect(() => {
    // Retrieve latest purchase from localStorage (or you could fetch from backend)
    const savedData = localStorage.getItem("latest_purchase");
    if (savedData) {
      setPurchaseData(JSON.parse(savedData));
    }
  }, []);

  if (!purchaseData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-center">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            No purchase found
          </h2>
          <Button onClick={() => navigate("/equipment-catalog")}>
            Back to Shop
          </Button>
        </div>
      </div>
    );
  }

  const { total, deliveryOption, timeSlot, items } = purchaseData;

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-3xl mx-auto px-4 py-12 text-center">
        <Icon
          name="CheckCircle2"
          size={72}
          className="mx-auto text-green-500"
        />
        <h1 className="font-heading text-4xl font-bold mt-4 text-foreground">
          Thank You for Your Purchase!
        </h1>
        <p className="text-muted-foreground mt-2 mb-8">
          Your order has been successfully processed.
        </p>

        {/* Purchase Info */}
        <div className="bg-card rounded-2xl shadow-sm p-6 text-left mb-8">
          <h2 className="font-semibold text-xl mb-4">Order Summary</h2>

          <div className="space-y-2 text-sm">
            <p>
              <strong>Delivery Option:</strong> {deliveryOption}
            </p>
            <p>
              <strong>Time Slot:</strong> {timeSlot}
            </p>
            <p>
              <strong>Total:</strong>{" "}
              <span className="text-primary font-medium">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(total)}
              </span>
            </p>
          </div>

          <hr className="my-4 border-border" />

          <h3 className="font-semibold text-lg mb-2">Items Purchased</h3>
          <ul className="divide-y divide-border">
            {items.map((item) => (
              <li
                key={item.id}
                className="py-3 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.brand} — {item.category}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div className="font-medium">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(item.orderPrice)}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={() => navigate("/equipment-catalog")}>
            Continue Shopping
          </Button>
          <Button variant="outline" onClick={() => navigate("/")}>
            Go to Home
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ThankYouPage;
