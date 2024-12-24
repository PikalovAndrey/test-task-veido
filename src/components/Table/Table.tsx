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

interface TableRow {
  ID: number;
  "Order Number": string;
  Equipment: string;
  Driver: string;
  Type: string;
  "Completed Date": string;
  Provider: string;
  "Engine Hours": number;
  Odometer: string;
  "Last Service": string;
  "Total Amount": string;
  "Solved Defects": string;
  Files: string;
}

const Table: React.FC = () => {
  const [tableInfo, setTableInfo] = useState<TableRow[]>([]);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data.json`)
      .then((response) => response.json())
      .then((data) => {
        setTableInfo(data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <div className="table-container">
      <div className="status-pills">
        <div className="status-pill planned">
          <span>PLANNED</span>
          <span>14</span>
        </div>
        <div className="status-pill unplanned">
          <span>UNPLANNED</span>
          <span>2</span>
        </div>
        <div className="status-pill emergency">
          <span>EMERGENCY</span>
          <span>1</span>
        </div>
      </div>

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
          {tableInfo.map((row) => (
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
                  <div className="driver-avatar"></div>
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
                  <FontAwesomeIcon icon={faTrashAlt} />
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
