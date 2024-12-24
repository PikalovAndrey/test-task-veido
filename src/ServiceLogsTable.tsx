import React from "react";
import {
  ChevronDown,
  Search,
  MoreVertical,
  FileText,
  Edit,
  Trash2,
} from "lucide-react";

// TypeScript interfaces
interface ServiceLog {
  id: number;
  orderNumber: string;
  equipment: {
    id: string;
    name: string;
    details: string;
  };
  driver: {
    name: string;
    avatar: string;
  };
  type: "planned" | "unplanned" | "emergency";
  completedDate: string;
  provider: string;
  engineHours: number;
  odometer: string;
  lastService: string;
  totalAmount: number;
}

const ServiceLogsTable = () => {
  const demoData: ServiceLog[] = [
    {
      id: 572,
      orderNumber: "ORDER-2-test3",
      equipment: {
        id: "118",
        name: "Sherman",
        details: "reilly VNL 760",
      },
      driver: {
        name: "Vasya Smith",
        avatar: "/api/placeholder/32/32",
      },
      type: "planned",
      completedDate: "",
      provider: "Freeca, LLC",
      engineHours: 800,
      odometer: "4,500 mi",
      lastService: "",
      totalAmount: 1524.34,
    },
    // Add more demo data here as needed
  ];

  return (
    <div className="w-full bg-white rounded-lg shadow">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">Service Logs</h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-9 pr-4 py-2 border rounded-md w-64"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                PLANNED 14
              </span>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                UNPLANNED 2
              </span>
              <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                EMERGENCY 1
              </span>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2">
              + ADD
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Start Date</span>
            <button className="px-3 py-1.5 border rounded flex items-center gap-2">
              All
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
          {/* Add more filter buttons as needed */}
        </div>
      </div>

      {/* Table */}
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              ID
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              ORDER NUMBER
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              EQUIPMENT
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              DRIVER
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              TYPE
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              COMPLETED DATE
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              PROVIDER
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              ENGINE HOURS
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              ODOMETER
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              TOTAL AMOUNT
            </th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {demoData.map((log) => (
            <tr key={log.id} className="border-t">
              <td className="px-4 py-2">{log.id}</td>
              <td className="px-4 py-2">{log.orderNumber}</td>
              <td className="px-4 py-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                    {log.equipment.id}
                  </div>
                  <span>
                    {log.equipment.name} + {log.equipment.details}
                  </span>
                </div>
              </td>
              <td className="px-4 py-2">
                <div className="flex items-center gap-2">
                  <img
                    src={log.driver.avatar}
                    alt=""
                    className="w-6 h-6 rounded-full"
                  />
                  <span>{log.driver.name}</span>
                </div>
              </td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    log.type === "planned"
                      ? "bg-green-100 text-green-800"
                      : log.type === "unplanned"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {log.type.charAt(0).toUpperCase() + log.type.slice(1)}
                </span>
              </td>
              <td className="px-4 py-2">{log.completedDate}</td>
              <td className="px-4 py-2">{log.provider}</td>
              <td className="px-4 py-2">{log.engineHours}</td>
              <td className="px-4 py-2">{log.odometer}</td>
              <td className="px-4 py-2">${log.totalAmount.toFixed(2)}</td>
              <td className="px-4 py-2">
                <div className="flex items-center gap-2">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <FileText className="h-4 w-4 text-gray-500" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Edit className="h-4 w-4 text-gray-500" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Trash2 className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer */}
      <div className="p-4 border-t flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Rows per page:</span>
          <button className="px-2 py-1 border rounded flex items-center gap-2">
            50
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
        <div className="text-sm text-gray-600">1-17 of 17</div>
      </div>
    </div>
  );
};

export default ServiceLogsTable;
