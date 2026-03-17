import React, { useEffect, useState } from "react";
import { API_BASE_URL } from '../../config';

function ManageAgentUnassignedTicket() {
  const [tickets, setTickets] = useState([]); // State to store tickets
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to manage errors
  const [actionMessage, setActionMessage] = useState(""); // State to show success messages

  // Fetch unassigned tickets from API
  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      const response = await fetch(
        "`${API_BASE_URL}/api/agent/unassigned-tickets`",
        {
          method: "GET",
          headers: {
            Authorization: token, // Add token to Authorization header
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch unassigned tickets");
      }

      const data = await response.json();
      setTickets(data); // Update state with fetched tickets
    } catch (err) {
      console.error("Error fetching tickets:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Assign ticket to the agent
  const assignTicketToSelf = async (ticketId) => {
    try {
      setActionMessage(""); // Clear previous messages
      const token = localStorage.getItem("token"); // Retrieve token from localStorage

      const response = await fetch(
        `${API_BASE_URL}/api/agent/pick/${ticketId}`,
        {
          method: "POST",
          headers: {
            Authorization: token, // Add token to Authorization header
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to assign ticket");
      }

      setActionMessage(data.message || "Ticket assigned to you");
      fetchTickets(); // Refresh the ticket list
    } catch (err) {
      console.error("Error assigning ticket:", err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchTickets(); // Fetch tickets on component mount
  }, []);

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center mb-4 row">
        <div className="col-12">
          <h1 className="h4 mb-0 text-gray-800">Unassigned Tickets</h1>
        </div>
      </div>

      {/* Show success or error messages */}
      {actionMessage && <p className="text-success">{actionMessage}</p>}
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
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Approval Status</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td>{ticket.id}</td>
                    <td>{ticket.requester}</td>
                    <td>{ticket.contact_email}</td>
                    <td>{ticket.contact_phone}</td>
                    <td style={{textTransform:"capitalize"}}>
                      {ticket.requester_type === "normal"
                        ? "Consultant"
                        : ticket.requester_type}
                    </td>
                    <td>{ticket.subject}</td>
                    <td>{ticket.status}</td>
                    <td>{ticket?.priority ? `L${ticket.priority}` : ""}</td>
                    <td>{ticket.approval_status}</td>
                    <td>{new Date(ticket.created_at).toLocaleString()}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => assignTicketToSelf(ticket.id)}
                      >
                        Assign to Me
                      </button>
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
        <p className="text-center">No unassigned tickets available.</p>
      )}
    </div>
  );
}

export default ManageAgentUnassignedTicket;
