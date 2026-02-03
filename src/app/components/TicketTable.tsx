"use client";

import { Fragment } from "react";
import { useState } from "react";

interface Ticket {
  subject: string;
  status: "Pending" | "In Progress" | "Resolved";
  ticketId: string;
  details: string;
  priority: "Low" | "Medium" | "High";
  lastUpdated: string;
  appLogo: string;
  appName: string;
}

interface TicketTableProps {
  tickets: Ticket[];
}

export default function TicketTable({ tickets }: TicketTableProps) {
  const [expandedTicketId, setExpandedTicketId] = useState<string | null>(null);

  const toggleExpand = (ticketId: string) => {
    setExpandedTicketId(expandedTicketId === ticketId ? null : ticketId);
  };

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
    <div className="rounded-lg shadow text-gray-500">
      <table className="w-full text-left bg-white rounded-lg">
        <thead>
          <tr className="uppercase text-xs">
            <th className="px-4 h-12">Ticket ID</th>
            <th className="px-4 h-12">Subject</th>
            <th className="px-4 h-12">Status</th>
            <th className="px-4 h-12">Priority</th>
            <th className="px-4 h-12">Last Updated</th>
            <th className="px-4 h-12">App</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <Fragment key={ticket.ticketId}>
              {/* Main Row */}
              <tr
                onClick={() => toggleExpand(ticket.ticketId)}
                className="cursor-pointer group [@media(hover:hover)]:hover:bg-gray-200 transition-colors"
              >
                <td className="p-4 border-t border-gray-300">
                  {ticket.ticketId}
                </td>
                <td className="p-4 border-t border-gray-300 font-bold text-gray-800 flex items-center justify-between">
                  {ticket.subject} <span className="text-gray-400 text-xs border-none group-hover:text-(--green) textwrap-nowrap">Click to see details...</span>
                </td>
                <td className="p-4 border-t border-gray-300">
                  <span className="text-nowrap text-gray-800">
                    <span
                      className={`inline-block rounded-full w-2 h-2 mr-2 ${statusColors[ticket.status]}`}
                    ></span>
                    {ticket.status}
                  </span>
                </td>
                <td className="border-t border-gray-300">
                  <span
                    className={`${priorityColors[ticket.priority]} rounded-full px-4 py-1 text-white`}
                  >
                    {ticket.priority}
                  </span>
                </td>
                <td className="p-4 border-t border-gray-300">
                  {ticket.lastUpdated}
                </td>
                <td className="p-4 border-t border-gray-300">
                  <img
                    src={ticket.appLogo}
                    alt={ticket.appName}
                    className="h-6 items-center"
                  />
                </td>
              </tr>

              {/* Expanded Details Row */}
              {expandedTicketId === ticket.ticketId && (
                <tr>
                  <td colSpan={7} className="rounded-lg w-32">
                    <div className="p-6">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Details:
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        {ticket.details}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
