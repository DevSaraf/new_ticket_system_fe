import React, { useEffect, useState } from "react";
import { API_BASE_URL } from '../../config';
import { Tooltip } from "bootstrap";

function ListCustomerTicket() {
  // 🔹 NEW: state instead of staticData
  const [tickets, setTickets] = useState([]);
  const [activeTicketId, setActiveTicketId] = useState(null);

  const [commentSubject, setCommentSubject] = useState("");
  const [commentText, setCommentText] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);

 


  const [filters, setFilters] = useState({
    status: "All",
    priority: "All",
    dateRange: "All",
  });
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const [selectedTicketId, setSelectedTicketId] = useState(null);


  const calculateTicketAgeHours = (createdAt) => {
  const createdDate = new Date(createdAt);
  const now = new Date();

  const diffMs = now - createdDate;
  const diffHours = diffMs / (1000 * 60 * 60);

  return diffHours.toFixed(1); // 1 decimal
};

  const handleView = (ticketId) => {
    console.log(`View ticket: ${ticketId}`);
  };

  const handleEdit = (ticketId) => {
    console.log(`Edit ticket: ${ticketId}`);
  };

  const handleComment = async (ticketId) => {
    setActiveTicketId(ticketId);
    setNewComment("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_BASE_URL}/api/customer/ticket/${ticketId}/comments`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const data = await response.json();
      setComments(data || []);
    } catch (error) {
      console.error("Failed to fetch comments", error);
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
        `${API_BASE_URL}/api/customer/tickets/${selectedTicketId}/customer-comment`,
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

  // 🔹 NEW: Fetch tickets from API
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "`${API_BASE_URL}/api/customer/tickets`",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        const data = await response.json();
        setTickets(data);
      } catch (error) {
        console.error("Failed to fetch tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  // Tooltip init (UNCHANGED)
  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new Tooltip(tooltipTriggerEl);
    });
  }, [tickets]);

  const filteredTickets = tickets.filter((ticket) => {
    if (filters.status !== "All" && ticket.status !== filters.status) {
      return false;
    }

    if (filters.priority !== "All" && ticket.priority !== filters.priority) {
      return false;
    }

    if (filters.dateRange !== "All") {
      const days = parseInt(filters.dateRange, 10);
      const createdAt = new Date(ticket.created_at);
      const now = new Date();
      const diffDays = (now - createdAt) / (1000 * 60 * 60 * 24);

      if (diffDays > days) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center mb-4 row">
        <div className="col-12">
          <h1 className="h4 mb-0 text-gray-800 ">List Customer Ticket</h1>
        </div>
      </div>

      {/* FILTER CARD — unchanged */}
      <div className="card p-4 mb-4 shadow">
        <div className="row">
          <div className="col-md-3">
            <label className="line-label">Status</label>
            <select
              name="status"
              className="form-control line-field form-select"
              onChange={handleFilterChange}
            >
              <option>All</option>
              <option>Unassigned</option>
              <option>Open</option>
              <option>Assigned</option>
              <option>Requirements </option>
              <option>Development</option>
              <option>Internal Testing</option>
              <option>UAT</option>
              <option>Waiting for Customer</option>
              <option>Resolved</option>
              <option>Closed</option>
            </select>
          </div>

          <div className="col-md-3">
            <label className="line-label">Priority</label>
            <select
              name="priority"
              className="form-control line-field form-select"
              onChange={handleFilterChange}
            >
              <option value="">All</option>
                      <option value={1}>L1</option>
                      <option value={2}>L2</option>
                      <option value={3}>L3</option>
                      <option value={4}>L4</option>
                      <option value={5}>L5</option>
            </select>
          </div>

          <div className="col-md-3">
            <label className="line-label">Date Range</label>
            <select
              name="dateRange"
              className="form-control line-field form-select"
              onChange={handleFilterChange}
            >
              <option value="All">All</option>
              <option>1 day</option>
              <option>7 days</option>
            </select>
          </div>
        </div>
      </div>

      {/* TABLE — unchanged UI */}
      <div className="card card-form p-4 mb-4 shadow">
        <div className="responsive-table">
          <table className="action-table table table-border table-sm">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Title</th>
                <th>Approval Status</th>
                <th>SLA</th>
                <th>Ticket Age(hrs)</th>
                <th>Ticket Owner</th>
                <th>Assignee</th>
                <th>Date Created</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {tickets.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center">
                    No tickets found
                  </td>
                </tr>
              ) : (
                filteredTickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td>{ticket.id}</td>
                    <td>{ticket.subject}</td>
                    <td>
  <span
    className={`badge ${
      ticket.approval_status === "Approved"
        ? "bg-success"
        : ticket.approval_status === "Rejected"
        ? "bg-danger"
        : "bg-warning"
    }`}
    style={{
      padding: "6px 10px",
      borderRadius: "20px",
      color: "#fff",
      fontSize: "12px"
    }}
  >
    {ticket.approval_status}
  </span>
</td>

                    <td>
                      {ticket.sla_hours ? `${ticket.sla_hours} hrs` : "—"}
                    </td>
                    <td>
  {(() => {
    const age = calculateTicketAgeHours(ticket.created_at);
    const slaBreached =
      ticket.sla_hours && age > ticket.sla_hours;

    return (
      <span
        style={{
          padding: "6px 10px",
          borderRadius: "8px",
          fontWeight: "600",
          backgroundColor: slaBreached ? "#dc3545" : "#e9ecef",
          color: slaBreached ? "#fff" : "#000"
        }}
      >
        {age}
      </span>
    );
  })()}
</td>
                    <td>You</td>
                    <td>{ticket.assignee_name || "Unassigned"}</td>
                    <td>{new Date(ticket.created_at).toLocaleDateString()}</td>
                    <td>{ticket.status}</td>
                    <td>{ticket?.priority ? `L${ticket.priority}` : ""}</td>
                    <td>
                      <div className="action-div">
                        <a
                          href={`/view-customer-ticket/${ticket.id}`}
                          className="btn btn-link mr-2"
                        >
                          <i
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="View Ticket"
                            className="fas fa-eye"
                          ></i>
                        </a>

                        <a
                          href={`/edit-customer-profile/${ticket.id}`}
                          className="btn btn-link mr-2"
                        >
                          <i
                            className="fas fa-edit"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
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
                ))
              )}
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
     
    </div>
  );
}

export default ListCustomerTicket;
