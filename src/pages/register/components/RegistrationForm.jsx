import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { Checkbox } from "../../../components/ui/Checkbox";
import Select from "../../../components/ui/Select";
import Icon from "../../../components/AppIcon";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: "",
    location: "",
    marketingConsent: false,
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formProgress, setFormProgress] = useState(0);

  const userTypeOptions = [
    { value: "renter", label: "Người thuê thiết bị" },
    { value: "provider", label: "Nhà cung cấp thiết bị" },
  ];

  const locationOptions = [
    { value: "hanoi", label: "Hà Nội" },
    { value: "hochiminh", label: "Thành phố Hồ Chí Minh" },
    { value: "danang", label: "Đà Nẵng" },
    { value: "haiphong", label: "Hải Phòng" },
    { value: "cantho", label: "Cần Thơ" },
    { value: "other", label: "Tỉnh thành khác" },
  ];

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "fullName":
        if (!value?.trim()) {
          newErrors.fullName = "Vui lòng nhập họ và tên";
        } else if (value?.trim()?.length < 2) {
          newErrors.fullName = "Họ và tên phải có ít nhất 2 ký tự";
        } else {
          delete newErrors?.fullName;
        }
        break;

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          newErrors.email = "Vui lòng nhập địa chỉ email";
        } else if (!emailRegex?.test(value)) {
          newErrors.email = "Địa chỉ email không hợp lệ";
        } else {
          delete newErrors?.email;
        }
        break;

      case "phone":
        const phoneRegex = /^[0-9]{10,11}$/;
        if (!value) {
          newErrors.phone = "Vui lòng nhập số điện thoại";
        } else if (!phoneRegex?.test(value?.replace(/\s/g, ""))) {
          newErrors.phone = "Số điện thoại không hợp lệ (10-11 số)";
        } else {
          delete newErrors?.phone;
        }
        break;

      case "password":
        if (!value) {
          newErrors.password = "Vui lòng nhập mật khẩu";
        } else if (value?.length < 8) {
          newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự";
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/?.test(value)) {
          newErrors.password = "Mật khẩu phải chứa chữ hoa, chữ thường và số";
        } else {
          delete newErrors?.password;
        }
        break;

      case "confirmPassword":
        if (!value) {
          newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
        } else if (value !== formData?.password) {
          newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
        } else {
          delete newErrors?.confirmPassword;
        }
        break;

      case "userType":
        if (!value) {
          newErrors.userType = "Vui lòng chọn loại tài khoản";
        } else {
          delete newErrors?.userType;
        }
        break;

      case "location":
        if (!value) {
          newErrors.location = "Vui lòng chọn khu vực";
        } else {
          delete newErrors?.location;
        }
        break;

      case "termsAccepted":
        if (!value) {
          newErrors.termsAccepted = "Vui lòng đồng ý với điều khoản sử dụng";
        } else {
          delete newErrors?.termsAccepted;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const calculateProgress = () => {
    const requiredFields = [
      "fullName",
      "email",
      "phone",
      "password",
      "confirmPassword",
      "userType",
      "location",
    ];
    const filledFields = requiredFields?.filter(
      (field) => formData?.[field] && formData?.[field]?.trim()
    );
    const termsProgress = formData?.termsAccepted ? 1 : 0;
    return Math.round(
      ((filledFields?.length + termsProgress) / (requiredFields?.length + 1)) *
        100
    );
  };

  React.useEffect(() => {
    setFormProgress(calculateProgress());
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Validate field on change
    validateField(name, newValue);
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    // Validate all fields
    const fieldsToValidate = [
      "fullName",
      "email",
      "phone",
      "password",
      "confirmPassword",
      "userType",
      "location",
      "termsAccepted",
    ];
    let isValid = true;

    fieldsToValidate?.forEach((field) => {
      const fieldValue =
        field === "termsAccepted" ? formData?.[field] : formData?.[field];
      if (!validateField(field, fieldValue)) {
        isValid = false;
      }
    });

    if (!isValid) {
      return;
    }

    setIsLoading(true);

    try {
      // Mock registration API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock successful registration
      console.log("Registration successful:", formData);

      // Navigate to email verification or login
      navigate("/login", {
        state: {
          message:
            "Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.",
          email: formData?.email,
        },
      });
    } catch (error) {
      setErrors({ submit: "Đã xảy ra lỗi. Vui lòng thử lại sau." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
          Tạo tài khoản
        </h1>
        <p className="text-muted-foreground">
          Tham gia cộng đồng cắm trại CampGear
        </p>
      </div>
      {/* Progress Indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            Tiến độ hoàn thành
          </span>
          <span className="text-sm text-muted-foreground">{formProgress}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${formProgress}%` }}
          />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Thông tin cá nhân
          </h3>

          <Input
            label="Họ và tên"
            type="text"
            name="fullName"
            placeholder="Nhập họ và tên đầy đủ"
            value={formData?.fullName}
            onChange={handleInputChange}
            error={errors?.fullName}
            required
          />

          <Input
            label="Địa chỉ email"
            type="email"
            name="email"
            placeholder="example@email.com"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
          />

          <Input
            label="Số điện thoại"
            type="tel"
            name="phone"
            placeholder="0123 456 789"
            value={formData?.phone}
            onChange={handleInputChange}
            error={errors?.phone}
            required
          />
        </div>

        {/* Account Credentials */}
        <div className="space-y-4">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Thông tin tài khoản
          </h3>

          <Input
            label="Mật khẩu"
            type="password"
            name="password"
            placeholder="Nhập mật khẩu"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            description="Tối thiểu 8 ký tự, bao gồm chữ hoa, chữ thường và số"
            required
          />

          <Input
            label="Xác nhận mật khẩu"
            type="password"
            name="confirmPassword"
            placeholder="Nhập lại mật khẩu"
            value={formData?.confirmPassword}
            onChange={handleInputChange}
            error={errors?.confirmPassword}
            required
          />
        </div>

        {/* User Type and Location */}
        <div className="space-y-4">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Thông tin bổ sung
          </h3>

          <Select
            label="Loại tài khoản"
            placeholder="Chọn loại tài khoản"
            options={userTypeOptions}
            value={formData?.userType}
            onChange={(value) => handleSelectChange("userType", value)}
            error={errors?.userType}
            required
          />

          <Select
            label="Khu vực"
            placeholder="Chọn khu vực của bạn"
            options={locationOptions}
            value={formData?.location}
            onChange={(value) => handleSelectChange("location", value)}
            error={errors?.location}
            description="Giúp chúng tôi gợi ý thiết bị phù hợp trong khu vực"
            required
          />
        </div>

        {/* Consent and Terms */}
        <div className="space-y-4">
          <Checkbox
            label="Tôi muốn nhận thông tin khuyến mãi và tin tức từ CampGear"
            name="marketingConsent"
            checked={formData?.marketingConsent}
            onChange={handleInputChange}
          />

          <Checkbox
            label={
              <span>
                Tôi đồng ý với{" "}
                <Link to="/terms" className="text-primary hover:underline">
                  Điều khoản sử dụng
                </Link>{" "}
                và{" "}
                <Link to="/privacy" className="text-primary hover:underline">
                  Chính sách bảo mật
                </Link>
              </span>
            }
            name="termsAccepted"
            checked={formData?.termsAccepted}
            onChange={handleInputChange}
            error={errors?.termsAccepted}
            required
          />
        </div>

        {errors?.submit && (
          <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error" />
              <span className="text-sm text-error">{errors?.submit}</span>
            </div>
          </div>
        )}

        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          disabled={formProgress < 100}
        >
          Tạo tài khoản
        </Button>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Đã có tài khoản?{" "}
            <Link
              to="/login"
              className="text-primary hover:underline font-medium"
            >
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
