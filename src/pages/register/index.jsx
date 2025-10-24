import React from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import RegistrationForm from "./components/RegistrationForm";
import TrustPanel from "./components/TrustPanel";
import Image from "../../components/AppImage";

const RegisterPage = () => {
  return (
    <>
      <Helmet>
        <title>Đăng ký tài khoản - CampGear</title>
        <meta
          name="description"
          content="Tạo tài khoản CampGear để thuê thiết bị cắm trại chất lượng cao. Tham gia cộng đồng cắm trại lớn nhất Việt Nam."
        />
        <meta
          name="keywords"
          content="đăng ký, tài khoản, cắm trại, thiết bị, CampGear, Việt Nam"
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero Background */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
          <div className="absolute inset-0 opacity-10">
            <Image
              src="https://images.unsplash.com/photo-1648806626183-2308a89eb8ef"
              alt="Scenic mountain landscape with camping tents under starry night sky and pine trees"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Main Content */}
        <main className="relative z-10 pt-16">
          <div className="container mx-auto px-4 py-8 lg:py-12">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
              {/* Registration Form - Left Column */}
              <div className="order-2 lg:order-1">
                <div className="bg-card/95 backdrop-blur-sm rounded-2xl shadow-modal p-6 lg:p-8 border border-border/50">
                  <RegistrationForm />
                </div>
              </div>

              {/* Trust Panel - Right Column */}
              <div className="order-1 lg:order-2">
                <div className="bg-card/95 backdrop-blur-sm rounded-2xl shadow-modal p-6 lg:p-8 border border-border/50 lg:sticky lg:top-24">
                  <TrustPanel />
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="relative z-10 bg-card/95 backdrop-blur-sm border-t border-border/50 mt-12">
          <div className="container mx-auto px-4 py-6">
            <div className="text-center text-sm text-muted-foreground">
              <p>
                © {new Date()?.getFullYear()} CampGear. Tất cả quyền được bảo
                lưu.
              </p>
              <div className="flex items-center justify-center space-x-4 mt-2">
                <a
                  href="/terms"
                  className="hover:text-primary transition-micro"
                >
                  Điều khoản sử dụng
                </a>
                <span>•</span>
                <a
                  href="/privacy"
                  className="hover:text-primary transition-micro"
                >
                  Chính sách bảo mật
                </a>
                <span>•</span>
                <a
                  href="/support"
                  className="hover:text-primary transition-micro"
                >
                  Hỗ trợ
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default RegisterPage;
