// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Icon from "../AppIcon";
import Button from "./Button";

const Header = ({ cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Load user from localStorage when the page loads
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, []);

  // ✅ Close menus when navigating to a new page
  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location]);

  const navigationItems = [
    { label: "Camping Equipment", path: "/equipment-catalog", icon: "Tent" },
    {
      label: "Camping Equipment",
      path: "/equipment-catalog",
      icon: "Tent",
    },
    {
      label: "Cart",
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
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const handleCloseMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setIsMenuOpen(false);
    }, 250); // Match animation duration
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-card border-b border-border">
      <nav className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Mountain" size={20} color="white" />
          </div>
          <span className="font-heading font-bold text-xl text-foreground hidden sm:block">
            CampGear
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-micro ${
                isActivePath(item.path)
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Icon name={item.icon} size={18} />
              <span>{item.label}</span>
              {item.badge && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                  {item.badge > 99 ? "99+" : item.badge}
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* User Section */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted transition-micro"
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground text-sm font-medium">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </span>
                </div>
                <span className="hidden lg:block text-sm font-medium text-foreground">
                  {user?.name || "User"}
                </span>
                <Icon name="ChevronDown" size={16} className="hidden lg:block" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-modal z-[1050]">
                  <div className="p-2">
                    <Link
                      to="/user-dashboard"
                      className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-popover-foreground hover:bg-muted rounded-md transition-micro"
                    >
                      <Icon name="User" size={16} />
                      <span>My Account</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-popover-foreground hover:bg-muted rounded-md transition-micro"
                    >
                      <Icon name="LogOut" size={16} />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-3">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="default" size="sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-muted transition-micro"
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu with Slide Animation */}
      {(isMenuOpen || isClosing) && (
        <div
          className={`fixed inset-0 bg-background/80 backdrop-blur-sm z-[1050] md:hidden`}
        >
          <div
            className={`absolute top-0 left-0 right-0 bg-card border-b border-border shadow-lg ${
              isClosing ? "animate-slide-up" : "animate-slide-down"
            }`}
          >
            <div className="flex justify-between items-center px-4 py-3 border-b border-border">
              <span className="font-heading font-semibold text-lg text-foreground">
                Menu
              </span>
              <button
                onClick={handleCloseMenu}
                className="p-2 rounded-md hover:bg-muted transition-micro"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            <div className="flex flex-col p-3 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleCloseMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-micro ${
                    isActivePath(item.path)
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon name={item.icon} size={18} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto bg-accent text-accent-foreground text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                      {item.badge > 99 ? "99+" : item.badge}
                    </span>
                  )}
                </Link>
              ))}

              <div className="border-t border-border my-2" />

              {user ? (
                <button
                  onClick={() => {
                    handleLogout();
                    handleCloseMenu();
                  }}
                  className="flex items-center space-x-3 px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-micro"
                >
                  <Icon name="LogOut" size={16} />
                  <span>Log Out</span>
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={handleCloseMenu}
                    className="px-4 py-3 text-sm font-medium text-primary hover:bg-muted rounded-md"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={handleCloseMenu}
                    className="px-4 py-3 text-sm font-medium text-primary hover:bg-muted rounded-md"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
