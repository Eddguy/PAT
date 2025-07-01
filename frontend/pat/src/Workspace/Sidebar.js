import React, { useState, useRef, useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaPencilAlt ,
  FaCog,
  FaQuestionCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showToggleButton, setShowToggleButton] = useState(true); // controls when button is visible
  const sidebarRef = useRef();

  const TRANSITION_DURATION = 180; // in ms, must match CSS

  const toggleSidebar = useCallback(() => {
  if (!isOpen) {
    setShowToggleButton(false);
    setIsOpen(true);
  } else {
    setIsOpen(false);
    setTimeout(() => {
      setShowToggleButton(true);
    }, TRANSITION_DURATION);
  }
}, [isOpen]);


  // Click outside to close
  useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      isOpen &&
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target)
    ) {
      toggleSidebar();
    }
  };

  if (isOpen) {
    document.addEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [isOpen, toggleSidebar]);


  const links = [
    { label: "Home", path: "/", icon: <FaHome /> },
    { label: "Lessons", path: "/projects", icon: <FaPencilAlt  /> },
    { label: "Settings", path: "/settings", icon: <FaCog /> },
    { label: "Help", path: "/help", icon: <FaQuestionCircle /> },
  ];

  return (
    <>
      {showToggleButton && (
        <button className="sidebar-toggle-fixed" onClick={toggleSidebar}>
          <FaBars />
        </button>
      )}

      <aside
        ref={sidebarRef}
        className={`sidebar-overlay ${isOpen ? "open" : ""}`}
      >
        <button className="sidebar-close" onClick={toggleSidebar}>
          <FaTimes />
        </button>

        <nav className="sidebar-nav">
          {links.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
              onClick={toggleSidebar}
            >
              <span className="icon">{link.icon}</span>
              <span className="label">{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
