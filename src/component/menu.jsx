import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Menu.css";

const Menu = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Handle scroll event to collapse the menu
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle menu collapse/expand
  const toggleMenu = () => {
    setIsCollapsed(!isCollapsed);
    if (isCollapsed) {
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top when expanding
    }
  };

  return (
    <div className={`menu-bar ${isCollapsed ? "collapsed" : ""}`}>
      {/* Menu Buttons */}
      <div className={`menu-buttons ${isCollapsed ? "hidden" : ""}`}>
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/cv")}>CV</button>
        <button onClick={() => navigate("/projects")}>Projects</button>
        <button onClick={() => navigate("/about")}>About</button>
        <button onClick={() => navigate("/contact")}>Contact</button>
        <button onClick={() => navigate("/makememoney")}>Make Me Money</button>
      </div>

      {/* Collapsed Menu Icon */}
      {isCollapsed && (
        <div className="collapsed-menu-icon" onClick={toggleMenu}>
          <div className="menu-line"></div>
          <div className="menu-line"></div>
          <div className="menu-line"></div>
          <span className="menu-text">Menu</span>
        </div>
      )}
    </div>
  );
};

export default Menu;
