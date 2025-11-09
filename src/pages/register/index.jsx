// src/pages/register/index.jsx
import React from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import RegistrationForm from "./components/RegistrationForm";

const RegistrationPage = () => {
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

        {/* Background + Form */}
        <main
          className="relative flex-grow flex items-center justify-center bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('../../../public/assets/imgs/registerbackgroundimage.jpg')", // update path if needed
          }}
        >
          {/* Fade overlay */}
          <div className="absolute inset-0 bg-white/80" />

          {/* Registration card */}
          <div className="relative z-10 bg-white/95 p-8 rounded-2xl shadow-lg max-w-lg w-full border border-gray-200">
            <RegistrationForm />
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white/90 border-t border-gray-200 py-6 shadow-inner">
          <div className="container mx-auto px-4 text-center text-sm text-gray-600">
            <p>© {new Date().getFullYear()} CampGear. Please Don't Steal</p>
            <div className="flex items-center justify-center space-x-4 mt-2">
              <a href="/terms" className="hover:text-primary transition-colors">
                Terms of Use
              </a>
              <span>•</span>
              <a
                href="/privacy"
                className="hover:text-primary transition-colors"
              >
                Privacy Policy
              </a>
              <span>•</span>
              <a
                href="/support"
                className="hover:text-primary transition-colors"
              >
                Support
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default RegistrationPage;
