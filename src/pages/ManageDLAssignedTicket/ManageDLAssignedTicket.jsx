import React, { useEffect, useState } from "react";
import { API_BASE_URL } from '../../config';

function ManageDLAssignedTicket() {
  const [tickets, setTickets] = useState([]); // State to store tickets
  const [agents, setAgents] = useState([]); // State to store agents
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to manage errors
  const [actionMessage, setActionMessage] = useState(""); // State to show success messages

  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [commentSubject, setCommentSubject] = useState("");
  const [commentText, setCommentText] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);

  /* ================= FETCH TICKETS ================= */
  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

      const response = await fetch(
        "`${API_BASE_URL}/api/delivery-lead/dl-team-tickets`",
        {
          method: "GET",
          headers: {
            Authorization: token, // Correctly format the Authorization header
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch tickets");
      }

      const data = await response.json();
      setTickets(Array.isArray(data) ? data : []); // Ensure data is an array
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  const submitComment = async () => {
    if (!commentSubject || !commentText) {
      alert("Subject and comment are required");
      return;
    }

    try {
      setCommentLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_BASE_URL}/api/delivery-lead/tickets/${selectedTicketId}/dl-comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            subject: commentSubject,
            comment: commentText,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add comment");
      }

      const data = await response.json();
      alert(data.message);

      // Reset form
      setCommentSubject("");
      setCommentText("");
      setSelectedTicketId(null);

      // Close modal
      document.querySelector("#commentTicket .btn-secondary")?.click();
    } catch (error) {
      console.error(error);
      alert("Error adding comment");
    } finally {
      setCommentLoading(false);
    }
  };

  /* ================= ON LOAD ================= */
  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center mb-4">
        <h1 className="h4 mb-0 text-gray-800">Assigned Ticket</h1>
      </div>

      {/* Success or Error Messages */}
      {actionMessage && <p className="text-success">{actionMessage}</p>}
      {error && <p className="text-danger">Error: {error}</p>}
      {loading && <p>Loading tickets...</p>}

      {/* Tickets Table */}
      {!loading && !error && tickets.length > 0 && (
        <div className="card card-form p-4 mb-4 shadow">
          <div className="responsive-table">
            <table className="action-table table table-border table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Requester Name</th>
                  <th>Email ID</th>
                  <th>Phone Number</th>
                  <th>Role</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Approval</th>
                  <th>Created Date</th>
                  <th>Approved By</th>
                  <th>Assign To</th>
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
                    <td>{ticket.approved_by_email || "N/A"}</td>
                    <td>{ticket.assignee_name}</td>

                    <td>
                      <div className="action-div">
                        <a
                          href={`/view-delivery-lead-ticket/${ticket.id}`}
                          className="btn btn-link mr-2"
                        >
                          <i
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            className="fas fa-eye"
                            title="View Ticket"
                          ></i>
                        </a>
                        <a
                          href={`/edit-delivery-lead-ticket/${ticket.id}`}
                          className="btn btn-link mr-2"
                        >
                          <i
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            className="fas fa-edit"
                            title="Edit Ticket"
                          ></i>
                        </a>
                        <a
                          className="btn btn-link"
                          data-bs-toggle="modal"
                          data-bs-target="#commentTicket"
                          onClick={() => setSelectedTicketId(ticket.id)}
                        >
                          <i
                            className="fas fa-comment"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Comment"
                          ></i>
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            className="modal fade"
            id="commentTicket"
            tabIndex="-1"
            aria-labelledby="commentTicketLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="commentTicketLabel">
                    Add Comment
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="mb-3">
                    <label>Subject</label>
                    <input
                      type="text"
                      className="form-control"
                      value={commentSubject}
                      onChange={(e) => setCommentSubject(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Comment</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Add your comment..."
                    ></textarea>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={submitComment}
                    disabled={commentLoading}
                  >
                    {commentLoading ? "Saving..." : "Save Comment"}
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* No Tickets Found */}
      {!loading && !error && tickets.length === 0 && (
        <p className="text-center">No tickets found.</p>
      )}
    </div>
  );
}

export default ManageDLAssignedTicket;
