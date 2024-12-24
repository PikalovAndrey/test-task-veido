import React from "react";
import styles from "../SortFields/SortFields.module.css";

export const SortFields = () => {
  return (
    <div className={styles.container}>
      <div className={styles.filterRow}>
        {/* Date Range */}
        <div className={styles.dateRange}>
          <div className={styles.dateInput}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <input type="date" placeholder="Start Date" />
          </div>
          <div className={styles.dateInput}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <input type="date" placeholder="End Date" />
          </div>
        </div>

        {/* Provider Filter */}
        <div className={styles.select}>
          <select defaultValue="all">
            <option value="all">Provider</option>
            <option value="provider1">Provider 1</option>
            <option value="provider2">Provider 2</option>
          </select>
        </div>

        {/* Truck Filter */}
        <div className={styles.select}>
          <select defaultValue="all">
            <option value="all">Truck</option>
            <option value="truck1">Truck 1</option>
            <option value="truck2">Truck 2</option>
          </select>
        </div>

        {/* Trailer Filter */}
        <div className={styles.select}>
          <select defaultValue="all">
            <option value="all">Trailer</option>
            <option value="trailer1">Trailer 1</option>
            <option value="trailer2">Trailer 2</option>
          </select>
        </div>

        {/* Driver Filter */}
        <div className={styles.select}>
          <select defaultValue="all">
            <option value="all">Driver</option>
            <option value="driver1">Driver 1</option>
            <option value="driver2">Driver 2</option>
          </select>
        </div>

        {/* Sort By */}
        <div className={styles.select}>
          <select defaultValue="latest">
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
    </div>
  );
};
