import React, { useEffect, useState } from "react";
import "bulma/css/bulma.css";
import "./Table.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faEdit,
  faTrashAlt,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { TableRow } from "../../types/TableRow";
interface TableProps {
  data: TableRow[];
  rowsPerPage: number;
  currentPage: number;
  onDeleteItem: (itemId: number) => void;
}
const Table: React.FC<TableProps> = ({
  data,
  rowsPerPage,
  currentPage,
  onDeleteItem,
}) => {
  const [tableData, setTableData] = useState<TableRow[]>(data);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const startRow = (currentPage - 1) * rowsPerPage;
  const endRow = startRow + rowsPerPage;
  const currentData = tableData.slice(startRow, endRow);

  return (
    <div className="table-container">
      <table className="table-small">
        <thead>
          <tr>
            <th>ID</th>
            <th>Order Number</th>
            <th>Equipment</th>
            <th>Driver</th>
            <th>Type</th>
            <th>Completed Date</th>
            <th>Provider</th>
            <th>Engine Hours</th>
            <th>Odometer</th>
            <th>Last Service</th>
            <th>Total Amount</th>
            <th>Solved Defects</th>
            <th>Files</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row) => (
            <tr key={row.ID}>
              <td>{row.ID}</td>
              <td>{row["Order Number"]}</td>
              <td>
                <div className="equipment-cell">
                  <FontAwesomeIcon icon={faTruck} />
                  {row.Equipment}
                </div>
              </td>
              <td>
                <div className="driver-cell">
                  <img
                    src={`${process.env.PUBLIC_URL}${row.img}`}
                    alt="driver-avatar"
                    className="driver-avatar"
                  />
                  {row.Driver}
                </div>
              </td>
              <td>
                <span className={`type-badge ${row.Type.toLowerCase()}`}>
                  {row.Type}
                </span>
              </td>
              <td>{row["Completed Date"]}</td>
              <td>{row.Provider}</td>
              <td>{row["Engine Hours"]}</td>
              <td>{row.Odometer}</td>
              <td>{row["Last Service"]}</td>
              <td>{row["Total Amount"]}</td>
              <td>{row["Solved Defects"]}</td>
              <td>
                <FontAwesomeIcon icon={faFile} className="action-icons" />
              </td>
              <td>
                <div className="action-icons">
                  <FontAwesomeIcon
                    icon={faEdit}
                    style={{ marginRight: "8px" }}
                  />
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    style={{ cursor: "pointer" }}
                    onClick={() => onDeleteItem(row.ID)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
