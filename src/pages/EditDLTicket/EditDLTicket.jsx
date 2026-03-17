import React, { useEffect, useState } from "react";
import { API_BASE_URL } from '../../config';
import { useParams, useNavigate } from "react-router-dom";

function EditDLTicket() {
  const { ticketId } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState({
    status: "",
    waiting_for_customer: false,
  });
  const [comments, setComments] = useState([]);
  const [attachments, setAttachments] = useState([]);

  const STATUS_FLOW = [
    "Unassigned",
    "Open",
    "Assigned",
    "Requirements",
    "Development",
    "Internal Testing",
    "UAT",
    "Resolved",
    "Closed",
  ];

  const getNextStatus = (currentStatus) => {
    const index = STATUS_FLOW.indexOf(currentStatus);
    if (index === -1 || index === STATUS_FLOW.length - 1) return null;
    return STATUS_FLOW[index + 1];
  };

  const handleWaitingCustomerChange = (e) => {
    const checked = e.target.checked;

    setTicket((prev) => ({
      ...prev,
      waiting_for_customer: checked,
      // status: checked ? "Waiting for Customer" : prev.status
    }));
  };

  const isWaitingLocked = ticket.waiting_for_customer === true;
const loggedInAgentType = localStorage.getItem("agent_type");

const canEditRcaResolution =
  ticket.requester_type === loggedInAgentType;


console.log({
  agentType: loggedInAgentType,
  requesterType: ticket.requester_type,
  canEditRcaResolution,
});


  // 🔹 Fetch ticket details
  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `${API_BASE_URL}/api/delivery-lead/ticket/${ticketId}`,
          {
            headers: { Authorization: token },
          }
        );

        const data = await res.json();
        setTicket(data.ticket || {});
        setComments(data.comments || []);
        setAttachments(data.attachments || []);
      } catch (err) {
        console.error("Failed to fetch ticket", err);
      }
    };

    fetchTicket();
  }, [ticketId]);

  // 🔹 Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Calculate due date from SLA
  const calculateDueDate = () => {
    if (!ticket.created_at || !ticket.sla_hours) return "";
    const created = new Date(ticket.created_at);
    const due = new Date(
      created.getTime() + Number(ticket.sla_hours) * 60 * 60 * 1000
    );
    return due.toLocaleString();
  };

  // 🔹 Update ticket
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      const payload = {
  status: ticket.status,
  waiting_for_customer: ticket.waiting_for_customer,
};

