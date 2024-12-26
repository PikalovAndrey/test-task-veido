import React, { useState } from "react";
import { TableRow } from "../../types/TableRow";
import "../AddModal/AddModal.css";

interface AddModalProps {
  tableInfo: TableRow[];
  drivers: {
    name: string;
    img: string;
  }[];
  onSave: (newRow: TableRow) => void;
  onClose: () => void;
}

const AddModal: React.FC<AddModalProps> = ({
  tableInfo,
  drivers,
  onSave,
  onClose,
}) => {
  const getMaximumID = (tableInfo: TableRow[]): number => {
    const maxID = Math.max(...tableInfo.map((item) => item.ID));
    return maxID + 1;
  };

  const [newRow, setNewRow] = useState<TableRow>({
    ID: getMaximumID(tableInfo),
    "Order Number": "",
    Equipment: "",
    Driver: drivers.length > 0 ? drivers[0].name : "",
    Type: "",
    "Completed Date": "",
    Provider: "",
    "Engine Hours": 0,
    Odometer: "",
    "Last Service": "",
    "Total Amount": "",
    "Solved Defects": "",
    Files: "",
    img: drivers.length > 0 ? `${process.env.PUBLIC_URL}${drivers[0].img}` : "",
  });

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "Driver") {
      const selectedDriver = drivers.find((driver) => driver.name === value);
      setNewRow((prevRow) => ({
        ...prevRow,
        [name]: value,
        img: selectedDriver ? `${selectedDriver.img}` : "",
      }));
    } else {
      setNewRow((prevRow) => ({
        ...prevRow,
        [name]: value,
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRow((prevRow) => ({
      ...prevRow,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(newRow);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <form onSubmit={handleSubmit}>
          <label>
            Order Number:
            <input
              type="text"
              name="Order Number"
              value={newRow["Order Number"]}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Equipment:
            <input
              type="text"
              name="Equipment"
              value={newRow.Equipment}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Driver:
            <select
              name="Driver"
              value={newRow.Driver}
              onChange={handleSelectChange}
            >
              {drivers.map((driver) => (
                <option key={driver.name} value={driver.name}>
                  {driver.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Type:
            <input
              type="text"
              name="Type"
              value={newRow.Type}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Completed Date:
            <input
              type="text"
              name="Completed Date"
              value={newRow["Completed Date"]}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Provider:
            <input
              type="text"
              name="Provider"
              value={newRow.Provider}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Engine Hours:
            <input
              type="number"
              name="Engine Hours"
              value={newRow["Engine Hours"]}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Odometer:
            <input
              type="text"
              name="Odometer"
              value={newRow.Odometer}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Last Service:
            <input
              type="text"
              name="Last Service"
              value={newRow["Last Service"]}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Total Amount:
            <input
              type="text"
              name="Total Amount"
              value={newRow["Total Amount"]}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Solved Defects:
            <input
              type="text"
              name="Solved Defects"
              value={newRow["Solved Defects"]}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Files:
            <input
              type="text"
              name="Files"
              value={newRow.Files}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
