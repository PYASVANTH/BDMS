import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../src/styles/login.css";
import axios from "axios";

const Login = ({ setIsRegistering, setIsLoggedIn }) => {
  const [loginFormData, setLoginFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = loginFormData;

    try {
      const response = await axios.post("https://bdms-igj8.onrender.com/api/users/login", {
        email,
        password,
      });

      if (response.data.success) {
        navigate("/Home"); // Navigate to the Home page on successful login
        setIsLoggedIn(true);
      } else {
        setErrorMessage(response.data.message || "Something went wrong");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  const navigateToRegister = () => {
    setIsRegistering(true); 
    navigate("/register"); 
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={loginFormData.email}
          onChange={handleInputChange}
          required
        />
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={loginFormData.password}
            onChange={handleInputChange}
            required
          />
          <button
            type="button"
            className="show-password-btn"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <button type="submit" className="login-btn">Login</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>} 
      <button className="register-btn" onClick={navigateToRegister}>
        Don't have an account? Register
      </button>
    </div>
  );
};

export default Login;
