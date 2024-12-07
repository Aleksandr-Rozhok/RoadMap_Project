import { useEffect, useState } from "react";

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
      <h1>Welcome, {profile.username}</h1>
      <p>Email: {profile.email}</p>
      <h2>Progress</h2>
      <p>Level: {profile.progress.level}</p>
      <p>Experience: {profile.progress.experience}</p>
    </div>
  );
};

export default Profile;
