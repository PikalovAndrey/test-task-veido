import React, { useEffect, useState } from "react";
import "bulma/css/bulma.css";
import "./Table.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faEdit,
  faTrashAlt,
  faTruck,
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { TableRow } from "../../types/TableRow";

interface TableProps {
  data: TableRow[];
  rowsPerPage: number;
  currentPage: number;
  onDeleteItem: (itemId: number) => void;
  onSaveItem: (updatedRow: TableRow) => void;
}

const Table: React.FC<TableProps> = ({
  data,
  rowsPerPage,
  currentPage,
  onDeleteItem,
  onSaveItem,
}) => {
  const [tableData, setTableData] = useState<TableRow[]>(data);
  const [editRowId, setEditRowId] = useState<number | null>(null);
  const [editRowData, setEditRowData] = useState<Partial<TableRow> | null>(
    null
  );

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const startRow = (currentPage - 1) * rowsPerPage;
  const endRow = startRow + rowsPerPage;
  const currentData = tableData.slice(startRow, endRow);

  const handleEditClick = (row: TableRow) => {
    setEditRowId(row.ID);
    setEditRowData({ ...row });
  };

  const handleSaveClick = () => {
    if (editRowData) {
      onSaveItem(editRowData as TableRow);
      setEditRowId(null);
      setEditRowData(null);
    }
  };

  const handleCancelClick = () => {
    setEditRowId(null);
    setEditRowData(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditRowData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
              {editRowId === row.ID ? (
                <>
                  <td>{row.ID}</td>
                  <td>
                    <input
                      type="text"
                      name="Order Number"
                      value={editRowData?.["Order Number"] || ""}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <div className="equipment-cell">
                      <FontAwesomeIcon icon={faTruck} />
                      <input
                        type="text"
                        name="Equipment"
                        value={editRowData?.Equipment || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="driver-cell">
                      <img
                        src={`${process.env.PUBLIC_URL}${row.img}`}
                        alt="driver-avatar"
                        className="driver-avatar"
                      />
                      <input
                        type="text"
                        name="Driver"
                        value={editRowData?.Driver || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="Type"
                      value={editRowData?.Type || ""}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="Completed Date"
                      value={editRowData?.["Completed Date"] || ""}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="Provider"
                      value={editRowData?.Provider || ""}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="Engine Hours"
                      value={editRowData?.["Engine Hours"] || ""}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="Odometer"
                      value={editRowData?.Odometer || ""}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="Last Service"
                      value={editRowData?.["Last Service"] || ""}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="Total Amount"
                      value={editRowData?.["Total Amount"] || ""}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="Solved Defects"
                      value={editRowData?.["Solved Defects"] || ""}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <FontAwesomeIcon icon={faFile} className="action-icons" />
                  </td>
                  <td>
                    <div className="action-icons">
                      <FontAwesomeIcon
                        icon={faSave}
                        style={{ marginRight: "8px", cursor: "pointer" }}
                        onClick={handleSaveClick}
                      />
                      <FontAwesomeIcon
                        icon={faTimes}
                        style={{ cursor: "pointer" }}
                        onClick={handleCancelClick}
                      />
                    </div>
                  </td>
                </>
              ) : (
                <>
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
                        style={{ marginRight: "8px", cursor: "pointer" }}
                        onClick={() => handleEditClick(row)}
                      />
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        style={{ cursor: "pointer" }}
                        onClick={() => onDeleteItem(row.ID)}
                      />
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