if (canEditRcaResolution) {
  payload.rca = ticket.rca;
  payload.resolution = ticket.resolution;
}

      const res = await fetch(
        `${API_BASE_URL}/api/delivery-lead/updateTicket/${ticketId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to update ticket");
        return;
      }

      alert("Ticket updated successfully");
      navigate("/delivery-lead-ticket");
    } catch (err) {
      console.error("Update failed", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center mb-4">
        <h1 className="h4 mb-0 text-gray-800">Edit Ticket</h1>
      </div>

      <div id="accordion">
        {/* Ticket Information */}
        <div className="card mb-4">
          <div className="card-header" id="headingOne">
            <h5 className="mb-0">
              <button
                className="btn btn-link btn-collapse"
                data-toggle="collapse"
                data-target="#collapseOne1"
              >
                Ticket Information
              </button>
            </h5>
          </div>

          <div id="collapseOne" className="collapse show">
            <div className="card-body">
              <div className="row">
                <div className="col-md-3">
                  <label className="line-label">
                    Ticket ID <em>*</em>
                  </label>
                  <input
                    className="form-control line-field"
                    value={ticket.id || ""}
                    readOnly
                  />
                </div>

                <div className="col-md-3">
                  <label className="line-label">
                    Requester Name <em>*</em>
                  </label>
                  <input
                    className="form-control line-field"
                    value={ticket.requester || ""}
                    readOnly
                  />
                </div>

                <div className="col-md-3">
                  <label className="line-label">Account Name</label>
                  <input
                    className="form-control line-field"
                    value={ticket.account_name || ""}
                    readOnly
                  />
                </div>
                <div className="col-md-3">
                  <label className="line-label">Email ID</label>
                  <input
                    className="form-control line-field"
                    value={ticket.requester_email || ""}
                    readOnly
                  />
                </div>

                <div className="col-md-3">
                  <label className="line-label">Phone Number</label>
                  <input
                    className="form-control line-field"
                    value={ticket.contact_phone || ""}
                    readOnly
                  />
                </div>

                <div className="col-md-3">
                  <label for="issue-select" className="line-label">
                    Category <em>*</em>
                  </label>
                  <select
                    className="form-control line-field form-select"
                    value={ticket?.category || ""}
                    disabled
                  >
                    <option value="">--Select--</option>
                    {ticket?.category && (
                      <option value={ticket.category}>{ticket.category}</option>
                    )}
                  </select>
                </div>
                <div className="col-md-3">
                  <label for="issue-select" className="line-label">
                    Sub-Category <em>*</em>
                  </label>
                  <select
                    className="form-control line-field form-select"
                    value={ticket?.sub_category || ""}
                    disabled
                  >
                    <option value="">--Select--</option>
                    {ticket?.sub_category && (
                      <option value={ticket.sub_category}>
                        {ticket.sub_category}
                      </option>
                    )}
                  </select>
                </div>
                <div className="col-md-3">
                  <label for="issue-select" className="line-label">
                    Type <em>*</em>
                  </label>
                  <select
                    className="form-control line-field form-select"
                    value={ticket?.type || ""}
                    disabled
                  >
                    <option value="">--Select--</option>
                    {ticket?.type && (
                      <option value={ticket.type}>{ticket.type}</option>
                    )}
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="line-label">
                    Priority <em>*</em>
                  </label>
                  <select
                    className="form-control line-field form-select"
                    value={ticket?.priority || ""}
                    disabled
                  >
                    <option value="">--Select--</option>
                    <option value={1}>L1</option>
                    <option value={2}>L2</option>
                    <option value={3}>L3</option>
                    <option value={4}>L4</option>
                    <option value={5}>L5</option>
                  </select>
                </div>

                <div className="col-md-3">
                  <label for="issue-select" className="line-label">
                    Environment <em>*</em>
                  </label>
                  <select
                    className="form-control line-field form-select"
                    value={ticket?.environment || ""}
                    disabled
                  >
                    <option value="">--Select--</option>
                    {ticket?.environment && (
                      <option value={ticket.environment}>
                        {ticket.environment}
                      </option>
                    )}
                  </select>
                </div>

                <div className="col-md-3">
                  <label className="line-label">Status</label>

                  <select
                    name="status"
                    className="form-control line-field form-select"
                    value={ticket.status || ""}
                    onChange={handleChange}
                    disabled={isWaitingLocked}
                  >
                    {ticket.status && (
                      <option value={ticket.status}>{ticket.status}</option>
                    )}

                    {!isWaitingLocked && getNextStatus(ticket.status) && (
                      <option value={getNextStatus(ticket.status)}>
                        {getNextStatus(ticket.status)}
                      </option>
                    )}
                  </select>
                </div>

                <div className="col-md-3 d-flex align-items-center mt-4">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="waitingCustomer"
                      checked={ticket.waiting_for_customer || false}
                      onChange={handleWaitingCustomerChange}
                      disabled={ticket.status === "Closed"}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="waitingCustomer"
                    >
                      Waiting for Customer
                    </label>
                  </div>
                </div>

                <div className="col-md-3">
                  <label className="line-label">Assignee</label>
                  <input
                    type="text"
                    className="form-control line-field"
                    value={ticket?.assignee_name || ""}
                    readOnly
                  />
                </div>
                <div className="col-md-3">
                  <label className="line-label">Target Date</label>
                  <input
                    className="form-control line-field"
                    value={calculateDueDate()}
                    readOnly
                  />
                </div>
                <div className="col-md-12">
                  <label className="line-label">
                    Subject <em>*</em>
                  </label>
                  <input
                    type="text"
                    className="form-control line-field"
                    value={ticket?.subject || ""}
                    readOnly
                  />
                </div>
                <div className="col-md-12">
                  <label className="line-label">
                    Description <em>*</em>
                  </label>
                  <input
                    type="text"
                    className="form-control line-field"
                    value={ticket?.description || ""}
                    readOnly
                  />
                </div>
               <div className="col-md-12">
  <label className="line-label">RCA</label>
  <input
  name="rca"
  className="form-control line-field"
  value={ticket.rca || ""}
  onChange={handleChange}
  disabled={!canEditRcaResolution}
/>
  {!canEditRcaResolution && (
    <small className="text-muted" style={{marginTop:"-6px", display:"block"}}>
      You can edit RCA only for tickets created by you
    </small>
  )}
</div>

<div className="col-md-12">
  <label className="line-label">Resolution</label>
  <input
  name="resolution"
  className="form-control line-field"
  value={ticket.resolution || ""}
  onChange={handleChange}
  disabled={!canEditRcaResolution}
/>
  {!canEditRcaResolution && (
    <small className="text-muted" style={{marginTop:"-6px", display:"block"}}>
      You can edit Resolution only for tickets created by you
    </small>
  )}
</div>


               
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        {/* <div className="card mb-4">
          <div className="card-header" id="headingTwo">
            <h5 className="mb-0">
              <button
                className="btn btn-link btn-collapse"
                data-toggle="collapse"
                data-target="#collapseTwo1"
              >
                Additional Information
              </button>
            </h5>
          </div>

          <div id="collapseTwo" className="collapse show">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <label className="line-label">Attachments</label>
                  <p>No Attachments.</p>
                </div>

                <div className="col-md-12">
                  <label className="line-label">Comments</label>

                  {comments.length === 0 && (
                    <p className="text-muted">No comments.</p>
                  )}

                  {comments.map((comment) => (
                    <div key={comment.id} className="comment-box mt-3 p-3 shadow-sm rounded">
                      <div className="d-flex justify-content-between">
                        <strong>{comment.commented_by_name} <span className="badge bg-secondary mr-2">
                          {comment.commented_role}
                        </span></strong>{" "}
                        
                        <small className="text-muted">
                          {new Date(comment.created_at).toLocaleString()}
                        </small>
                      </div>
                      <div className="mt-1">
                        <p className="mb-0">{comment.comment_text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <div className="text-right mb-4">
          <button
            className="btn btn-primary btn-sm mr-2"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigate("/list-customer-ticket")}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditDLTicket;
