import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const EmptyCart = () => {
  return (
    <div className="text-center py-16 px-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Empty Cart Icon */}
        <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
          <Icon
            name="ShoppingCart"
            size={48}
            className="text-muted-foreground"
          />
        </div>

        {/* Empty State Content */}
        <div className="space-y-3">
          <h2 className="font-heading font-semibold text-2xl text-foreground">
            Giỏ hàng trống
          </h2>
          <p className="text-muted-foreground">
            Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá các thiết bị
            cắm trại tuyệt vời của chúng tôi!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link to="/equipment-catalog">
            <Button
              variant="default"
              size="lg"
              iconName="Search"
              iconPosition="left"
              fullWidth
            >
              Khám phá thiết bị
            </Button>
          </Link>

          <div className="text-sm text-muted-foreground">
            Hoặc{" "}
            <Link
              to="/equipment-catalog"
              className="text-primary hover:underline"
            >
              xem danh mục sản phẩm
            </Link>
          </div>
        </div>

        {/* Popular Categories */}
        <div className="pt-8 space-y-4">
          <h3 className="font-medium text-foreground">Danh mục phổ biến</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/equipment-catalog?category=tents"
              className="p-4 border border-border rounded-lg hover:bg-muted transition-micro text-center"
            >
              <Icon
                name="Home"
                size={24}
                className="mx-auto mb-2 text-primary"
              />
              <span className="text-sm font-medium text-foreground">
                Lều trại
              </span>
            </Link>
            <Link
              to="/equipment-catalog?category=sleeping"
              className="p-4 border border-border rounded-lg hover:bg-muted transition-micro text-center"
            >
              <Icon
                name="Moon"
                size={24}
                className="mx-auto mb-2 text-primary"
              />
              <span className="text-sm font-medium text-foreground">
                Đồ ngủ
              </span>
            </Link>
            <Link
              to="/equipment-catalog?category=cooking"
              className="p-4 border border-border rounded-lg hover:bg-muted transition-micro text-center"
            >
              <Icon
                name="ChefHat"
                size={24}
                className="mx-auto mb-2 text-primary"
              />
              <span className="text-sm font-medium text-foreground">
                Nấu ăn
              </span>
            </Link>
            <Link
              to="/equipment-catalog?category=backpacks"
              className="p-4 border border-border rounded-lg hover:bg-muted transition-micro text-center"
            >
              <Icon
                name="Backpack"
                size={24}
                className="mx-auto mb-2 text-primary"
              />
              <span className="text-sm font-medium text-foreground">Ba lô</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
