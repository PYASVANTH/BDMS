import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../src/styles/register.css";

const Register = ({ setIsRegistering, setIsLoggedIn }) => {
  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, password } = registerFormData;

    try {
      const response = await axios.post("http://localhost:5000/api/users/register", {
        name,
        email,
        password,
      });

      if (response.data.success) {
        setIsLoggedIn(true); // Log the user in after successful registration
        navigate("/Home"); // Redirect to the home page
      } else {
        setErrorMessage(response.data.message || "Something went wrong during registration.");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1 className="register-title">Register</h1>
        <p className="register-subtitle">Create your account below</p>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={registerFormData.name}
            onChange={handleInputChange}
            required
            className="register-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={registerFormData.email}
            onChange={handleInputChange}
            required
            className="register-input"
          />
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={registerFormData.password}
              onChange={handleInputChange}
              required
              className="register-input"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          <button type="submit" className="register-btn">
            Register
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Error message display */}
        <button className="login-redirect-btn" onClick={() => setIsRegistering(false)}>
          Already have an account? Login
        </button>
      </div>
    </div>
  );
};

export default Register;
