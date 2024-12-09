import React from "react";
import "../styles/profileInfo.css";

const ProfileInfo = ({ profile }) => {
  const progressPercentage = (profile.progress.experience / 100) * 100;

  return (
    <div className="profile-info">
      <h1 className="profile-username">Welcome, {profile.username}!</h1>
      <p className="profile-email">Email: {profile.email}</p>

      <div className="level-container">
        <p>Level: {profile.progress.level}</p>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p>{profile.progress.experience} / 100 XP</p>
      </div>

      <div className="achievements-container">
        <h3>Achievements</h3>
        <div className="achievement-icons">
          <img
            src="/images/achievements-icon-1.jpeg"
            alt="Achievement 1"
            title="First Quest Completed"
          />
          <img
            src="/images/achievements-icon-2.jpeg"
            alt="Achievement 2"
            title="Reached Level 5"
          />
          <img
            src="/images/achievements-icon-3.jpeg"
            alt="Achievement 3"
            title="Master Explorer"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
