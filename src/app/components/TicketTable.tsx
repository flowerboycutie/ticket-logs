interface Ticket {
  subject: string;
  status: "Pending" | "In Progress" | "Resolved";
  ticketId: string;
  details: string;
  priority: "Low" | "Medium" | "High";
  lastUpdated: string;
  app: string;
}

interface TicketTableProps {
  tickets: Ticket[];
}

export default function TicketTable({ tickets }: TicketTableProps) {
  const truncDetails = (details: string) =>
    details.length > 20 ? details.substring(0, 20) + "..." : details;

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
    <div className="rounded shadow p-4 pb-0">
      <table className="w-full text-left">
        <thead className="">
          <tr className="uppercase text-xs">
            <th className="py-3">Ticket ID</th>
            <th className="py-3">Subject</th>
            <th className="py-3">Details</th>
            <th className="py-3">Status</th>
            <th className="py-3">Priority</th>
            <th className="py-3">Last Updated</th>
            <th className="py-3">App</th>
          </tr>
        </thead>
        <tbody className="">
          {tickets.map((ticket) => (
            <tr>
              <td className="py-8">{ticket.ticketId}</td>
              <td className="ticket-subject py-8 font-bold">{ticket.subject}</td>
              <td className="py-8">{truncDetails(ticket.details)}</td>
              <td className="py-8">
                <span className="text-nowrap">
                  <span
                    className={`inline-block rounded-full w-2 h-2 mr-2 ${statusColors[ticket.status]}`}
                    style={{ backgroundColor: statusColors[ticket.status] }}
                  ></span>
                  {ticket.status}
                </span>
              </td>
              <td className={`py-8 ${priorityColors[ticket.priority]}`}>{ticket.priority}</td>
              <td className="py-8">{ticket.lastUpdated}</td>
              <td className="py-8">{ticket.app}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
