import React, { useEffect, useState } from "react";
import { API_BASE_URL } from '../../config';

function RejectedTicketListByManager() {
  const [tickets, setTickets] = useState([]); // State to store tickets
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to manage errors

  // Fetch tickets from API
  const fetchRejectedTickets = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      const response = await fetch(`${API_BASE_URL}/api/manager/tickets/rejected`, {
        method: "GET",
        headers: {
          Authorization: token, // Add token to Authorization header
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch Rejected Tickets");
      }

      const data = await response.json();
      setTickets(data); 
    } catch (err) {
      console.error("Error fetching Rejected Tickets:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRejectedTickets(); // Fetch Rejected Tickets on component mount
  }, []);

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center mb-4 row">
        <div className="col-12">
          <h1 className="h4 mb-0 text-gray-800">Rejected Tickets</h1>
        </div>
      </div>

      {/* Show success or error messages */}
      {error && <p className="text-danger">Error: {error}</p>}

      {/* Show loading spinner */}
      {loading && <p>Loading tickets...</p>}

      {/* Show tickets table */}
      {!loading && !error && tickets.length > 0 && (
        <div className="card card-form p-4 mb-4 shadow">
          <div className="responsive-table">
             <table className="action-table table table-border table-sm">
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Requester Name</th>
                  <th>Email ID</th>
                  <th>Role</th>
                  <th>Subject</th>
                  <th>Category</th>
                  <th>Priority</th>
                  <th>Status</th>                  
                  <th>Created At</th>
                  <th>Approval Status</th>

                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td>{ticket.id}</td>
                    <td>{ticket.customer_name}</td>
                    <td>{ticket.customer_email}</td>
                    <td style={{textTransform:"capitalize"}}>
                      {ticket.requester_type === "normal"
                        ? "Consultant"
                        : ticket.requester_type}
                    </td>
                    <td>{ticket.subject}</td>
                    <td>{ticket.category}</td>
                    <td>{ticket?.priority ? `L${ticket.priority}` : ""}</td>
                    <td>{ticket.status}</td>  
                    <td>{new Date(ticket.created_at).toLocaleString()}</td>
                    <td>
                      <span className="badge bg-success">
                        {ticket.approval_status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Show message if no tickets are available */}
      {!loading && !error && tickets.length === 0 && (
        <p className="text-center">No rejected tickets found.</p>
      )}
    </div>
  );
}

export default RejectedTicketListByManager;