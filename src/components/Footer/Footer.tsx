import React from "react";
import styles from "../Footer/Footer.module.css";

export const Footer = ({
  totalRows = 17,
  currentPage = 1,
  rowsPerPage = 50,
  onRowsPerPageChange,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const startRow = (currentPage - 1) * rowsPerPage + 1;
  const endRow = Math.min(currentPage * rowsPerPage, totalRows);

  return (
    <div className={styles.footer}>
      <div className={styles.rowsPerPage}>
        <span>Rows per page:</span>
        <div className={styles.select}>
          <select
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange?.(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>

      <div className={styles.pagination}>
        <span className={styles.paginationInfo}>
          {startRow}-{endRow} of {totalRows}
        </span>
        <button
          className={styles.paginationButton}
          disabled={currentPage === 1}
          onClick={() => onPageChange?.(currentPage - 1)}
        >
          ←
        </button>
        <button
          className={styles.paginationButton}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange?.(currentPage + 1)}
        >
          →
        </button>
      </div>
    </div>
  );
};
