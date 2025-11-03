import React, { useState } from "react";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [status, setStatus] = useState({ message: "", error: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ message: "Submitting...", error: false });

    try {
      const response = await fetch("http://localhost:5050/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        setStatus({ message: result.message || "Registration failed.", error: true });
      } else {
        setStatus({ message: "Account created successfully!", error: false });
        setFormData({ username: "", email: "", password: "" });
      }
    } catch (error) {
      setStatus({ message: "Network error, please try again.", error: true });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >
      <h2 className="text-2xl font-semibold text-center mb-4">Create an Account</h2>

      <label className="flex flex-col">
        <span className="text-sm mb-1">Username</span>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          className="border rounded-md p-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </label>

      <label className="flex flex-col">
        <span className="text-sm mb-1">Email</span>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border rounded-md p-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </label>

      <label className="flex flex-col">
        <span className="text-sm mb-1">Password</span>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="border rounded-md p-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </label>

      <button
        type="submit"
        className="mt-4 bg-primary text-white py-2 rounded-md hover:bg-primary/80 transition-all"
      >
        Register
      </button>

      {status.message && (
        <p
          className={`text-center mt-3 ${
            status.error ? "text-red-500" : "text-green-600"
          }`}
        >
          {status.message}
        </p>
      )}
    </form>
  );
};

export default RegistrationForm;
