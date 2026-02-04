"use client";
import { useState, useRef, useEffect } from "react";

interface TicketCardDesktopProps {
  subject: string;
  status: "Pending" | "In Progress" | "Resolved";
  ticketId: string;
  details: string;
  priority: "Low" | "Medium" | "High";
  lastUpdated: string;
  appLogo: string;
  appName: string;
}

export default function TicketCardDesktop({
  subject,
  status,
  ticketId,
  details,
  priority,
  lastUpdated,
  appLogo,
  appName,
}: TicketCardDesktopProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditOn, setIsEditOn] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const statusColors = {
    Pending: "text-yellow-500",
    "In Progress": "text-blue-500",
    Resolved: "text-green-500",
  };

  const priorityColors = {
    Low: "bg-green-500",
    Medium: "bg-yellow-500",
    High: "bg-red-500",
  };

  const getStatusIcon = (status: "Pending" | "In Progress" | "Resolved") => {
    switch (status) {
      case "Pending":
        return "icon-pending.png";
      case "In Progress":
        return "icon-in-progress.png";
      case "Resolved":
        return "icon-resolved.png";
      default:
        return "";
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="ticket-card-container bg-white text-gray-500 p-4 rounded-lg">
      <div className="top-side flex justify-between border-b border-gray-200 w-full">
        <div className="left flex flex-col p-4 gap-4 flex-1 min-w-0">
          <h3 className="text-xl font-semibold text-gray-800">
            {subject}{" "}
            <span className="text-sm text-gray-500">- #{ticketId}</span>
          </h3>
          {isEditOn ? (
            <textarea
              className="w-full h-full border border-gray-200 rounded-md p-2 resize-none pb-12"
              defaultValue={details}
            />
          ) : (
            <p className="text-wrap">{details}</p>
          )}

        </div>
        <div className="right flex gap-4 p-4 items-center h-full">
          <p className="text-nowrap">Last Updated: {lastUpdated}</p>
          <div className="relative" ref={menuRef}>
            <button className="" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <img
                src="dots.png"
                alt="ewan e three dots?"
                className="h-8 hover:bg-gray-100 rounded-full ease-in-out duration-300"
              />
            </button>
            {isMenuOpen && (
              <div className="absolute w-full top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[150px] z-50 flex flex-col gap-2 p-2 items-start">
                <button
                  className="w-full hover:bg-gray-100 rounded-md ease-in-out duration-300"
                  onClick={() => {setIsMenuOpen(false); setIsEditOn(true);}}
                >
                  <p className="text-left p-2">Edit</p>
                </button>
                <button
                  className="w-full hover:bg-gray-100 rounded-md ease-in-out duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <p className="text-left p-2">Delete</p>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="bot-side flex justify-between p-4">
        <div className="flex flex-col gap-4">
          <p className="text-sm">Assignee</p>
          <div className="flex items-center gap-2">
            <img
              src="avatar-default.svg"
              alt="Default Avatar Icon"
              className="h-8"
            />
            <p>Juan dela Cruz</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-sm">Status</p>
          <div className="flex gap-2">
            <img src={getStatusIcon(status)} alt={status} className="h-6 w-6" />
            <span className={`${statusColors[status]}`}>{status}</span>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-sm">Priority</p>
          <p
            className={`${priorityColors[priority]} rounded-full text-white text-center p-1`}
          >
            {priority}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-sm">App</p>
          <img src={appLogo} alt={appName} className="h-6" />
        </div>
      </div>
    </div>
  );
}
