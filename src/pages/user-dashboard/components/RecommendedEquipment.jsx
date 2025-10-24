import React from "react";
import { Link } from "react-router-dom";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const RecommendedEquipment = ({ recommendations }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    })?.format(price);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-foreground text-lg">
          Gợi ý cho bạn
        </h3>
        <Link to="/equipment-catalog">
          <Button variant="ghost" size="sm">
            Xem tất cả
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
        {recommendations?.map((item) => (
          <Link
            key={item?.id}
            to={`/equipment-details/${item?.id}`}
            className="block"
          >
            <div className="border border-border rounded-lg p-3 hover:shadow-card transition-micro group">
              <div className="flex gap-3">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <Image
                    src={item?.image}
                    alt={item?.imageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground text-sm mb-1 line-clamp-1 group-hover:text-primary transition-micro">
                    {item?.name}
                  </h4>

                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <Icon
                        name="Star"
                        size={12}
                        className="text-warning fill-current"
                      />
                      <span className="text-xs text-muted-foreground">
                        {item?.rating}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">
                      {item?.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">
                      {formatPrice(item?.pricePerDay)}/ngày
                    </span>
                    {item?.available && (
                      <span className="text-xs text-success font-medium">
                        Có sẵn
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {recommendations?.length === 0 && (
        <div className="text-center py-8">
          <Icon
            name="Package"
            size={48}
            className="text-muted-foreground mx-auto mb-3"
          />
          <p className="text-muted-foreground text-sm mb-2">
            Chưa có gợi ý nào
          </p>
          <p className="text-xs text-muted-foreground">
            Hãy thuê thiết bị để nhận được gợi ý phù hợp
          </p>
        </div>
      )}
    </div>
  );
};

export default RecommendedEquipment;
