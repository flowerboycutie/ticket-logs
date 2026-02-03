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
    <div className="rounded-lg overflow-hidden shadow text-gray-500">
      <table className="w-full text-left bg-white table-fixed">
        <thead>
          <tr className="uppercase text-xs">
            <th className="px-4 h-12 w-[120px]">Ticket ID</th>
            <th className="px-4 h-12">Subject</th>
            <th className="px-4 h-12 w-[140px]">Status</th>
            <th className="px-4 h-12 w-[120px]">Priority</th>
            <th className="px-4 h-12 w-[140px]">Last Updated</th>
            <th className="px-4 h-12 w-[100px]">App</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => {
            const isExpanded = expandedTicketId === ticket.ticketId;

            return (
              <Fragment key={ticket.ticketId}>
                {/* Main Row */}
                <tr
                  onClick={() => toggleExpand(ticket.ticketId)}
                  className="cursor-pointer group [@media(hover:hover)]:hover:bg-gray-200 transition-colors"
                >
                  <td className="p-4 border-t border-gray-300">
                    {ticket.ticketId}
                  </td>
                  <td className="p-4 border-t border-gray-300 font-bold text-gray-800">
                    <div className="flex items-center justify-between gap-4">
                      <span>{ticket.subject}</span>
                      <span className="text-gray-400 text-xs group-hover:text-(--green) whitespace-nowrap w-40">
                        {isExpanded
                          ? "Click to collapse"
                          : "Click to see details..."}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 border-t border-gray-300 text-sm">
                    <span className="text-nowrap text-gray-800 flex items-center">
                      <span
                        className={`inline-block rounded-full w-2 h-2 mr-2 ${statusColors[ticket.status]}`}
                      ></span>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="p-4 border-t border-gray-300">
                    <span
                      className={`${priorityColors[ticket.priority]} rounded-full px-4 py-1 text-white inline-block`}
                    >
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="p-4 border-t border-gray-300">
                    {ticket.lastUpdated}
                  </td>
                  <td className= "pr-4 border-t border-gray-300">
                    <img
                      src={ticket.appLogo}
                      alt={ticket.appName}
                      className="h-8"
                    />
                  </td>
                </tr>

                {/* Expanded Details Row with Smooth Animation */}
                <tr>
                  <td colSpan={6} className="p-0">
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isExpanded ? "[grid-template-rows:1fr]" : "[grid-template-rows:0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="p-6 bg-gray-50">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            Details:
                          </h4>
                          <p className="text-gray-700 leading-relaxed">
                            {ticket.details}
                          </p>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}