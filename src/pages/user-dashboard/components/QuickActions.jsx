import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const QuickActions = () => {
  const actions = [
    {
      id: 1,
      title: "Thuê thiết bị mới",
      description: "Khám phá thiết bị cắm trại",
      icon: "Plus",
      path: "/equipment-catalog",
      variant: "default",
    },
    {
      id: 2,
      title: "Cài đặt tài khoản",
      description: "Quản lý thông tin cá nhân",
      icon: "Settings",
      path: "/profile-settings",
      variant: "outline",
    },
    {
      id: 3,
      title: "Phương thức thanh toán",
      description: "Thêm hoặc sửa thẻ",
      icon: "CreditCard",
      path: "/payment-methods",
      variant: "outline",
    },
    {
      id: 4,
      title: "Hỗ trợ khách hàng",
      description: "Liên hệ với chúng tôi",
      icon: "HelpCircle",
      path: "/support",
      variant: "ghost",
    },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
      <h3 className="font-heading font-semibold text-foreground text-lg mb-4">
        Thao tác nhanh
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions?.map((action) => (
          <Link key={action?.id} to={action?.path} className="block">
            <div className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-micro group">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-micro">
                  <Icon
                    name={action?.icon}
                    size={20}
                    className="text-primary"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground text-sm mb-1 group-hover:text-primary transition-micro">
                    {action?.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {action?.description}
                  </p>
                </div>
                <Icon
                  name="ChevronRight"
                  size={16}
                  className="text-muted-foreground group-hover:text-primary transition-micro"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
