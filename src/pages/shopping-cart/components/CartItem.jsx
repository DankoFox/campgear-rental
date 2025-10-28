import React, { useEffect, useState } from "react";
import Image from "../../../components/AppImage";

import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

const CartItem = ({ item, onUpdateQuantity, onUpdateDates, onRemove }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    startDate: item?.startDate,
    endDate: item?.endDate,
    quantity: item?.quantity,
  });

  const handleSaveChanges = () => {
    onUpdateQuantity(item?.id, editData?.quantity);
    onUpdateDates(item?.id, editData?.startDate, editData?.endDate);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditData({
      startDate: item?.startDate,
      endDate: item?.endDate,
      quantity: item?.quantity,
    });
    setIsEditing(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    })?.format(price);
  };

  const calculateDays = () => {
    const start = new Date(item.startDate);
    const end = new Date(item.endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  useEffect(() => {
    console.log("change", item);
  }, [item]);

  return (
    <div className="bg-card border border-border rounded-lg p-4 lg:p-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Equipment Image */}
        <div className="flex-shrink-0">
          <div className="w-full lg:w-32 h-32 rounded-lg overflow-hidden bg-muted">
            <Image
              src={item?.image[0]}
              alt={item?.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Equipment Details */}
        <div className="flex-1 space-y-3">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2">
            <div>
              <h3 className="font-heading font-semibold text-lg text-foreground">
                {item?.name}
              </h3>
              <p className="text-sm text-muted-foreground">{item?.type}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-lg text-foreground">
                {formatPrice(item?.productPrice)}/day
                {/* Not Work Here */}
              </p>
            </div>
          </div>

          {/* Rental Details */}
          {!isEditing ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-3 border-t border-border">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Start Date
                </p>
                <p className="text-sm text-foreground">{item?.startDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  End Date
                </p>
                <p className="text-sm text-foreground">{item?.endDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Quantity
                </p>
                <p className="text-sm text-foreground">
                  {item?.quantity} item{item?.quantity > 1 ? "s" : ""}
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-3 border-t border-border">
              <Input
                label="Start Date"
                type="date"
                value={editData?.startDate}
                onChange={(e) =>
                  setEditData({ ...editData, startDate: e?.target?.value })
                }
              />
              <Input
                label="End Date"
                type="date"
                value={editData?.endDate}
                onChange={(e) =>
                  setEditData({ ...editData, endDate: e?.target?.value })
                }
              />
              <Input
                label="Quantity"
                type="number"
                min="1"
                value={editData?.quantity}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    quantity: parseInt(e?.target?.value),
                  })
                }
              />
            </div>
          )}

          {/* Duration and Total */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-2">
            <p className="text-sm text-muted-foreground">
              Rental Duration: {calculateDays()} day
              {calculateDays() > 1 ? "s" : ""}
            </p>
            <p className="text-sm font-medium text-foreground">
              Total: {formatPrice(item?.orderPrice)}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 pt-3 border-t border-border">
            {!isEditing ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Edit"
                  iconPosition="left"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Trash2"
                  iconPosition="left"
                  onClick={() => onRemove(item?.id)}
                  className="text-destructive hover:text-destructive"
                >
                  Delete
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="default"
                  size="sm"
                  iconName="Check"
                  iconPosition="left"
                  onClick={handleSaveChanges}
                >
                  Save
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="X"
                  iconPosition="left"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
