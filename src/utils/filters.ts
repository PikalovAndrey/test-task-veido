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
) => {
  return data.filter((row) => {
    const matchesSearch = !filters.search
      ? true
      : Object.values(row).some((value) =>
          value.toString().toLowerCase().includes(filters.search.toLowerCase())
        );

    const matchesDateRange =
      !filters.dateRange.start || !filters.dateRange.end
        ? true
        : row["Completed Date"] >= filters.dateRange.start &&
          row["Completed Date"] <= filters.dateRange.end;

    const matchesProvider =
      !filters.provider || filters.provider === "all"
        ? true
        : row.Provider === filters.provider;

    const matchesType =
      !filters.type || filters.type === "ALL"
        ? true
        : row.Type === filters.type.toUpperCase();

    const matchesDriver =
      !filters.driver || filters.driver === "all"
        ? true
        : row.Driver === filters.driver;

    return (
      matchesSearch &&
      matchesDateRange &&
      matchesProvider &&
      matchesType &&
      matchesDriver
    );
  });
};
