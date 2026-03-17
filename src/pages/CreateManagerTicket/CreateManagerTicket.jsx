import React, { useState, useEffect } from "react";
import { API_BASE_URL } from '../../config';

function CreateManagerTicket() {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const categories = ["SAP", "Product", "Integration", "Other"];

  const categorySubCategoryMap = {
    SAP: ["MM", "SD", "FI", "ABAP", "BASIS"],
    Product: ["Vendor Portal", "Customer Portal", "Tax", "General"],
    Integration: ["Middleware"],
    Other: ["Other"],
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;

    setCategory(selectedCategory);
    setSubCategory("");

    setFormData((prev) => ({
      ...prev,
      category: selectedCategory,
      sub_category: "",
    }));
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "`${API_BASE_URL}/api/customer/profile`",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        const data = await response.json();

        setFormData((prev) => ({
          ...prev,
          requester: data.name || "",
          account_name: data.account_name || "",
          contact_email: data.email || "",
          contact_phone: data.phone || "",
        }));
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const [formData, setFormData] = useState({
    requester: "",
    contact_email: "",
    contact_phone: "",
    account_name: "",
    category: "",
    sub_category: "",
    type: "",
    environment: "",
    subject: "",
    description: "",
    priority: "3",
    due_date: "",
    comment: "",
    attachments: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const {
    subject,
    description,
    category,
    sub_category,
    type,
    environment,
    priority,
  } = formData;

  if (
    !subject ||
    !description ||
    !category ||
    !sub_category ||
    !type ||
    !environment ||
    !priority
  ) {
    alert("Please fill all required fields");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const formPayload = new FormData();

    // Append all fields
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== "") {
        formPayload.append(key, formData[key]);
      }
    });

    const response = await fetch(
      "`${API_BASE_URL}/api/customer/ticket`",
      {
        method: "POST",
        headers: {
          Authorization: token, // ❗ DO NOT set Content-Type
        },
        body: formPayload,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to create ticket");
      return;
    }

    alert(`Ticket created successfully. Ticket ID: ${data.ticketId}`);
  } catch (error) {
    console.error("Create ticket error:", error);
    alert("Something went wrong");
  }
};

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center mb-4">
        <h1 className="h4 mb-0 text-gray-800">Create A New Ticket</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div id="accordion">
          {/* Ticket Information */}
          <div className="card mb-4">
            <div className="card-header">
              <button
                className="btn btn-link btn-collapse"
                data-toggle="collapse"
                data-target="#collapseOne1"
              >
                Ticket Information
              </button>
            </div>

            <div id="collapseOne" className="collapse show">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3">
                    <label className="line-label">
                      Requester Name <em>*</em>
                    </label>
                    <input
                      type="text"
                      className="form-control line-field"
                      name="requester"
                      required
                      value={formData.requester}
                      readOnly
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="line-label">Account Name</label>
                    <input
                      type="text"
                      className="form-control line-field"
                      name="account_name"
                      value={formData.account_name}
                      readOnly
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="line-label">Email ID</label>
                    <input
                      type="email"
                      className="form-control line-field"
                      name="contact_email"
                      required
                      value={formData.contact_email}
                      readOnly
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="line-label">Phone Number</label>
                    <input
                      type="text"
                      className="form-control line-field"
                      name="contact_phone"
                      value={formData.contact_phone}
                      required readOnly
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="line-label">
                      Category <em>*</em>
                    </label>
                    <select
                      className="form-control line-field form-select"
                      value={category}
                      onChange={handleCategoryChange}
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-3">
                    <label className="line-label">
                      Sub-Category <em>*</em>
                    </label>
                    <select
                      className="form-control line-field form-select"
                      value={subCategory}
                      onChange={(e) => {
                        setSubCategory(e.target.value);
                        setFormData((prev) => ({
                          ...prev,
                          sub_category: e.target.value,
                        }));
                      }}
                      disabled={!category}
                    >
                      <option value="">Select Sub Category</option>
                      {category &&
                        categorySubCategoryMap[category].map((sub) => (
                          <option key={sub} value={sub}>
                            {sub}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="col-md-3">
                    <label className="line-label">
                      Type <em>*</em>
                    </label>
                    <select
                      className="form-control line-field form-select"
                      name="type"
                      required
                      onChange={handleChange}
                    >
                      <option value="">--Select--</option>
                      <option>Incident</option>
                      <option>Query</option>
                      <option>Problem</option>
                      <option>Change</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className="line-label">Priority  <em>*</em></label>
                    <select
                      className="form-control line-field form-select"
                      name="priority"
                      onChange={handleChange}
                      required
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
                    <label className="line-label">
                      Environment <em>*</em>
                    </label>
                    <select
                      className="form-control line-field form-select"
                      name="environment"
                      required
                      onChange={handleChange}
                    >
                      <option value="">--Select--</option>
                      <option>PRD</option>
                      <option>QA</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                     <label className="line-label">
                      Target Date <em>*</em>
                    </label>
                    <input
                      type="date"
                      className="form-control line-field"
                      name="targetDate"
                      required
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-12">
                    <label className="line-label">
                      Subject <em>*</em>
                    </label>
                    <input
                      type="text"
                      className="form-control line-field"
                      name="subject"
                      required
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-12">
                    <label className="line-label">Description  <em>*</em></label>
                    <textarea
                      className="form-control line-field"
                      name="description"
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <div className="col-md-12">
                    <label className="line-label">
                      Attachmants (up to 20KB)
                    </label>
                    <input
  type="file"
  className="form-control line-field"
  onChange={(e) =>
    setFormData((prev) => ({
      ...prev,
      attachments: e.target.files[0],
    }))
  }
/>

                  </div>
                  
                 
                </div>
              </div>
            </div>
          </div>

          <div className="text-right mb-4">
            <button type="submit" className="btn btn-primary btn-sm mr-2">
              Submit
            </button>
            <button type="button" className="btn btn-secondary btn-sm">
              Close
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateManagerTicket;
