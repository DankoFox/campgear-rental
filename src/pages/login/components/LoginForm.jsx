import React, { useState } from "react";
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

  const mockCredentials = {
    email: "user@campgear.vn",
    password: "CampGear2024!",
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
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
      newErrors.email = "Vui lòng nhập địa chỉ email";
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = "Địa chỉ email không hợp lệ";
    }

    if (!formData?.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else if (formData?.password?.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Check mock credentials
      if (
        formData?.email === mockCredentials?.email &&
        formData?.password === mockCredentials?.password
      ) {
        // Simulate successful login
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: 1,
            name: "Nguyễn Văn An",
            email: formData?.email,
            avatar:
              "https://images.unsplash.com/photo-1708946697595-89931282824c",
            avatarAlt:
              "Professional headshot of Vietnamese man with short black hair in casual shirt",
          })
        );

        navigate("/equipment-catalog");
      } else {
        setErrors({
          general: `Thông tin đăng nhập không chính xác. Vui lòng thử: ${mockCredentials?.email} / ${mockCredentials?.password}`,
        });
      }
    } catch (error) {
      setErrors({
        general: "Đã xảy ra lỗi. Vui lòng thử lại sau.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Social login with ${provider}`);
    // Social login implementation would go here
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
           Welcome Back. Please Login into your account
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
            placeholder="Input your email address"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Input your password"
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
              Forgot Password?
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
            {isLoading ? "Logging In..." : "Login"}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-card text-muted-foreground">
              Or
            </span>
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
            Continue With Google
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
            No Account?{" "}
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
