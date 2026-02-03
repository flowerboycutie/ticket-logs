"use client";

import { useState } from "react";

interface TicketCardProps {
  subject: string;
  status: "Pending" | "In Progress" | "Resolved";
  ticketId: string;
  details: string;
  priority: "Low" | "Medium" | "High";
  lastUpdated: string;
  appLogo: string;
  appName: string;
}

export default function TicketCard({
  subject,
  status,
  ticketId,
  details,
  priority,
  lastUpdated,
  appLogo,
  appName,
}: TicketCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isTruncated = details.length > 150;
  const truncDetails = isTruncated ? details.substring(0, 150) + "..." : details;

  const statusColors = {
    Pending: "bg-yellow-500",
    "In Progress": "bg-blue-500",
    Resolved: "bg-green-500",
  };

  const priorityColors = {
    Low: "bg-green-500",
    Medium: "bg-yellow-500",
    High: "bg-red-500",
  };

  return (
    <div className="ticket-card-container bg-white text-gray-500 px-4 py-8 rounded-lg flex flex-col gap-4 shadow z-0 transition-shadow [@media(hover:hover)]:hover:shadow-lg"
            onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items justify-between gap-4 items-center">
        <h3 className="text-xl semi-bold text-gray-800">{subject}</h3>
        <span className="whitespace-nowrap flex items-center h-full px-2 py-1 text-gray-500">
          <span
            className={`inline-block w-2 h-2 rounded-full mr-1.5 ${statusColors[status]}`}
          ></span>
          <span className="text-gray-800">{status}</span>
        </span>
      </div>

      <p>{ticketId}</p>

      {/* Smooth expanding details section */}
      <div>
        <div
          className={`grid transition-all duration-300 ease-in-out ${
            isExpanded ? "[grid-template-rows:1fr]" : "[grid-template-rows:0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <p className="pb-2">{isExpanded ? details : truncDetails}</p>
          </div>
        </div>

        {
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="underline text-blue-500 mt-1 text-left focus:outline-none transition-colors [@media(hover:hover)]:hover:text-blue-600"
          >
            {isExpanded ? "Tap to collapse" : "Tap to see details"}
          </button>
        }
      </div>

      <div className="flex justify-between">
        <span
          className={`${priorityColors[priority]} border rounded-full px-4 py-1 text-white`}
        >
          {priority}
        </span>
        <span>{lastUpdated}</span>
      </div>

      <img src={appLogo} alt={appName} className="h-6 self-end" />
    </div>
  );
}