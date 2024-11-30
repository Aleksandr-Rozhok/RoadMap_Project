// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Для работы с API запросами

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
      const response = await axios.post("/api/auth/login", formData); // Отправка данных на сервер
      // Если вход успешный, сохраняем токен и редиректим пользователя
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard"); // Перенаправление на страницу с прогрессом (или dashboard)
    } catch (err) {
      setError("Неверные email или пароль.");
    }
  };

  return (
    <div>
      <h2>Вход</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Если ошибка, выводим сообщение */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
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
          <label htmlFor="password">Пароль:</label>
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
      <p>
        Ещё не зарегистрированы? <a href="/register">Зарегистрироваться</a>
      </p>{" "}
      {/* Ссылка на регистрацию */}
    </div>
  );
};

export default Login;
