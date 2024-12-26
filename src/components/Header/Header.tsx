import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import header_logo from "../../assets/header_logo.jpg";
import { TableRow } from "../../types/TableRow";

interface HeaderProps {
  tableInfo: TableRow[];
  onSearch: (searchTerm: string) => void;
  onTypeChange: (type: string) => void;
  selectedType: string;
  onAddClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  tableInfo,
  onSearch,
  onTypeChange,
  selectedType,
  onAddClick,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const plannedCount = tableInfo.filter((row) => row.Type === "Planned").length;

  const unplannedCount = tableInfo.filter(
    (row) => row.Type === "Unplanned"
  ).length;

  const emergencyCount = tableInfo.filter(
    (row) => row.Type === "Emergency"
  ).length;

  const avatarsUrl = Array.from(new Set(tableInfo.map((item) => item.img))).map(
    (item) => `${process.env.PUBLIC_URL}${item}`
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

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
            value={searchTerm}
            onChange={handleSearchChange}
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
            selectedType === "Planned" ? "selected" : ""
          }`}
          onClick={() => onTypeChange("Planned")}
        >
          <span className="status-dot planned-dot">{plannedCount}</span>
          PLANNED
        </button>
        <button
          className={`filter-button ${
            selectedType === "Unplanned" ? "selected" : ""
          }`}
          onClick={() => onTypeChange("Unplanned")}
        >
          <span className="status-dot unplanned-dot">{unplannedCount}</span>
          UNPLANNED
        </button>
        <button
          className={`filter-button ${
            selectedType === "Emergency" ? "selected" : ""
          }`}
          onClick={() => onTypeChange("Emergency")}
        >
          <span className="status-dot emergency-dot">{emergencyCount}</span>
          EMERGENCY
        </button>
      </div>

      <div className="right-section">
        <div className="user-info">
          {avatarsUrl.map((avatar, index) => (
            <img
              key={index}
              src={avatar}
              alt="User avatar"
              className={`avatar avatar-${index}`}
            />
          ))}
        </div>

        <button className="add-button" onClick={onAddClick}>
          <span className="plus-icon">+</span>
          ADD
        </button>
      </div>
    </div>
  );
};
