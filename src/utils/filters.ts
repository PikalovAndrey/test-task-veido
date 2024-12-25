import { TableRow } from "../types/TableRow";

export const filterData = (
  data: TableRow[],
  filters: {
    search: string;
    dateRange: { start: string; end: string };
    provider: string;
    truck: string;
    trailer: string;
    driver: string;
    type: string;
  }
): TableRow[] => {
  return data.filter((row) => {
    const matchesSearch =
      row["Order Number"]
        .toLowerCase()
        .includes(filters.search.toLowerCase()) ||
      row.Equipment.toLowerCase().includes(filters.search.toLowerCase()) ||
      row.Driver.toLowerCase().includes(filters.search.toLowerCase()) ||
      row.Provider.toLowerCase().includes(filters.search.toLowerCase());

    const matchesType =
      filters.type === "ALL" ||
      row.Type.toLowerCase() === filters.type.toLowerCase();

    const matchesProvider =
      filters.provider === "all" ||
      row.Provider.toLowerCase() === filters.provider.toLowerCase();

    const matchesTruck =
      filters.truck === "all" ||
      row.Equipment.toLowerCase() === filters.truck.toLowerCase();

    const matchesDriver =
      filters.driver === "all" ||
      row.Driver.toLowerCase() === filters.driver.toLowerCase();

    // Add similar conditions for other filters like trailer, dateRange, etc.

    return (
      matchesSearch &&
      matchesType &&
      matchesProvider &&
      matchesTruck &&
      matchesDriver
    );
  });
};
