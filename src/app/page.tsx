import TicketCard from "./components/TicketCard";
import TicketTable from "./components/TicketTable";

const tickets = [
  {
    subject: "Login button not working",
    status: "Pending" as const,
    ticketId: "TKT-001",
    details:
      "The login button on the main page is unresponsive on mobile browsers. Tested on Safari and Chrome. Users are unable to access their accounts.",
    priority: "High" as const,
    lastUpdated: "May 20, 2024",
    app: "/login",
  },

  {
    subject: "Internet problem",
    status: "Resolved" as const,
    ticketId: "TKT-201",
    details:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia pariatur tenetur dolorem aspernatur odio inventore magnam? Molestiae, nihil. Facilis, deserunt. Accusamus quae tenetur dolorem expedita corrupti saepe possimus iusto itaque?",
    priority: "Medium" as const,
    lastUpdated: "May 30, 2023",
    app: "/basta",
  },

  {
    subject: "Button not showing up bwaahaha",
    status: "In Progress" as const,
    ticketId: "TKT-651",
    details:
      "Lorem loreaasdkahaknah ofns hnaoijdoijad pqishad jadoah ipsum dolor sit amet consectetur adipisicing elit. Quia pariatur tenetur dolorem aspernatur odio inventore magnam? Molestiae, nihil. Facilis, deserunt. Accusamus quae tenetur dolorem expedita corrupti saepe possimus iusto itaque?",
    priority: "Medium" as const,
    lastUpdated: "May 30, 2023",
    app: "/basta",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col tracking-widest">
      <header className="bg-green-500 text-3xl top-0 right-0 left-0 flex items-center px-4 py-2 fixed h-16">
        header
      </header>
      <main className="p-4 text-black bg-gray-100 flex flex-col flex-1 gap-8 mt-16">
        <div className="shadow">
          <header className="main-container-header flex flex-col gap-2 h-24">
            <div className="search-container overflow-hidden flex border border-[#cccccc] rounded-lg">
              <input
                type="text"
                placeholder="Filter by keyword..."
                className="search rounded-lg py-2 px-3 w-full flex-1"
              />
              <button className="bg-green-500 px-2 text-white">Search</button>
            </div>
            <div className="add-ticket-btn">
              <button className="bg-green-500 text-white w-full px-3 py-2 rounded-lg">
                + Add Ticket
              </button>
            </div>
          </header>
        </div>
        <div className="tickets-card-container lg:hidden flex flex-col gap-4">
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket.ticketId}
              subject={ticket.subject}
              status={ticket.status}
              ticketId={ticket.ticketId}
              details={ticket.details}
              priority={ticket.priority}
              lastUpdated={ticket.lastUpdated}
              app={ticket.app}
            />
          ))}
        </div>
        <div className="hidden lg:block">
          <TicketTable tickets={tickets} />
        </div>
      </main>
      <footer className="h-8 bottom-0 left-0 right-0 flex items-center bg-green-500 px-4">
        footer
      </footer>
    </div>
  );
}
