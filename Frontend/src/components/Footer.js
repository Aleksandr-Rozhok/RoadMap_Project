import React from "react";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} XPQuest. All rights reserved.</p>
        <ul className="footer-links">
          <li>
            <a
              href="https://github.com/yourproject"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://discord.gg/yourproject"
              target="_blank"
              rel="noopener noreferrer"
            >
              Discord
            </a>
          </li>
          <li>
            <a href="mailto:support@xpquest.com">Contact Us</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
