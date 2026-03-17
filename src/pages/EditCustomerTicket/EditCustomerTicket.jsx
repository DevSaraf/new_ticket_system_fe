import React, { useEffect, useState } from "react";
import { API_BASE_URL } from '../../config';
import { useParams, useNavigate } from "react-router-dom";

function EditCustomerTicket() {
  const { ticketId } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState({
    contact_phone: "",
    subject: "",
    description: "",
    category: "",
    sub_category: "",
    type: "",
    environment: "",
    priority: "",
    due_date: "",
  });

  // 🔹 Fetch ticket details
  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `${API_BASE_URL}/api/common/ticket/${ticketId}`,
          {
            headers: { Authorization: token },
          }
        );

        const data = await res.json();
        setTicket(data);
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
        contact_phone: ticket.contact_phone,
        subject: ticket.subject,
        description: ticket.description,
        category: ticket.category,
        sub_category: ticket.sub_category,
        type: ticket.type,
        environment: ticket.environment,
        priority: ticket.priority,
        due_date: ticket.due_date,
      };

      const res = await fetch(
        `${API_BASE_URL}/api/Customer/updateTicket/${ticketId}`,
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
      navigate("/list-customer-ticket");
    } catch (err) {
      console.error("Update failed", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center mb-4">
        <h1 className="h4 mb-0 text-gray-800">Edit Customer Ticket</h1>
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
                    Requestor Name <em>*</em>
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
                    value={ticket.contact_email || ""}
                    readOnly
                  />
                </div>

                <div className="col-md-3">
                  <label className="line-label">Phone Number</label>
                  <input
                    name="contact_phone"
                    className="form-control line-field"
                    value={ticket.contact_phone || ""}
                    onChange={handleChange} readOnly
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
                    name="type"
                    className="form-control line-field form-select"
                    value={ticket.type || ""}
                    onChange={handleChange}
                  >
                    <option>Incident</option>
                    <option>Query</option>
                    <option>Problem</option>
                    <option>Change</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="line-label">
                    Priority <em>*</em>
                  </label>
                  <select
                    name="priority"
                    className="form-control line-field form-select"
                    value={ticket.priority || ""}
                    onChange={handleChange}
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
                    name="environment"
                    className="form-control line-field form-select"
                    value={ticket.environment || ""}
                    onChange={handleChange}
                  >
                    <option>PRD</option>
                    <option>QA</option>
                  </select>
                </div>

                <div className="col-md-3">
                  <label className="line-label">Status</label>
                  <select
                    name="status"
                    className="form-control line-field form-select"
                    value={ticket.status || ""}
                    onChange={handleChange} readOnly
                  >
                    <option value="">--Select--</option>
                    {ticket?.status && (
                      <option value={ticket.status}>
                        {ticket.status}
                      </option>
                    )}
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="line-label">Assignee</label>
                  <input  name="assignee"
                    className="form-control line-field"
                    value={ticket.assignee_name || ""} onChange={handleChange}
                    readOnly />
                </div>
                <div className="col-md-3">
                  <label className="line-label">Target Date</label>
                  <input
                    className="form-control line-field"
                    value={calculateDueDate()}
                  />
                </div>

                <div className="col-md-12">
                  <label className="line-label">
                    Subject <em>*</em>
                  </label>
                  <input
                    name="subject"
                    className="form-control line-field"
                    value={ticket.subject || ""}
                    onChange={handleChange} readOnly
                  />
                </div>

                <div className="col-md-12">
                  <label className="line-label">
                    Description <em>*</em>
                  </label>
                  <textarea
                    name="description"
                    className="form-control line-field"
                    value={ticket.description || ""}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="col-md-12">
                  <label className="line-label">RCA</label>
                  <input
                    name="rca"
                    className="form-control line-field"
                    value={ticket.rca || ""}
                    onChange={handleChange}
                    readOnly
                  />
                </div>

                <div className="col-md-12">
                  <label className="line-label">Resolution</label>
                  <input
                    name="resolution"
                    className="form-control line-field"
                    value={ticket.resolution || ""}
                    onChange={handleChange}
                    readOnly
                  />
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

                <div className="col-md-9">
                  <label className="line-label">Comment</label>
                  <p>No comments.</p>
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

export default EditCustomerTicket;
