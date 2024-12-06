import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import "../styles/register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      await axios.post("http://localhost:8080/api/register", formData);
      navigate("http://localhost:8080/api/profile");
    } catch (err) {
      setError("Ошибка регистрации, попробуйте снова.");
    }
  };

  return (
    <div className="register-container">
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Сообщение об ошибке */}
      <form onSubmit={handleSubmit} className="form-box">
        <div>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Введите ваше имя"
            required
          />
        </div>
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
        <button type="submit">Зарегистрироваться</button>
      </form>
      <p className="form-text">
        Уже зарегистрированы? <Link to="/">Войти</Link>
      </p>
    </div>
  );
};

export default Register;
