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
  onDelete: (ticketId: string) => void;
}

export default function TicketCardDesktop({
  subject: initialSubject,
  status,
  ticketId,
  details: initialDetails,
  priority,
  lastUpdated,
  appLogo: initialAppLogo,
  appName: initialAppName,
  onDelete,
}: TicketCardDesktopProps) {
  const [details, setDetails] = useState(initialDetails);
  const [subject, setSubject] = useState(initialSubject);
  const [appLogo, setAppLogo] = useState(initialAppLogo);
  const [appName, setAppName] = useState(initialAppName);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditOn, setIsEditOn] = useState(false);
  const [isAppdrowDownOpen, setIsAppdrowDownOpen] = useState(false);
  
  const [editedDetails, setEditedDetails] = useState(details);
  const [editedSubject, setEditedSubject] = useState(subject);
  const [editedAppLogo, setEditedAppLogo] = useState(appLogo);
  const [editedAppName, setEditedAppName] = useState(appName);
  
  const menuRef = useRef<HTMLDivElement>(null);
  const appsRef = useRef<HTMLDivElement>(null);

  const apps = [
    { logo: "/paraverse-apps/logo-briefcase.svg", name: "Briefcase" },
    { logo: "/paraverse-apps/logo-credentials.svg", name: "Credentials" },
    { logo: "/paraverse-apps/logo-eventually.svg", name: "Eventually" },
    { logo: "/paraverse-apps/logo-icare.jpg", name: "iCare" },
    { logo: "/paraverse-apps/logo-mflix.svg", name: "mFlix" },
    { logo: "/paraverse-apps/logo-network-map.svg", name: "Network Map" },
  ];

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
    if (isEditOn) {
      setEditedDetails(details);
      setEditedSubject(subject);
      setEditedAppLogo(appLogo);
      setEditedAppName(appName);
    }
  }, [isEditOn, details, subject, appLogo, appName]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
      if (appsRef.current && !appsRef.current.contains(event.target as Node)) {
        setIsAppdrowDownOpen(false);
      }
    }

    if (isMenuOpen || isAppdrowDownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, isAppdrowDownOpen]);

  return (
    <div className="ticket-card-container bg-white text-gray-500 p-4 rounded-lg">
      <div className="top-side flex flex-col border-b border-gray-200 w-full">
        {/* Top row: Subject and Last Updated */}
        <div className="flex justify-between items-start p-4 pb-2">
          {isEditOn ? (
            <div className="flex-1 flex flex-col gap-2">
              <textarea
                className="w-full h-12 bg-gray-50 rounded-md p-2 resize-none border border-gray-300 focus:outline-none focus:border-green-500"
                value={editedSubject}
                onChange={(e) => setEditedSubject(e.target.value)}
              />
              <div
                className={`${
                  editedSubject.length > 60 || editedSubject.length === 0
                    ? "text-red-500"
                    : "text-gray-500"
                } text-xs`}
              >
                {editedSubject.length}/60 Characters
              </div>
            </div>
          ) : (
            <h3 className="text-xl font-semibold text-gray-800 flex-1">
              {subject}{" "}
              <span className="text-sm text-gray-500">- #{ticketId}</span>
            </h3>
          )}

          <div className="flex gap-4 items-center ml-4">
            <p className="text-nowrap text-sm">Last Updated: {lastUpdated}</p>
            <div className="relative" ref={menuRef}>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <img
                  src="dots.png"
                  alt="Menu"
                  className="h-8 hover:bg-gray-100 rounded-full ease-in-out duration-300"
                />
              </button>
              {isMenuOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[150px] z-50 overflow-hidden">
                  <button
                    className={`w-full text-left px-4 py-2 ease-in-out duration-300 ${status !== "Pending" ? "cursor-not-allowed text-gray-300" : "hover:bg-gray-100"}`}
                    disabled={status !== "Pending"}
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsEditOn(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className={`w-full text-left px-4 py-2 ease-in-out duration-300 ${
                      status !== "Pending"
                        ? "cursor-not-allowed text-gray-300"
                        : "text-red-500 hover:bg-gray-100"
                    }`}
                    onClick={() => {
                      if (status !== "Pending") return;
                      onDelete(ticketId);
                      setIsMenuOpen(false);
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Full-width details section */}
        <div className="p-4 pt-2">
          {isEditOn ? (
            <>
              <textarea
                className="w-full h-32 bg-gray-50 rounded-md p-2 resize-none border border-gray-300 focus:outline-none focus:border-(--green)"
                value={editedDetails}
                onChange={(e) => setEditedDetails(e.target.value)}
              />

              {/* Bottom row: char count, app logo, buttons */}
              <div className="flex justify-between items-start">
                <div
                  className={`${
                    editedDetails.length > 600 || editedDetails.length === 0
                      ? "text-red-500"
                      : "text-gray-500"
                  } text-xs text`}
                >
                  <p>{editedDetails.length}/600 Characters</p>
                </div>
                <div className="relative" ref={appsRef}>
                  <div 
                    className="flex gap-2 py-2 px-4 rounded border border-gray-300 focus:border-(--green) hover:bg-gray-100 ease-in-out duration-300 cursor-pointer"
                    onClick={() => setIsAppdrowDownOpen(!isAppdrowDownOpen)}
                  >
                    <img src={editedAppLogo} alt={editedAppName} className="h-6" />
                    <img
                      src="arrow-down-angle.svg"
                      alt=""
                      className={`h-4 flex self-center transition-transform duration-300 ${isAppdrowDownOpen ? 'rotate-180' : ''}`}
                    />
                  </div>
                  {isAppdrowDownOpen && (
                    <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[200px] z-40">
                      <ul className="flex flex-col gap-2 p-2">
                        {apps.map((app) => (
                          <li 
                            key={app.name}
                            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer"
                            onClick={() => {
                              setEditedAppLogo(app.logo);
                              setEditedAppName(app.name);
                              setIsAppdrowDownOpen(false);
                            }}
                          >
                            <img src={app.logo} alt={app.name} className="h-6" />
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <button
                    className="py-2 px-4 w-24 bg-gray-100 hover:bg-gray-200 ease-in-out duration-300 rounded text-center"
                    onClick={() => {
                      setIsEditOn(false);
                      setEditedDetails(details);
                      setEditedSubject(subject);
                      setEditedAppLogo(appLogo);
                      setEditedAppName(appName);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className={`py-2 px-4 w-25 rounded ease-in-out duration-300 ${
                      editedDetails.length > 600 ||
                      editedDetails.length === 0 ||
                      editedSubject.length > 60 ||
                      editedSubject.length === 0
                        ? "bg-gray-400 cursor-not-allowed text-white"
                        : "bg-(--green) text-white hover:bg-(--green-hover)"
                    }`}
                    disabled={
                      editedDetails.length > 600 ||
                      editedDetails.length === 0 ||
                      editedSubject.length > 60 ||
                      editedSubject.length === 0
                    }
                    onClick={() => {
                      if (
                        !(
                          editedDetails.length > 600 ||
                          editedDetails.length === 0 ||
                          editedSubject.length > 60 ||
                          editedSubject.length === 0
                        )
                      ) {
                        setDetails(editedDetails);
                        setSubject(editedSubject);
                        setAppLogo(editedAppLogo);
                        setAppName(editedAppName);
                        setIsEditOn(false);
                      }
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </>
          ) : (
            <p className="text-wrap">{details}</p>
          )}
        </div>

        {/* App logo when not editing */}
        {!isEditOn && (
          <div className="px-4 pb-4">
            <img src={appLogo} alt={appName} className="h-6" />
          </div>
        )}
      </div>

      {/* Bottom section */}
      <div className="bot-side flex justify-between p-4">
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
      </div>
    </div>
  );
}