import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import AuthContext from "../context/AuthContext";

export default function Login({ switchForm }) {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    try {
      const response = await fetch(
        "https://hrm-server-x3ui.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (result.success) {
        login(result.user, result.token);

        alert("Login Successful!");

        // Redirect to Dashboard
        navigate("/dashboard");
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
            Welcome Back 👋
          </h3>
          <p className="auth-subtitle">
            Login to continue to your HR Dashboard
          </p>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Email Address
              </label>

              <input
                type="email"
                className="form-control auth-input"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">
                Password
              </label>

              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control auth-input pe-5"
                  placeholder="Enter your password"
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
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            <button 
            type="submit" 
            className="auth-btn" 
            disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <div className="auth-footer">
            <span className="text-muted">
              Don't have an account?{" "}
            </span>

            <button
            type="button"
            className="btn btn-link auth-link" onClick={switchForm}>
              Create Account
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}