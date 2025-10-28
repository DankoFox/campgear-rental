// @ts-nocheck
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
    location: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formProgress, setFormProgress] = useState(0);

  const locationOptions = [
    { value: "hanoi", label: "Hanoi" },
    { value: "hochiminh", label: "Ho Chi Minh City" },
    { value: "danang", label: "Da Nang" },
    { value: "haiphong", label: "Hai Phong" },
    { value: "cantho", label: "Can Tho" },
    { value: "other", label: "Other Province/City" },
  ];

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "fullName":
        if (!value?.trim()) {
          newErrors.fullName = "Please enter your full name";
        } else if (value?.trim()?.length < 2) {
          newErrors.fullName = "Full name must be at least 2 characters";
        } else {
          delete newErrors.fullName;
        }
        break;

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          newErrors.email = "Please enter your email address";
        } else if (!emailRegex.test(value)) {
          newErrors.email = "Please enter a valid email address";
        } else {
          delete newErrors.email;
        }
        break;

      case "phone":
        const phoneRegex = /^[0-9]{10,11}$/;
        if (!value) {
          newErrors.phone = "Please enter your phone number";
        } else if (!phoneRegex.test(value?.replace(/\s/g, ""))) {
          newErrors.phone = "Phone number must be 10-11 digits";
        } else {
          delete newErrors.phone;
        }
        break;

      case "password":
        if (!value) {
          newErrors.password = "Please enter a password";
        } else if (value.length < 8) {
          newErrors.password = "Password must be at least 8 characters";
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          newErrors.password =
            "Password must include uppercase, lowercase, and a number";
        } else {
          delete newErrors.password;
        }
        break;

      case "confirmPassword":
        if (!value) {
          newErrors.confirmPassword = "Please confirm your password";
        } else if (value !== formData.password) {
          newErrors.confirmPassword = "Passwords do not match";
        } else {
          delete newErrors.confirmPassword;
        }
        break;

      case "location":
        if (!value) {
          newErrors.location = "Please select your location";
        } else {
          delete newErrors.location;
        }
        break;

      case "termsAccepted":
        if (!value) {
          newErrors.termsAccepted = "You must agree to the Terms of Use";
        } else {
          delete newErrors.termsAccepted;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateProgress = () => {
    const requiredFields = [
      "fullName",
      "email",
      "phone",
      "password",
      "confirmPassword",
      "location",
    ];
    const filledFields = requiredFields.filter(
      (field) => formData[field] && formData[field].trim()
    );
    const termsProgress = formData.termsAccepted ? 1 : 0;
    return Math.round(
      ((filledFields.length + termsProgress) / (requiredFields.length + 1)) *
        100
    );
  };

  useEffect(() => {
    setFormProgress(calculateProgress());
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

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
    e.preventDefault();

    const fieldsToValidate = [
      "fullName",
      "email",
      "phone",
      "password",
      "confirmPassword",
      "location",
      "termsAccepted",
    ];
    let isValid = true;

    fieldsToValidate.forEach((field) => {
      const fieldValue = formData[field];
      if (!validateField(field, fieldValue)) {
        isValid = false;
      }
    });

    if (!isValid) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate("/login", {
        state: {
          message:
            "Registration successful! Please check your email to verify your account.",
          email: formData.email,
        },
      });
    } catch {
      setErrors({ submit: "Something went wrong. Please try again later." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
          Create Your Account
        </h1>
        <p className="text-sm text-muted-foreground">
          Fill in the details below to get started
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            name="fullName"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={handleInputChange}
            error={errors.fullName}
            required
          />

          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            required
          />

          <Input
            label="Phone Number"
            type="text"
            name="phone"
            placeholder="0123456789"
            value={formData.phone}
            onChange={handleInputChange}
            error={errors.phone}
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
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            description="At least 8 characters, including uppercase, lowercase, and a number."
            required
          />

          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="Re-enter your password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={errors.confirmPassword}
            required
          />
        </div>

        {/* User Type and Location */}
        <div className="space-y-4">
          <Select
            label="Location"
            placeholder="Select your location"
            options={locationOptions}
            value={formData.location}
            onChange={(value) => handleSelectChange("location", value)}
            error={errors.location}
            required
          />
        </div>

        {/* Consent and Terms */}
        <div className="space-y-4">
          <Checkbox
            label={
              <span>
                I agree to the{" "}
                <Link to="/terms" className="text-primary hover:underline">
                  Terms of Use
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </span>
            }
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleInputChange}
            error={errors.termsAccepted}
            required
          />
        </div>

        {errors.submit && (
          <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error" />
              <span className="text-sm text-error">{errors.submit}</span>
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
          Create My Account
        </Button>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary hover:underline font-medium"
            >
              Log in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
