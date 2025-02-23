import React from "react";
import { format } from "date-fns";

interface TableProps {
  headerMapping: Record<string, string>;
  rows: Array<Record<string, string>>;
  loading: boolean;
  error: string | null;
}

const Table: React.FC<TableProps> = ({ headerMapping, rows, loading, error }) => {
  // Extract the keys (object fields) from the mapping
  const keys = Object.keys(headerMapping);
  const headers = Object.values(headerMapping); // Display names for the headers

  const formatValue = (key: string, value: any) => {
    if (key === "createdAt" && value) {
      return format(new Date(value), "dd/MM/yyyy"); // Format the date
    }
    return value !== undefined ? value : "-";
  };

  if (loading) return <p className="text-center text-blue-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-lg rounded-lg">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b bg-gray-200 text-gray-700">
                <tr>
                  {headers.map((header, index) => (
                    <th key={index} scope="col" className="px-6 py-4 capitalize">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr
                    key={row._id || rowIndex}
                    className={`border-b ${
                      rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    {keys.map((key, colIndex) => (
                      <td
                        key={colIndex}
                        className="whitespace-nowrap px-6 py-4 text-gray-700"
                      >
                        {formatValue(key, row[key] || "-")}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;

