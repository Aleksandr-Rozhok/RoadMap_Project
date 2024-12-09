import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CharacterCard from "../components/CharacterCard";
import ProfileInfo from "../components/ProfileInfo";

import "../styles/profile.css";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Token is missing");
        }

        const response = await fetch("http://localhost:8080/api/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Profile Response Status:", response.status);

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Profile fetch failed: ${errorText}`);
        }

        const data = await response.json();
        console.log("Profile data:", data);
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error.message);
        console.log("Ошибка загрузки профиля");
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <Header />
      <div className="content-container">
        <CharacterCard image="/images/character.jpeg" />
        <ProfileInfo profile={profile} />
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
