import { TableRow } from "../types/TableRow";

interface Filters {
  search: string;
  dateRange: { start: string; end: string };
  provider: string;
  truck: string;
  trailer: string;
  driver: string;
  type: string;
}

export const filterData = (data: TableRow[], filters: Filters) => {
  return data.filter((row) => {
    if (filters.dateRange.start && filters.dateRange.end) {
      const rowDate = new Date(row["Completed Date"]);
      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);

      rowDate.setHours(0, 0, 0, 0);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);

      if (!(rowDate >= startDate && rowDate <= endDate)) {
        return false;
      }
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const rowValues = Object.values(row).map((value) =>
        String(value).toLowerCase()
      );
      if (!rowValues.some((value) => value.includes(searchTerm))) {
        return false;
      }
    }

    if (filters.provider !== "all" && row.Provider !== filters.provider) {
      return false;
    }

    if (filters.truck !== "all" && row.Equipment !== filters.truck) {
      return false;
    }

    if (filters.trailer !== "all" && row.Equipment !== filters.trailer) {
      return false;
    }

    if (filters.driver !== "all" && row.Driver !== filters.driver) {
      return false;
    }

    return true;
  });
};
