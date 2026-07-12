import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Signup({ switchForm }) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://hrm-server-x3ui.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: formData.full_name,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        alert("Account created successfully!");
        switchForm();
      } else {
        alert(result.message);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <div className="auth-panel">
        <div className="auth-panel-body">
          <div className="text-center mb-4">
            <h2 className="auth-logo">
              Vibgyor
              <span>Advicorp</span>
            </h2>

            <p className="text-muted mb-0">
              Human Resource Management System
            </p>
          </div>

          <h3 className="auth-title">
            Create Account ✨
          </h3>
          
          <p className="auth-subtitle">
            Join Vibgyor Advicorp HRMS
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Full Name
              </label>

              <input
                type="text"
                className="form-control auth-input"
                style={{ transform: "translateZ(0)" }}
                placeholder="Enter your full name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Email Address
              </label>

              <input
                type="email"
                className="form-control auth-input"
                style={{ transform: "translateZ(0)" }}
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Password
              </label>

              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control auth-input"
                  style={{ transform: "translateZ(0)" }}
                  placeholder="Create a password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="auth-eye"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiEyeOff size={18} />
                  ) : (
                    <FiEye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">
                Confirm Password
              </label>

              <div className="position-relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control auth-input pe-5"
                  style={{ transform: "translateZ(0)" }}
                  placeholder="Confirm your password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="btn position-absolute top-50 end-0 translate-middle-y border-0 bg-transparent"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? (
                    <FiEyeOff size={18} />
                  ) : (
                    <FiEye size={18} />
                  )}
                </button>
              </div>
            </div>

            <button
            type="submit"
            className="auth-btn"
            disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="auth-footer">
            <span className="text-muted">
              Already have an account?{" "}
            </span>

            <button 
            type="button"
            className="btn btn-link auth-link" onClick={switchForm}>
              Login
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}