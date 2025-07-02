import React from "react";

export const getStatusColor = (status?: string) => {
  switch (status) {
    case "Bill Introduction":
      return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200";
    case "Committee Review":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "Floor Debate":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "Voting Process":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
    case "Presidential Action":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
    case "Passed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "Failed":
      return "bg-red-900 text-red-100 dark:bg-red-900 dark:text-red-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
};

export const StatusBadge = ({ status }: { status?: string }) => (
  <span
    className={`px-2 py-1 text-xs font-medium rounded-none ${getStatusColor(status)}`}
  >
    {status}
  </span>
); 