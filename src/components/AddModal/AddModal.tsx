import React, { useState } from "react";
import { TableRow } from "../../types/TableRow";

interface AddModalProps {
  onSave: (newRow: TableRow) => void;
  onClose: () => void;
}

const AddModal: React.FC<AddModalProps> = ({ onSave, onClose }) => {
  const [newRow, setNewRow] = useState<TableRow>({
    ID: Date.now(),
    "Order Number": "",
    Equipment: "",
    Driver: "",
    Type: "",
    "Completed Date": "",
    Provider: "",
    "Engine Hours": 0,
    Odometer: "",
    "Last Service": "",
    "Total Amount": "",
    "Solved Defects": "",
    Files: "",
    img: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
              onChange={handleChange}
            />
          </label>
          <label>
            Equipment:
            <input
              type="text"
              name="Equipment"
              value={newRow.Equipment}
              onChange={handleChange}
            />
          </label>
          <label>
            Driver:
            <input
              type="text"
              name="Driver"
              value={newRow.Driver}
              onChange={handleChange}
            />
          </label>
          <label>
            Type:
            <input
              type="text"
              name="Type"
              value={newRow.Type}
              onChange={handleChange}
            />
          </label>
          <label>
            Completed Date:
            <input
              type="text"
              name="Completed Date"
              value={newRow["Completed Date"]}
              onChange={handleChange}
            />
          </label>
          <label>
            Provider:
            <input
              type="text"
              name="Provider"
              value={newRow.Provider}
              onChange={handleChange}
            />
          </label>
          <label>
            Engine Hours:
            <input
              type="number"
              name="Engine Hours"
              value={newRow["Engine Hours"]}
              onChange={handleChange}
            />
          </label>
          <label>
            Odometer:
            <input
              type="text"
              name="Odometer"
              value={newRow.Odometer}
              onChange={handleChange}
            />
          </label>
          <label>
            Last Service:
            <input
              type="text"
              name="Last Service"
              value={newRow["Last Service"]}
              onChange={handleChange}
            />
          </label>
          <label>
            Total Amount:
            <input
              type="text"
              name="Total Amount"
              value={newRow["Total Amount"]}
              onChange={handleChange}
            />
          </label>
          <label>
            Solved Defects:
            <input
              type="text"
              name="Solved Defects"
              value={newRow["Solved Defects"]}
              onChange={handleChange}
            />
          </label>
          <label>
            Files:
            <input
              type="text"
              name="Files"
              value={newRow.Files}
              onChange={handleChange}
            />
          </label>
          <label>
            Image:
            <input
              type="text"
              name="img"
              value={newRow.img}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
