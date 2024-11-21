import React from "react";

export default function JsonTable({ data }) {
  const excludeKeys = ["pk", "pseudo_name", "org", "Date"];

  const tableData = {};

  Object.entries(data).forEach(([key, value]) => {
    if (excludeKeys.includes(key)) return;

    const matches = key.match(/(Start|Stop) (.+)/);
    if (matches) {
      const [_, action, eventName] = matches;
      if (!tableData[eventName]) {
        tableData[eventName] = { event: eventName, start: "", stop: "" };
      }
      tableData[eventName][action.toLowerCase()] = value;
    }
  });
  
  const sortedTableData = Object.values(tableData).sort((a, b) => {
    const getEventNumber = (eventName) => {
      const num = eventName.match(/\d+/);
      return num ? parseInt(num[0], 10) : 0;
    };

    const numA = getEventNumber(a.event);
    const numB = getEventNumber(b.event);

    if (numA !== numB) {
      return numA - numB;
    } else {
      return a.event.localeCompare(b.event);
    }
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border border-teal-500 rounded-xl">
        <thead className="bg-teal-500 text-white">
          <tr>
            <th className="px-4 py-2 text-left text-lg border-b border-teal-500">
              
            </th>
            <th className="px-4 py-2 text-left text-lg border-b border-teal-500">
              Start Time
            </th>
            <th className="px-4 py-2 text-left text-lg border-b border-teal-500">
              Stop Time
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedTableData.map(({ event, start, stop }) => (
            <tr key={event} className="bg-slate-700 text-white">
              <td className="border-t border-teal-500 px-4 py-2 text-lg">
                {event}
              </td>
              <td className="border-t border-teal-500 px-4 py-2 text-lg">
                {start}
              </td>
              <td className="border-t border-teal-500 px-4 py-2 text-lg">
                {stop}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
