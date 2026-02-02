interface TicketCardProps {
  subject: string;
  status: "Pending" | "In Progress" | "Resolved";
  ticketId: string;
  details: string;
  priority: "Low" | "Medium" | "High";
  lastUpdated: string;
  app: string;
}

export default function TicketCard({
  subject,
  status,
  ticketId,
  details,
  priority,
  lastUpdated,
  app,
}: TicketCardProps) {
  const truncDetails =
    details.length > 150 ? details.substring(0, 150) + "..." : details;

  const statusColors = {
    Pending: "bg-yellow-500",
    "In Progress": "bg-blue-500",
    Resolved: "bg-green-500",
  };

  const priorityColors = {
    Low: "text-green-500",
    Medium: "text-yellow-500",
    High: "text-red-500",
  };

  return (
    <div className="ticket-card-container bg-white text-gray-500 px-4 py-8 rounded-lg flex flex-col gap-4 shadow">
      <div className="flex items justify-between gap-4 items-center">
        <h3 className="text-xl semi-bold text-gray-700">{subject}</h3>
        <span className="whitespace-nowrap rounded-full flex items-center border h-full px-2 py-1 text-gray-500">
          <span
            className={`inline-block w-2 h-2 bg-current rounded-full mr-1.5 ${statusColors[status]}`}
          ></span>
          <span className="text-gray-700">{status}</span>
        </span>
      </div>

      <p>{ticketId}</p>

      <p>{truncDetails}</p>

      <div className="flex justify-between">
        <span className={`${priorityColors[priority]}`}>{priority}</span>
        <span>{lastUpdated}</span>
      </div>

      <p>{app}</p>
    </div>
  );
}
