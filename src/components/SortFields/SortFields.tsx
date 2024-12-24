import React, { FC } from "react";
import styles from "../SortFields/SortFields.module.css";

interface SortFieldsProps {
  onDateRangeChange: (start: string, end: string) => void;
  onProviderChange: (provider: string) => void;
  onDriverChange: (driver: string) => void;
  filters: {
    search: string;
    dateRange: { start: string; end: string };
    provider: string;
    truck: string;
    trailer: string;
    driver: string;
    type: string;
  };
}

export const SortFields: FC<SortFieldsProps> = ({
  onDateRangeChange,
  onProviderChange,
  onDriverChange,
  filters,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.filterRow}>
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
            <input
              type="date"
              placeholder="Start Date"
              value={filters.dateRange.start}
              onChange={(e) =>
                onDateRangeChange(e.target.value, filters.dateRange.end)
              }
            />
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
            <input
              type="date"
              placeholder="End Date"
              value={filters.dateRange.end}
              onChange={(e) =>
                onDateRangeChange(filters.dateRange.start, e.target.value)
              }
            />
          </div>
        </div>

        <div className={styles.select}>
          <select
            value={filters.provider}
            onChange={(e) => onProviderChange(e.target.value)}
          >
            <option value="all">Provider</option>
            <option value="provider1">Firecar, LLC</option>
            <option value="provider2">r-way trailer repair llc</option>
          </select>
        </div>

        {/* Truck */}
        <div className={styles.select}>
          <select
            value={filters.truck}
            onChange={(e) => {
              // Якщо потрібно, додаємо обробник для змін truck
            }}
          >
            <option value="all">Truck</option>
            <option value="truck1">Truck 1</option>
            <option value="truck2">Truck 2</option>
          </select>
        </div>

        {/* Trailer */}
        <div className={styles.select}>
          <select
            value={filters.trailer}
            onChange={(e) => {
              // Якщо потрібно, додаємо обробник для змін trailer
            }}
          >
            <option value="all">Trailer</option>
            <option value="trailer1">Trailer 1</option>
            <option value="trailer2">Trailer 2</option>
          </select>
        </div>

        {/* Driver */}
        <div className={styles.select}>
          <select
            value={filters.driver}
            onChange={(e) => onDriverChange(e.target.value)}
          >
            <option value="all">Driver</option>
            <option value="driver1">Driver 1</option>
            <option value="driver2">Driver 2</option>
          </select>
        </div>

        {/* Sort By */}
        <div className={styles.select}>
          <select
            value={filters.type}
            onChange={(e) => {
              // Якщо потрібно, додаємо обробник для змін sort
            }}
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
    </div>
  );
};
