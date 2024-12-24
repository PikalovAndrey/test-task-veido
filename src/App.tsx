import React, { useEffect, useState } from "react";
import "./App.css";
import Table from "./components/Table/Table.tsx";
import { Header } from "./components/Header/Header.tsx";
import { SortFields } from "./components/SortFields/SortFields.tsx";
import { Footer } from "./components/Footer/Footer.tsx";
import { TableRow } from "./types/TableRow.ts";
import { filterData } from "../src/utils/filters.ts";

function App() {
  const [tableInfo, setTableInfo] = useState<TableRow[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [filters, setFilters] = useState({
    search: "",
    dateRange: { start: "", end: "" },
    provider: "all",
    truck: "all",
    trailer: "all",
    driver: "all",
    type: "ALL",
  });

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

  const filteredData = filterData(tableInfo, filters);

  const handleSearch = (searchTerm: string) => {
    setFilters((prev) => ({ ...prev, search: searchTerm }));
    setCurrentPage(1);
  };

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
    setCurrentPage(1);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <Header
        tableInfo={tableInfo}
        onSearch={handleSearch}
        onTypeChange={(type) => handleFilterChange("type", type)}
        selectedType={filters.type}
      />
      <SortFields
        onDateRangeChange={(start, end) =>
          setFilters((prev) => ({
            ...prev,
            dateRange: { start, end },
          }))
        }
        onProviderChange={(provider) =>
          handleFilterChange("provider", provider)
        }
        onDriverChange={(driver) => handleFilterChange("driver", driver)}
        filters={filters}
      />
      <div className="p-4">
        <Table
          data={filteredData}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
        />
      </div>
      <Footer
        totalRows={filteredData.length}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;