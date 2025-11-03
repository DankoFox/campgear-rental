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
            Your Cart is Empty
          </h2>
          <p className="text-muted-foreground">
            You don’t have any items in your cart yet. Explore our amazing
            camping gear!
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
              Explore Equipment
            </Button>
          </Link>

          <div className="text-sm text-muted-foreground">
            Or{" "}
            <Link
              to="/equipment-catalog"
              className="text-primary hover:underline"
            >
              browse the product catalog
            </Link>
          </div>
        </div>

        {/* Popular Categories */}
        <div className="pt-8 space-y-4">
          <h3 className="font-medium text-foreground">Popular Categories</h3>
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
              <span className="text-sm font-medium text-foreground">Tents</span>
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
                Sleeping Gear
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
                Cooking Gear
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
              <span className="text-sm font-medium text-foreground">
                Backpacks
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
