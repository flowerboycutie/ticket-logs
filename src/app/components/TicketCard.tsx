interface TicketCrdProps {
    subject: string;
    status: "Pending" | "In Progress" | "Resolved";
    ticketId: string;
    details: string;
    priority: "Low" | "Medium" | "High";
    date: string;
    app: string;
}

export default function TicketCard({ subject, status, ticketId, details, priority, date, app, }: TicketCrdProps) {
    const truncDetails = details.length > 150 ? details.substring(0, 150) + "..." : details;

    const statusColors = {
        "Pending": "bg-yellow-500",
        "In Progress": "bg-blue-500",
        "Resolved": "bg-green-500",
    };

    const priorityColors = {
        "Low": "bg-green-500",
        "Medium": "bg-yellow-500",
        "High": "bg-red-500",
    };

    return (
     <div className="ticket-card-container bg-red-100">
        test card

     </div>
    )
}

