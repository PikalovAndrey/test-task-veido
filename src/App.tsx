import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import Table from "./components/Table/Table.tsx";
import { Header } from "./components/Header/Header.tsx";
import { SortFields } from "./components/SortFields/SortFields.tsx";
import { Footer } from "./components/Footer/Footer.tsx";
import { TableRow } from "./types/TableRow.ts";
import { filterData } from "../src/utils/filters.ts";
import AddModal from "./components/AddModal/AddModal.tsx";

function App() {
  const [tableInfo, setTableInfo] = useState<TableRow[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    dateRange: { start: "", end: "" },
    provider: "all",
    truck: "all",
    trailer: "all",
    driver: "all",
    type: "ALL", // Початкове значення
  });

  // Спочатку фільтруємо за типом (planned, unplanned, emergency)
  const typeFilteredData = useMemo(() => {
    if (filters.type === "ALL") return tableInfo;
    return tableInfo.filter((row) => row.Type === filters.type);
  }, [tableInfo, filters.type]);

  // Потім застосовуємо інші фільтри
  const filteredData = useMemo(
    () => filterData(typeFilteredData, filters),
    [typeFilteredData, filters]
  );

  // Сортуємо за датою, якщо вибрано latest або oldest
  const sortedData = useMemo(() => {
    if (filters.type === "latest" || filters.type === "oldest") {
      return filteredData.sort((a, b) => {
        const dateA = new Date(a["Completed Date"]).getTime();
        const dateB = new Date(b["Completed Date"]).getTime();
        return filters.type === "latest" ? dateB - dateA : dateA - dateB;
      });
    }
    return filteredData;
  }, [filteredData, filters.type]);

  const drivers = Array.from(
    new Set(tableInfo.map((item) => `${item.Driver},${item.img}`))
  ).map((driverInfo) => {
    const [name, img] = driverInfo.split(",");
    return { name, img };
  });

  const handleSearch = (searchTerm: string) => {
    setFilters((prev) => ({ ...prev, search: searchTerm }));
    setCurrentPage(1);
  };

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
    setCurrentPage(1);
  };

  const handleDateRangeChange = (start: string, end: string) => {
    setFilters((prev) => ({
      ...prev,
      dateRange: { start, end },
    }));
    setCurrentPage(1);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSaveItem = (updatedRow: TableRow) => {
    const updatedData = tableInfo.map((row) =>
      row.ID === updatedRow.ID ? updatedRow : row
    );
    setTableInfo(updatedData);
  };

  const handleDeleteItem = (itemId: number) => {
    const updatedData = tableInfo.filter((row) => row.ID !== itemId);
    setTableInfo(updatedData);
  };

  const handleAddItem = (newRow: TableRow) => {
    setTableInfo([newRow, ...tableInfo]);
  };

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data.json`)
      .then((response) => response.json())
      .then((data) => {
        setTableInfo(data);
      })
      .catch((e) => {
        console.error("Error loading data:", e);
      });
  }, []);

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <Header
        tableInfo={tableInfo}
        onSearch={handleSearch}
        onTypeChange={(type) => handleFilterChange("type", type)}
        selectedType={filters.type}
        onAddClick={() => setIsAddModalOpen(true)}
      />
      <SortFields
        onDateRangeChange={handleDateRangeChange}
        onProviderChange={(provider) =>
          handleFilterChange("provider", provider)
        }
        onDriverChange={(driver) => handleFilterChange("driver", driver)}
        onTruckChange={(truck) => handleFilterChange("truck", truck)}
        onTrailerChange={(trailer) => handleFilterChange("trailer", trailer)}
        onTypeChange={(type) => handleFilterChange("type", type)}
        filters={filters}
        tableInfo={tableInfo}
      />

      <div className="p-4">
        <Table
          data={sortedData}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          onSaveItem={handleSaveItem}
          onDeleteItem={handleDeleteItem}
        />
      </div>
      <Footer
        totalRows={filteredData.length}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        onPageChange={handlePageChange}
      />
      {isAddModalOpen && (
        <AddModal
          drivers={drivers}
          tableInfo={tableInfo}
          onSave={handleAddItem}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
