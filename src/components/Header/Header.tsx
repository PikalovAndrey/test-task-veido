import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import header_logo from "../../assets/header_logo.png";

export const Header = () => {
  return (
    <div className="header">
      <div className="left-section">
        <div className="logo-container">
          <img src={header_logo} alt="Logo" className="logo" />
          <span className="logo-text">Service Logs</span>
        </div>

        <div className="search-container">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input type="text" placeholder="Search" className="search-input" />
        </div>
      </div>

      <div className="center-section">
        <button className="all-button">ALL</button>

        <div className="status-pill planned">
          <div className="status-dot"></div>
          <span>PLANNED</span>
          <span>14</span>
        </div>

        <div className="status-pill unplanned">
          <div className="status-dot"></div>
          <span>UNPLANNED</span>
          <span>2</span>
        </div>

        <div className="status-pill emergency">
          <div className="status-dot"></div>
          <span>EMERGENCY</span>
          <span>1</span>
        </div>
      </div>

      <div className="right-section">
        <div className="user-info">
          <img src="/path-to-avatar.png" alt="User avatar" className="avatar" />
          <span className="user-initials">VS</span>
          <span className="user-time">1:30</span>
        </div>

        <button className="add-button">
          <span className="plus-icon">+</span>
          ADD
        </button>
      </div>
    </div>
  );
};
