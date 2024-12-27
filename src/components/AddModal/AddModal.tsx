import React, { useState } from "react";
import { TableRow } from "../../types/TableRow";
import "../AddModal/AddModal.css";

interface AddModalProps {
  tableInfo: TableRow[];
  draftItems: TableRow[];
  drivers: {
    name: string;
    img: string;
  }[];
  onSave: (newRow: TableRow) => void;
  onClose: (unsavedDraft?: TableRow) => void;
  onDeleteDraft: (draftId: number) => void;
}

const AddModal: React.FC<AddModalProps> = ({
  tableInfo,
  drivers,
  draftItems,
  onSave,
  onClose,
  onDeleteDraft,
}) => {
  const getMaximumID = (tableInfo: TableRow[]): number => {
    const maxID = Math.max(...tableInfo.map((item) => item.ID));
    return maxID + 1;
  };

  const [currentDraftIndex, setCurrentDraftIndex] = useState(0);
  const [isModified, setIsModified] = useState(false);

  const [newRow, setNewRow] = useState<TableRow>(
    draftItems.length > 0
      ? draftItems[0]
      : {
          ID: getMaximumID(tableInfo),
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
          img:
            drivers.length > 0
              ? `${process.env.PUBLIC_URL}${drivers[0].img}`
              : "",
        }
  );

  const isFormValid = () => {
    return (
      newRow.Driver &&
      newRow["Order Number"] &&
      newRow.Equipment &&
      newRow.Type &&
      newRow["Completed Date"] &&
      newRow.Provider &&
      newRow.Odometer &&
      newRow["Total Amount"]
    );
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "Driver") {
      setIsModified(true);
      const selectedDriver = drivers.find((driver) => driver.name === value);
      setNewRow((prevRow) => ({
        ...prevRow,
        [name]: value,
        img: selectedDriver ? `${selectedDriver.img}` : "",
      }));
    } else {
      setIsModified(true);
      setNewRow((prevRow) => ({
        ...prevRow,
        [name]: value,
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIsModified(true);
    setNewRow((prevRow) => ({
      ...prevRow,
      [name]: value,
    }));
  };

  const handlePreviousDraft = () => {
    if (currentDraftIndex > 0) {
      setCurrentDraftIndex(currentDraftIndex - 1);
      setNewRow(draftItems[currentDraftIndex - 1]);
      setIsModified(false);
    }
  };

  const handleNextDraft = () => {
    if (currentDraftIndex < draftItems.length - 1) {
      setCurrentDraftIndex(currentDraftIndex + 1);
      setNewRow(draftItems[currentDraftIndex + 1]);
      setIsModified(false);
    }
  };

  const handleCreateNew = () => {
    setNewRow({
      ID: getMaximumID(tableInfo),
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
      img:
        drivers.length > 0 ? `${process.env.PUBLIC_URL}${drivers[0].img}` : "",
    });
    setIsModified(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(newRow);
    onClose();
  };

  const handleClose = () => {
    if (isModified) {
      onClose(newRow);
    } else {
      onClose();
    }
  };

  const handleSave = () => {
    onSave(newRow);
    onClose();
  };

  const handleDeleteAllDrafts = () => {
    draftItems.forEach((draft) => {
      onDeleteDraft(draft.ID);
    });

    handleCreateNew();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add/Edit Item</h2>
        <div className="buttons">
          <button
            type="button"
            onClick={handleCreateNew}
            className="create-new-btn"
          >
            Create New
          </button>
        </div>
        {draftItems.length > 0 && (
          <div className="draft-controls">
            <label>
              Select Draft:
              <select
                value={currentDraftIndex}
                onChange={(e) => {
                  const selectedIndex = parseInt(e.target.value, 10);
                  setCurrentDraftIndex(selectedIndex);
                  setNewRow(draftItems[selectedIndex]);
                }}
              >
                {draftItems.map((_, index) => (
                  <option key={index} value={index}>
                    Draft {index + 1}
                  </option>
                ))}
              </select>
            </label>
            <div className="buttons">
              <button
                type="button"
                onClick={handlePreviousDraft}
                disabled={currentDraftIndex === 0}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNextDraft}
                disabled={currentDraftIndex === draftItems.length - 1}
              >
                Next
              </button>
              <button
                type="button"
                onClick={handleDeleteAllDrafts}
                className="delete-draft-btn"
                style={{ backgroundColor: "#dc3545", color: "white" }}
              >
                Delete All Drafts
              </button>
            </div>
          </div>
        )}

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
              <option value="" disabled>
                Select driver
              </option>
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

          <div className="buttons">
            <button
              type="submit"
              onClick={handleSave}
              disabled={!isFormValid()}
            >
              Save
            </button>
            <button type="button" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
