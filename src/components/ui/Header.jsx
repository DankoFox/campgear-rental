// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../AppIcon";
import Button from "./Button";

const Header = ({ user = null, cartCount = 0 }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location]);

  const navigationItems = [
    {
      label: "Thiết bị cắm trại",
      path: "/equipment-catalog",
      icon: "Tent",
    },
    {
      label: "Giỏ hàng",
      path: "/shopping-cart",
      icon: "ShoppingCart",
      badge: cartCount > 0 ? cartCount : null,
    },
  ];

  const isActivePath = (path) => {
    if (path === "/equipment-catalog") {
      return (
        location?.pathname === "/equipment-catalog" ||
        location?.pathname === "/equipment-details"
      );
    }
    return location?.pathname === path;
  };

  const handleLogout = () => {
    // Logout logic would be implemented here
    console.log("Logout clicked");
    setIsUserMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-card border-b border-border">
      <nav className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <Link to="/main" className="flex items-center space-x-2 flex-shrink-0">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Mountain" size={20} color="white" />
          </div>
          <span className="font-heading font-bold text-xl text-foreground hidden sm:block">
            CampGear
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`relative flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-micro ${
                isActivePath(item?.path)
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Icon name={item?.icon} size={18} />
              <span>{item?.label}</span>
              {item?.badge && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                  {item?.badge > 99 ? "99+" : item?.badge}
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* Account Section */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted transition-micro"
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground text-sm font-medium">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </span>
                </div>
                <span className="hidden lg:block text-sm font-medium text-foreground">
                  {user?.name || "Người dùng"}
                </span>
                <Icon
                  name="ChevronDown"
                  size={16}
                  className="hidden lg:block"
                />
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-modal z-[1050]">
                  <div className="p-2">
                    <Link
                      to="/user-dashboard"
                      className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-popover-foreground hover:bg-muted rounded-md transition-micro"
                    >
                      <Icon name="User" size={16} />
                      <span>Tài khoản của tôi</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-popover-foreground hover:bg-muted rounded-md transition-micro"
                    >
                      <Icon name="LogOut" size={16} />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-3">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Đăng nhập
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="default" size="sm">
                  Đăng ký
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md hover:bg-muted transition-micro"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </nav>
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <div className="px-4 py-3 space-y-2">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center justify-between px-3 py-3 rounded-md text-sm font-medium transition-micro ${
                  isActivePath(item?.path)
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </div>
                {item?.badge && (
                  <span className="bg-accent text-accent-foreground text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                    {item?.badge > 99 ? "99+" : item?.badge}
                  </span>
                )}
              </Link>
            ))}

            {/* Mobile Account Section */}
            {!user && (
              <div className="pt-3 border-t border-border space-y-2">
                <Link to="/login" className="block">
                  <Button variant="ghost" size="sm" fullWidth>
                    Đăng nhập
                  </Button>
                </Link>
                <Link to="/register" className="block">
                  <Button variant="default" size="sm" fullWidth>
                    Đăng ký
                  </Button>
                </Link>
              </div>
            )}

            {user && (
              <div className="pt-3 border-t border-border space-y-2">
                <Link
                  to="/user-dashboard"
                  className="flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-micro"
                >
                  <Icon name="User" size={18} />
                  <span>Tài khoản của tôi</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 w-full px-3 py-3 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-micro"
                >
                  <Icon name="LogOut" size={18} />
                  <span>Đăng xuất</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
