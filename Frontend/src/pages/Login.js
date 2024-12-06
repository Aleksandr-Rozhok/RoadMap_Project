// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Хук для навигации

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/login", formData);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Неверные email или пароль.");
    }
  };

  return (
    <div className="login-container">
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      <form onSubmit={handleSubmit} className="form-box">
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
