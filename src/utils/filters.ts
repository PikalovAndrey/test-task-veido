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
  const filteredData = data.filter((row) => {
    if (filters.dateRange.start && filters.dateRange.end) {
      const rowDate = new Date(row["Completed Date"]);
      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);

      if (
        isNaN(rowDate.getTime()) ||
        rowDate < startDate ||
        rowDate > endDate
      ) {
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

  if (filters.type === "latest") {
    return filteredData.sort((a, b) => {
      const dateA = new Date(a["Completed Date"]);
      const dateB = new Date(b["Completed Date"]);

      if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
        console.warn(
          "Invalid date encountered during sorting:",
          a["Completed Date"],
          b["Completed Date"]
        );
        return 0;
      }

      return dateB.getTime() - dateA.getTime();
    });
  }

  if (filters.type === "oldest") {
    return filteredData.sort((a, b) => {
      const dateA = new Date(a["Completed Date"]);
      const dateB = new Date(b["Completed Date"]);

      if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
        console.warn(
          "Invalid date encountered during sorting:",
          a["Completed Date"],
          b["Completed Date"]
        );
        return 0;
      }

      return dateA.getTime() - dateB.getTime();
    });
  }

  return filteredData;
};
