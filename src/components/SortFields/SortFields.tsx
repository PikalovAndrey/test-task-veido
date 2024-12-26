import React, { FC } from "react";
import styles from "../SortFields/SortFields.module.css";
import { TableRow } from "../../types/TableRow";

interface SortFieldsProps {
  onDateRangeChange: (start: string, end: string) => void;
  onProviderChange: (provider: string) => void;
  onDriverChange: (driver: string) => void;
  onTruckChange: (truck: string) => void;
  onTrailerChange: (trailer: string) => void;
  onTypeChange: (type: string) => void;
  filters: {
    search: string;
    dateRange: { start: string; end: string };
    provider: string;
    truck: string;
    trailer: string;
    driver: string;
    type: string;
  };
  tableInfo: TableRow[];
}

export const SortFields: FC<SortFieldsProps> = ({
  onDateRangeChange,
  onProviderChange,
  onDriverChange,
  onTruckChange,
  onTrailerChange,
  onTypeChange,
  filters,
  tableInfo,
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
            {Array.from(new Set(tableInfo.map((row) => row.Provider)))
              .sort()
              .map((provider) => (
                <option key={provider} value={provider}>
                  {provider}
                </option>
              ))}
          </select>
        </div>

        <div className={styles.select}>
          <select
            value={filters.truck}
            onChange={(e) => onTruckChange(e.target.value)}
          >
            <option value="all">Truck</option>
            {Array.from(new Set(tableInfo.map((row) => row.Equipment)))
              .sort()
              .map((truck) => (
                <option key={truck} value={truck}>
                  {truck}
                </option>
              ))}
          </select>
        </div>

        <div className={styles.select}>
          <select
            value={filters.trailer}
            onChange={(e) => onTrailerChange(e.target.value)}
          >
            <option value="all">Trailer</option>
            {Array.from(new Set(tableInfo.map((row) => row.Equipment)))
              .sort()
              .map((trailer) => (
                <option key={trailer} value={trailer}>
                  {trailer}
                </option>
              ))}
          </select>
        </div>

        <div className={styles.select}>
          <select
            value={filters.driver}
            onChange={(e) => onDriverChange(e.target.value)}
          >
            <option value="all">Driver</option>
            {Array.from(new Set(tableInfo.map((row) => row.Driver)))
              .sort()
              .map((driver) => (
                <option key={driver} value={driver}>
                  {driver}
                </option>
              ))}
          </select>
        </div>

        <div className={styles.select}>
          <select
            value={filters.type}
            onChange={(e) => onTypeChange(e.target.value)}
          >
            <option value="latest">Latest</option>{" "}
            <option value="oldest">Oldest</option>{" "}
          </select>{" "}
        </div>
      </div>
    </div>
  );
};
