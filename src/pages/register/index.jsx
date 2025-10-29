import React from "react";
import { Helmet } from "react-helmet";
import RegistrationForm from "./components/RegistrationForm";
import TrustPanel from "./components/TrustPanel";
import Image from "../../components/AppImage";

const RegisterPage = () => {
  return (
    <>
      <Helmet>
        <title>Đăng ký tài khoản - CampGear</title>

        <meta
          name="keywords"
          content="đăng ký, tài khoản, cắm trại, thiết bị, CampGear, Việt Nam"
        />
      </Helmet>

      <div className="flex flex-col min-h-screen bg-background">
        {/* Header */}
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
        <main className="relative z-10 flex-grow flex items-center justify-center px-50 py-12">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-6xl mx-auto">
              {/* Registration Form */}
              <div className="w-2/4 bg-card/95 backdrop-blur-sm rounded-2xl shadow-modal p-12 border-4 border-border/80 mx-auto">
                <RegistrationForm />
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="relative z-10 bg-card/95 backdrop-blur-sm border-t border-border/50 mt-auto">
          <div className="container mx-auto px-4 py-6">
            <div className="text-center text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} CampGear. Please Don't Steal</p>
              <div className="flex items-center justify-center space-x-4 mt-2">
                <a
                  href="/terms"
                  className="hover:text-primary transition-micro"
                >
                  Terms of Use
                </a>
                <span>•</span>
                <a
                  href="/privacy"
                  className="hover:text-primary transition-micro"
                >
                  Privacy Policy
                </a>
                <span>•</span>
                <a
                  href="/support"
                  className="hover:text-primary transition-micro"
                >
                  Support
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
