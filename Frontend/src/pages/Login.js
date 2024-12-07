// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const text = await response.text();
      console.log("Response text:", text);

      console.log("Response status:", response.status);
      if (!response.ok) {
        throw new Error(`Login failed: ${response.status}`);
      }

      const data = text ? JSON.parse(text) : {};
      console.log("Login successful:", data);

      localStorage.setItem("token", data.token);
      console.log("Saved token:", localStorage.getItem("token"));

      navigate("/profile");
    } catch (err) {
      console.error("Ошибка авторизации:", err.message);
      setError("Ошибка авторизации, попробуйте снова.");
    }
  };

  return (
    <div className="login-container">
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      <form onSubmit={handleLogin} className="form-box">
        <div>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Введите ваш email"
            required
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Введите пароль"
            required
          />
        </div>
        <button type="submit">Войти</button>
      </form>
      <p className="form-text">
        Ещё не зарегистрированы? <a href="/register">Зарегистрироваться</a>
      </p>{" "}
      {/* Ссылка на регистрацию */}
    </div>
  );
};

export default Login;
