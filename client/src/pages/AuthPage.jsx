import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container">

      {/* Animated Background */}
      <div className="auth-background">
        <div className="blob blob1"></div>
        <div className="blob blob2"></div>
        <div className="blob blob3"></div>
      </div>

      <div className="auth-wrapper">

        {/* Left Side */}
        <div className="auth-left">

          <h1>
            Vibgyor Advicorp
          </h1>

          <h2>
            Human Resource Management System
          </h2>

          <p>
            Manage employees, departments, payroll, attendance,
            leave requests and reports through one modern dashboard.
          </p>

          <div className="auth-features">

            <div className="feature-card">
              👨‍💼 Employee Management
            </div>

            <div className="feature-card">
              📅 Attendance Tracking
            </div>

            <div className="feature-card">
              💰 Payroll System
            </div>

            <div className="feature-card">
              📊 Reports & Analytics
            </div>

          </div>

        </div>

        {/* Right Side */}

        <div className="auth-right">

          <div className={`auth-card ${isLogin ? "" : "flip"}`}>

            <div className="auth-face auth-front">
              <Login switchForm={() => setIsLogin(false)} />
            </div>

            <div className="auth-face auth-back">
              <Signup switchForm={() => setIsLogin(true)} />
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}