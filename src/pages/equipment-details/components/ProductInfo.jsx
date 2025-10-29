import ReviewHover from "@/components/ui/ReviewHover";
import Icon from "../../../components/AppIcon";
import { formatPrice } from "@/utils/pricing";

const ProductInfo = ({ product }) => {
  const weeklyPrice = product.price * 5;

  return (
    <div className="space-y-6">
      {/* Product Title and Category */}
      <div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
          <Icon name="Tag" size={16} />
          <span>{product?.type}</span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground">
          {product?.name}
        </h1>
      </div>

      {/* Pricing */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Daily Rental Price</p>
            <p className="text-xl font-bold text-primary">
              {formatPrice(product?.price)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Weekly Rental Price</p>
            <p className="text-xl font-bold text-primary">
              {formatPrice(weeklyPrice)}
            </p>
            <p className="text-xs text-success">
              Save{" "}
              {Math.round(
                ((product?.price * 7 - weeklyPrice) / (product?.price * 7)) *
                  100
              )}
              %
            </p>
          </div>
        </div>
      </div>

      {/* Provider Information */}
      <div className="border border-border rounded-lg p-4">
        <div className="flex justify-between items-start gap-4">
          {/* Provider Section */}
          <div>
            <h3 className="font-heading font-semibold">Provider</h3>
            <div className="flex items-center space-x-3 mt-1">
              <div className="flex items-center w-24 justify-center">
                <img
                  src={`/svg/${product?.brand
                    ?.toLowerCase()
                    .replace(/\s+/g, "")}.svg`}
                  alt={product?.brand}
                  className="object-contain"
                />
              </div>
              <p className="font-medium">{product?.brand} Corporation</p>
            </div>
          </div>

          {/* Find Review Section */}
          <div>
            <h3 className="font-heading font-semibold">Brand Review</h3>
            <div className="mt-1 flex gap-4">
              <ReviewHover search={product?.brand} option="reddit" />
              <ReviewHover search={product?.brand} option="tiktok" />
            </div>
          </div>
        </div>
      </div>

      {/* Availability Status */}
      <div className="flex items-center space-x-2">
        <div
          className={`w-3 h-3 rounded-full ${
            product?.availability === "available"
              ? "bg-success"
              : product?.availability === "limited"
              ? "bg-warning"
              : "bg-error"
          }`}
        />
        <span className="text-sm font-medium">
          {product?.availability === "available" && "Available"}
          {product?.availability === "limited" && "Limited Stock"}
          {product?.availability === "unavailable" && "Out of Stock"}
        </span>
      </div>

      {/* Key Features */}
      <div>
        <h3 className="font-heading font-semibold mb-3">Key Features</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {product?.features?.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon
                name="Check"
                size={16}
                className="text-success flex-shrink-0"
              />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
