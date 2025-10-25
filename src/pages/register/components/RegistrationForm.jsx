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
          newErrors.termsAccepted = "Please Agree with the Terms of Use";
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
          Register Your Account
        </h1>
        
      </div>
      {/* Progress Indicator */}
   
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
        

          <Input
            label="Your Full Name"
            type="text"
            name="fullName"
            placeholder="Diddy?"
            value={formData?.fullName}
            onChange={handleInputChange}
            error={errors?.fullName}
            required
          />

          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="Diddywillskibidyyou@email.com"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
          />

         
        </div>

        {/* Account Credentials */}
        <div className="space-y-4">
          <h3 className="text-lg font-heading font-semibold text-foreground">
             Account Information
          </h3>

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="WeKnowDiddy'sHere"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            description="At least 8 characters, including Characters and numbers."
            required
          />

          <Input
            label="Confirm your password"
            type="password"
            name="confirmPassword"
            placeholder="You know what to do"
            value={formData?.confirmPassword}
            onChange={handleInputChange}
            error={errors?.confirmPassword}
            required
          />
        </div>

        {/* User Type and Location */}
        <div className="space-y-4">
          

          <Select
            label="Role"
            placeholder="Why are you here?"
            options={userTypeOptions}
            value={formData?.userType}
            onChange={(value) => handleSelectChange("userType", value)}
            error={errors?.userType}
            required
          />

          
        </div>

        {/* Consent and Terms */}
        <div className="space-y-4">
         

          <Checkbox
            label={
              <span>
                I Agree With{" "}
                <Link to="/terms" className="text-primary hover:underline">
                  Terms of Use
                </Link>{" "}
                và{" "}
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
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
          Give me my Account
        </Button>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            You got your password?{" "}
            <Link
              to="/login"
              className="text-primary hover:underline font-medium"
            >
              Go to Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
