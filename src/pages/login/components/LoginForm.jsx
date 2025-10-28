// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { Checkbox } from "../../../components/ui/Checkbox";
import Icon from "../../../components/AppIcon";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) navigate("/equipment-catalog");
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors?.[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = "Please enter your email address";
    } else if (!/\S+@\S+\.\S+/.test(formData?.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData?.password) {
      newErrors.password = "Please enter your password";
    } else if (formData?.password?.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

 // ✅ Normal user login
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const user = {
        id: Date.now(),
        name: formData.email.split("@")[0] || "User",
        email: formData.email,
        role: "user",
      };

      localStorage.setItem("user", JSON.stringify(user));
      navigate("/equipment-catalog", { replace: true });
    } catch (err) {
      console.error(err);
      setErrors({
        general: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Admin login
  const handleLoginAsAdmin = () => {
    const adminUser = {
      id: 1,
      name: "Admin",
      email: "admin@example.com",
      role: "admin",
    };
    localStorage.setItem("user", JSON.stringify(adminUser));
    navigate("/admin-dashboard", { replace: true });
  };

  const handleSocialLogin = (provider) => {
    console.log(`Social login with ${provider}`);
  };
  

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card rounded-lg shadow-card p-6 lg:p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
            Login
          </h1>
          <p className="text-muted-foreground text-sm">
            Welcome back! Please log in to your account
          </p>
        </div>

        {/* Error Message */}
        {errors?.general && (
          <div className="mb-4 p-3 bg-error/10 border border-error/20 rounded-md">
            <div className="flex items-start space-x-2">
              <Icon
                name="AlertCircle"
                size={16}
                className="text-error mt-0.5 flex-shrink-0"
              />
              <p className="text-sm text-error">{errors?.general}</p>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
          />

          <div className="flex items-center justify-between">
            <Checkbox
              label="Remember me"
              name="rememberMe"
              checked={formData?.rememberMe}
              onChange={handleInputChange}
            />

            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:text-primary/80 transition-micro"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-card text-muted-foreground">Or</span>
          </div>
        </div>

        {/* Social Login */}
        <div className="space-y-3">
          <Button
            variant="outline"
            size="default"
            fullWidth
            onClick={() => handleSocialLogin("google")}
            iconName="Mail"
            iconPosition="left"
          >
            Continue with Google
          </Button>

          <Button
            variant="outline"
            size="default"
            fullWidth
            onClick={() => handleSocialLogin("facebook")}
            iconName="Facebook"
            iconPosition="left"
          >
            Continue with Facebook
          </Button>
        </div>

        {/* Register Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary hover:text-primary/80 font-medium transition-micro"
            >
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
