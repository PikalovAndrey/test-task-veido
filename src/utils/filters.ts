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
    // Date range filter
    if (filters.dateRange.start && filters.dateRange.end) {
      const rowDate = new Date(row["Completed Date"]);
      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);

      // Set time to midnight for proper date comparison
      rowDate.setHours(0, 0, 0, 0);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);

      if (!(rowDate >= startDate && rowDate <= endDate)) {
        return false;
      }
    }

    // Search filter
    if (
      filters.search &&
      !row["Order Number"].toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }

    // Provider filter
    if (filters.provider !== "all" && row.Provider !== filters.provider) {
      return false;
    }

    // Truck filter
    if (filters.truck !== "all" && row.Equipment !== filters.truck) {
      return false;
    }

    // Trailer filter
    if (filters.trailer !== "all" && row.Equipment !== filters.trailer) {
      return false;
    }

    // Driver filter
    if (filters.driver !== "all" && row.Driver !== filters.driver) {
      return false;
    }

    return true;
  });
};
