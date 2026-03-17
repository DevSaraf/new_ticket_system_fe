import React from "react";
import { API_BASE_URL } from '../../config';
import { Tooltip } from "bootstrap";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function ViewDLTicket() {
  const calculateDueDate = (createdAt, slaHours) => {
    if (!createdAt || !slaHours) return "";

    const createdDate = new Date(createdAt);
    const dueDate = new Date(createdDate.getTime() + slaHours * 60 * 60 * 1000);

    return dueDate.toLocaleString(); // readable format
  };

  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [comments, setComments] = useState([]);
  const [attachments, setAttachments] = useState([]);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `${API_BASE_URL}/api/delivery-lead/ticket/${ticketId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        const data = await response.json();
        setTicket(data.ticket);
        setComments(data.comments);
        setAttachments(data.attachments);
      } catch (error) {
        console.error("Failed to fetch ticket:", error);
      }
    };

    fetchTicket();
  }, [ticketId]);

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center mb-4">
        <h1 className="h4 mb-0 text-gray-800">View Ticket</h1>
      </div>
      <div id="accordion">
        <div className="card mb-4">
          <div className="card-header" id="headingOne">
            <h5 className="mb-0">
              <button
                className="btn btn-link btn-collapse"
                data-toggle="collapse"
                data-target="#collapseOne1"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Ticket Information
              </button>
            </h5>
          </div>

          <div
            id="collapseOne"
            className="collapse show"
            aria-labelledby="headingOne"
            data-parent="#accordion"
          >
            <div className="card-body">
              <div className="row">
                <div className="col-md-3">
                  <label className="line-label">
                    Ticket ID <em>*</em>
                  </label>
                  <input
                    className="form-control line-field"
                    value={ticket?.id || ""}
                    readOnly
                  />
                </div>
                <div className="col-md-3">
                  <label className="line-label">
                    Requester Name <em>*</em>
                  </label>
                  <input
                    type="text"
                    className="form-control line-field"
                    value={ticket?.requester || ""}
                    readOnly
                  />
                </div>
                <div className="col-md-3">
                  <label className="line-label">Account Name</label>
                  <input
                    type="text"
                    className="form-control line-field"
                    value={ticket?.account_name || ""}
                    readOnly
                  />
                </div>
                <div className="col-md-3">
                  <label className="line-label">Email ID</label>
                  <input
                    type="text"
                    className="form-control line-field"
                    value={ticket?.contact_email || ""}
                    readOnly
                  />
                </div>
                <div className="col-md-3">
                  <label className="line-label">Phone Number</label>
                  <input
                    type="text"
                    className="form-control line-field"
                    value={ticket?.contact_phone || ""}
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
                  <label className="line-label">Priority</label>
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
                    className="form-control line-field form-select"
                    value={ticket?.status || ""}
                    disabled
                  >
                    <option value="">--Select--</option>
                    {ticket?.status && (
                      <option value={ticket.status}>{ticket.status}</option>
                    )}
                  </select>
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
                    type="text"
                    className="form-control line-field"
                    value={calculateDueDate(
                      ticket?.created_at,
                      ticket?.sla_hours
                    )}
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
                  <textarea
                    className="form-control line-field"
                    value={ticket?.description || ""}
                    readOnly
                  ></textarea>
                </div>
                <div className="col-md-12">
                  <label className="line-label">RCA</label>
                  <input
                    type="text"
                    className="form-control line-field"
                    value={ticket?.rca || ""}
                    readOnly
                  />
                </div>
                <div className="col-md-12">
                  <label className="line-label">Resolution</label>
                  <input
                    type="text"
                    className="form-control line-field"
                    value={ticket?.resolution || ""}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card mb-4">
          <div className="card-header" id="headingTwo">
            <h5 className="mb-0">
              <button
                className="btn btn-link btn-collapse"
                data-toggle="collapse"
                data-target="#collapseTwo1"
                aria-expanded="true"
                aria-controls="collapseTwo"
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

                  {attachments.length === 0 ? (
                    <p className="text-muted">No attachments</p>
                  ) : (
                    <ul className="list-group">
                      {attachments.map((file) => (
                        <li
                          key={file.id}
                          className="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <div>
                            <i className="fa fa-paperclip mr-2"></i>
                            <strong>{file.file_name || "Unnamed file"}</strong>
                          </div>

                          {file.file_url ? (
                            <a
                              href={file.file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-sm btn-outline-primary"
                            >
                              View
                            </a>
                          ) : (
                            <span className="text-muted">Unavailable</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="col-md-12">
                  <label className="line-label">Comments</label>

                  {comments.length === 0 && (
                    <p className="text-muted">No comments.</p>
                  )}

                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="comment-box mt-3 p-3 shadow-sm rounded"
                    >
                      <div className="d-flex justify-content-between">
                        <strong>
                          {comment.commented_by_name}{" "}
                          <span className="badge bg-secondary mr-2">
                            {comment.commented_role}
                          </span>
                        </strong>{" "}
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
        </div>
        <div className="text-right mb-4">
          <button className="btn btn-primary btn-sm mr-2">Submit</button>
          <button className="btn btn-secondary btn-sm">Close</button>
        </div>
      </div>
    </div>
  );
}

export default ViewDLTicket;
