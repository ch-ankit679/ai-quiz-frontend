import React from "react";
import "../styles/ThemeToggle.css";

export default function ThemeToggle({ theme, toggleTheme }) {
  return (
    <div className="theme-toggle">
      <button onClick={toggleTheme}>
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
    </div>
  );
}
