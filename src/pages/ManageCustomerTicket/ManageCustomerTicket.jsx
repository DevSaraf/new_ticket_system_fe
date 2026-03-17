import React, { useEffect, useState } from "react";
import { API_BASE_URL } from '../../config';

function ManageCustomerTicket() {
  const [tickets, setTickets] = useState([]); // State to store tickets
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to manage errors
  const [actionMessage, setActionMessage] = useState(""); // State to show success messages

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [approveTicketId, setApproveTicketId] = useState(null);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      const response = await fetch(
        "`${API_BASE_URL}/api/manager/pending-tickets`",
        {
          method: "GET",
          headers: {
            Authorization: token, // Add token to Authorization header
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch tickets");
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

  const handleAction = async (ticketId, action) => {
    try {
      setActionMessage("");
      setError(null);

      const token = localStorage.getItem("token");

      const bodyData =
        action === "approve"
          ? { action: "approve" }
          : {
              action: "reject",
              rejection_reason: rejectionReason,
            };

      const response = await fetch(
        `${API_BASE_URL}/api/manager/ticket/${ticketId}/approve`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(bodyData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Action failed");
      }

      setActionMessage(data.message);
      fetchTickets();

      // Close modal after success
      setShowRejectModal(false);
      setRejectionReason("");
      setSelectedTicketId(null);
      if (action === "approve") {
  setShowApproveModal(false);
  setApproveTicketId(null);
}
    } catch (err) {
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
          <h1 className="h4 mb-0 text-gray-800">Pending Tickets</h1>
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
                  <th>Email ID</th>
                  <th>Phone Number</th>
                  <th>Role</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Approval Status</th>
                  <th>Created At</th>
                  <th style={{width:"195px"}}>Actions</th>
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
                      <a
                          href={`/view-manager-ticket/${ticket.id}`}
                          className="btn btn-link mr-2"
                        >
                          <i data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="View Ticket" className="fas fa-eye"></i>
                        </a>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => {
                          setApproveTicketId(ticket.id);
                          setShowApproveModal(true);
                        }}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          setSelectedTicketId(ticket.id);
                          setShowRejectModal(true);
                        }}
                      >
                        Reject
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
        <p className="text-center">No pending tickets available.</p>
      )}
      {showRejectModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Reject Ticket</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowRejectModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Rejection Reason</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Enter rejection reason"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowRejectModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  disabled={!rejectionReason.trim()}
                  onClick={() => handleAction(selectedTicketId, "reject")}
                >
                  Reject Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showApproveModal && (
  <div className="modal fade show d-block" tabIndex="-1">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title text-success">
            Confirm Ticket Approval
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowApproveModal(false)}
          ></button>
        </div>

        <div className="modal-body">
          <p>
            Are you sure you want to <strong>approve</strong> this ticket?
          </p>
          <p className="text-muted mb-0">
            Once approved, the ticket will be sent to customer.
          </p>
        </div>

        <div className="modal-footer">
          <button
            className="btn btn-secondary"
            onClick={() => setShowApproveModal(false)}
          >
            Cancel
          </button>
          <button
            className="btn btn-success"
            onClick={() => handleAction(approveTicketId, "approve")}
          >
            Yes, Approve
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default ManageCustomerTicket;
