import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import header_logo from "../../assets/header_logo.png";
import { TableRow } from "../../types/TableRow";

interface HeaderProps {
  tableInfo: TableRow[];
  onSearch: (searchTerm: string) => void;
  onTypeChange: (type: string) => void;
  selectedType: string;
}

export const Header: React.FC<HeaderProps> = ({
  tableInfo,
  onSearch,
  onTypeChange,
  selectedType,
}) => {
  const plannedCount = tableInfo.filter((row) => row.Type === "Planned").length;
  const unplannedCount = tableInfo.filter(
    (row) => row.Type === "Unplanned"
  ).length;
  const emergencyCount = tableInfo.filter(
    (row) => row.Type === "Emergency"
  ).length;

  return (
    <div className="header">
      <div className="left-section">
        <div className="logo-container">
          <img src={header_logo} alt="Logo" className="logo" />
          <span className="logo-text">Service Logs</span>
        </div>

        <div className="search-container">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search"
            className="search-input"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="center-section">
        <button
          className={`filter-button ${
            selectedType === "ALL" ? "selected" : ""
          }`}
          onClick={() => onTypeChange("ALL")}
        >
          ALL
        </button>
        <button
          className={`filter-button ${
            selectedType === "PLANNED" ? "selected" : ""
          }`}
          onClick={() => onTypeChange("PLANNED")}
        >
          <span className="status-dot planned-dot">{plannedCount}</span>
          PLANNED
        </button>
        <button
          className={`filter-button ${
            selectedType === "UNPLANNED" ? "selected" : ""
          }`}
          onClick={() => onTypeChange("UNPLANNED")}
        >
          <span className="status-dot unplanned-dot">{unplannedCount}</span>
          UNPLANNED
        </button>
        <button
          className={`filter-button ${
            selectedType === "EMERGENCY" ? "selected" : ""
          }`}
          onClick={() => onTypeChange("EMERGENCY")}
        >
          <span className="status-dot emergency-dot">{emergencyCount}</span>
          EMERGENCY
        </button>
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
