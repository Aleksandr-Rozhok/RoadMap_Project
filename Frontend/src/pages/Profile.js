import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/profile");
        setUserData(response.data);
      } catch (err) {
        setError("Ошибка загрузки данных");
        console.error(err);
      }
    };
    fetchUserData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="profile-container">
      <h1>Профиль пользователя</h1>
      <p>Имя: {userData.username}</p>
      <p>Email: {userData.email}</p>
      <p>Уровень: {userData.level}</p>
      <p>Опыт: {userData.experience}</p>
      <p>
        Дата регистрации: {new Date(userData.createdAt).toLocaleDateString()}
      </p>

      {/* Форма для редактирования никнейма */}
      <form>
        <label htmlFor="username">Изменить никнейм:</label>
        <input
          type="text"
          id="username"
          value={userData.username}
          onChange={(e) =>
            setUserData({ ...userData, username: e.target.value })
          }
        />
        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
};

export default Profile;
