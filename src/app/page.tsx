"use client";

import { useState } from "react";
import Header from "./components/Header";
import TicketCard from "./components/TicketCard";
import TicketCardDesktop from "./components/TicketCardDesktop";

const initialTickets = [
  {
    subject: "Login button not working",
    status: "Pending" as const,
    ticketId: "TKT-001",
    details:
      "The login button on the main page is unresponsive on mobile browsers. Tested on Safari and Chrome. Users are unable to access their accounts.",
    priority: "High" as const,
    lastUpdated: "May 20, 2024",
    appLogo: "/paraverse-apps/logo-briefcase.svg",
    appName: "Briefcase",
  },
  {
    subject: "Internet problem",
    status: "Resolved" as const,
    ticketId: "TKT-201",
    details:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia pariatur tenetur dolorem aspernatur odio inventore magnam? Molestiae, nihil. Facilis, deserunt. Accusamus quae tenetur dolorem expedita corrupti saepe possimus iusto itaque?",
    priority: "Medium" as const,
    lastUpdated: "May 30, 2023",
    appLogo: "/paraverse-apps/logo-eventually.svg",
    appName: "Eventually",
  },
  {
    subject: "Button not showing up bwaahaha Button not showing up bwaahah",
    status: "In Progress" as const,
    ticketId: "TKT-651",
    details:
      "Lorem loreaasdkahaknah ofns hnaoijdoijad pqishad jadoah ipsum dolor sit amet consectetur adipisicing elit. Quia pariatur tenetur dolorem aspernatur odio inventore magnam? Molestiae, nihil. Facilis, deserunt. Accusamus quae tenetur dolorem expedita corrupti saepe possimus iusto itaque?",
    priority: "Low" as const,
    lastUpdated: "May 30, 2023",
    appLogo: "/paraverse-apps/logo-mflix.svg",
    appName: "M-Flix",
  },
];

export default function Home() {
  // Move tickets into state so we can modify it
  const [tickets, setTickets] = useState(initialTickets);

  // Delete function - filters out the ticket with matching ID
  const handleDeleteTicket = (ticketId: string) => {
    setTickets(tickets.filter((ticket) => ticket.ticketId !== ticketId));
  };

  return (
    <div className="min-h-screen flex flex-col tracking-widest">
      <Header />
      <main className="p-4 text-black flex flex-col flex-1 gap-8 mt-16">
        <div className="fixed top-16 left-0 right-0 p-4 h-32 lg:hidden z-90 backdrop-blur">
          <header className="main-container-header flex flex-col h-full justify-between">
            <div className="search-container overflow-hidden flex border border-[#cccccc] rounded-lg">
              <input
                type="text"
                placeholder="Filter by keyword..."
                className="search py-2 px-3 w-full flex-1 bg-gray-100"
              />
              <button className="bg-(--green) px-2 text-white">Search</button>
            </div>
            <div className="add-ticket-btn">
              <button className="bg-(--green) text-white w-full px-3 py-2 rounded-lg">
                + Add Ticket
              </button>
            </div>
          </header>
        </div>

        {/* Mobile view */}
        <div className="tickets-card-container lg:hidden flex flex-col gap-4 mt-24 pt-8">
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket.ticketId}
              subject={ticket.subject}
              status={ticket.status}
              ticketId={ticket.ticketId}
              details={ticket.details}
              priority={ticket.priority}
              lastUpdated={ticket.lastUpdated}
              appLogo={ticket.appLogo}
              appName={ticket.appName}
              onDelete={handleDeleteTicket}
            />
          ))}
        </div>

        {/* Desktop view */}
        <div className="hidden lg:flex pt-8 flex-col gap-6 px-50">
          {tickets.map((ticket) => (
            <TicketCardDesktop
              key={ticket.ticketId}
              subject={ticket.subject}
              status={ticket.status}
              ticketId={ticket.ticketId}
              details={ticket.details}
              priority={ticket.priority}
              lastUpdated={ticket.lastUpdated}
              appLogo={ticket.appLogo}
              appName={ticket.appName}
              onDelete={handleDeleteTicket}
            />
          ))}
        </div>
      </main>
      <footer className="h-8 bottom-0 left-0 right-0 flex items-center bg-(--green) px-4">
        footer
      </footer>
    </div>
  );
}