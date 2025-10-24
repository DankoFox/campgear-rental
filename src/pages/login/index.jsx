import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import LoginForm from "./components/LoginForm";
import TrustPanel from "./components/TrustPanel";
import Icon from "../../components/AppIcon";

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/equipment-catalog");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Background */}
        <div className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 min-h-screen">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 transform rotate-12">
              <Icon name="Mountain" size={120} className="text-primary" />
            </div>
            <div className="absolute top-40 right-20 transform -rotate-12">
              <Icon name="Tent" size={80} className="text-secondary" />
            </div>
            <div className="absolute bottom-40 left-1/4 transform rotate-45">
              <Icon name="TreePine" size={100} className="text-accent" />
            </div>
            <div className="absolute bottom-20 right-1/3 transform -rotate-6">
              <Icon name="Compass" size={60} className="text-primary" />
            </div>
          </div>

          {/* Content Container */}
          <div className="relative z-10 container mx-auto px-4 py-12 lg:py-20">
            <div className="flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-12 max-w-6xl mx-auto">
              {/* Login Form Section */}
              <div className="w-full lg:w-auto flex-shrink-0">
                <LoginForm />
              </div>

              {/* Trust Panel Section */}
              <div className="w-full lg:w-auto">
                <TrustPanel />

                {/* Mobile Trust Summary */}
                <div className="lg:hidden mt-8 bg-card rounded-lg shadow-card p-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-6 mb-4">
                      <div className="flex items-center space-x-2">
                        <Icon
                          name="Shield"
                          size={20}
                          className="text-primary"
                        />
                        <span className="text-sm font-medium text-foreground">
                          Bảo mật
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon
                          name="CheckCircle"
                          size={20}
                          className="text-success"
                        />
                        <span className="text-sm font-medium text-foreground">
                          Đã xác minh
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon
                          name="Headphones"
                          size={20}
                          className="text-accent"
                        />
                        <span className="text-sm font-medium text-foreground">
                          Hỗ trợ 24/7
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Nền tảng cho thuê thiết bị cắm trại uy tín hàng đầu Việt
                      Nam
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center space-x-2 bg-card/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-card">
                <Icon name="Users" size={16} className="text-primary" />
                <span className="text-sm text-muted-foreground">
                  Hơn{" "}
                  <span className="font-semibold text-foreground">50,000+</span>{" "}
                  khách hàng tin tưởng
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>
                &copy; {new Date()?.getFullYear()} CampGear. Tất cả quyền được
                bảo lưu.
              </span>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-micro"
              >
                Điều khoản sử dụng
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-micro"
              >
                Chính sách bảo mật
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-micro"
              >
                Liên hệ
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
