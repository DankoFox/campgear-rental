import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import LoginForm from "./components/LoginForm";
import TrustPanel from "./components/TrustPanel";
import Icon from "../../components/AppIcon";

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) navigate("/equipment-catalog");
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* <Header /> */}

      {/* Main Content */}
      <main className="flex-grow flex flex-col justify-center">
        <div className="relative flex-grow bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5 overflow-hidden">
            <div className="absolute top-20 left-10 transform rotate-12">
              <Icon name="Mountain" size={1200} className="text-primary" />
            </div>
            <div className="absolute top-40 right-20 transform -rotate-12">
              <Icon name="Tent" size={800} className="text-secondary" />
            </div>
            <div className="absolute bottom-40 left-1/4 transform rotate-45">
              <Icon name="TreePine" size={1000} className="text-accent" />
            </div>
            <div className="absolute bottom-20 right-1/3 transform -rotate-6">
              <Icon name="Compass" size={600} className="text-primary" />
            </div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 container mx-auto px-4 py-12 lg:py-20 flex flex-col items-center gap-10">
            {/* Login Form */}
            <div className="w-full max-w-xl">
              <LoginForm />
            </div>

            {/* Trust Panel (optional, if exists) */}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-6 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <span className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} CampGear. Please Don't Steal
            </span>
            <div className="flex items-center space-x-6 text-sm">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-micro"
              >
                Terms of service
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-micro"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-micro"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
