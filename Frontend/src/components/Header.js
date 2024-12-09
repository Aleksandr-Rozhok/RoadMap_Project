import { Link } from "react-router-dom";
import "../styles/header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">XPQuest</Link>
      </div>
      <nav className="nav-menu">
        <Link to="/profile">Profile</Link>
        <Link to="/roadmaps">Road Maps</Link>
        <Link to="/achievements">Achievements</Link>
        <Link to="/settings">Settings</Link>
      </nav>
      <div className="profile-menu">
        <img src="/images/logo.png" alt="Profile" className="avatar" />
        <div className="dropdown-menu">
          <Link to="/settings">Настройки</Link>
          <button>Выйти</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
