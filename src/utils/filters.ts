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
      row.Equipment.toLowerCase().includes(filters.search.toLowerCase()) ||
      row.ID.toString().includes(filters.search.toLowerCase()) ||
      row.Odometer.toLowerCase().includes(filters.search.toLowerCase()) ||
      row.Driver.toLowerCase().includes(filters.search.toLowerCase()) ||
      row.Provider.toLowerCase().includes(filters.search.toLowerCase()) ||
      row.Type.toLowerCase().includes(filters.search.toLowerCase()) ||
      row["Order Number"]
        .toLowerCase()
        .includes(filters.search.toLowerCase()) ||
      row["Completed Date"].toString().includes(filters.search.toLowerCase()) ||
      row["Engine Hours"].toString().includes(filters.search.toLowerCase()) ||
      row["Total Amount"].toString().includes(filters.search.toLowerCase());

    const matchesProvider =
      filters.provider === "all" ||
      row.Provider.toLowerCase() === filters.provider.toLowerCase();

    const matchesTruck =
      filters.truck === "all" ||
      row.Equipment.toLowerCase() === filters.truck.toLowerCase();

    const matchesType =
      filters.type === "ALL" ||
      row.Type.toLowerCase() === filters.type.toLowerCase();

    const matchesTrailer =
      filters.truck === "all" ||
      row.Equipment.toLowerCase() === filters.truck.toLowerCase();

    const matchesDriver =
      filters.driver === "all" ||
      row.Driver.toLowerCase() === filters.driver.toLowerCase();

    const matchesLatest =
      filters.driver === "all" ||
      row.Driver.toLowerCase() === filters.driver.toLowerCase();

    return (
      matchesSearch &&
      matchesProvider &&
      matchesTrailer &&
      matchesTruck &&
      matchesDriver &&
      matchesLatest &&
      matchesType
    );
  });
};
