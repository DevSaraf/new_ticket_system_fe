import React, { useState } from "react";

function AdminRoleManagement() {
  const [role, setRole] = useState("");
  const [customerType, setCustomerType] = useState("");
  const [agentType, setAgentType] = useState("");

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center mb-4">
        <h1 className="h4 mb-0 text-gray-800">Add User</h1>
      </div>

      <div id="accordion">
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="mb-0">
              <button className="btn btn-link btn-collapse">
                User Information
              </button>
            </h5>
          </div>

          <div className="collapse show">
            <div className="card-body">
              <div className="row">

                {/* Name */}
                <div className="col-md-3">
                  <label className="line-label">Requester Name <em>*</em></label>
                  <input type="text" className="form-control line-field" />
                </div>

                <div className="col-md-3">
                  <label className="line-label">Account Name <em>*</em></label>
                  <input type="text" className="form-control line-field" />
                </div>


                {/* Email */}
                <div className="col-md-3">
                  <label className="line-label">Email ID<em>*</em></label>
                  <input type="email" className="form-control line-field" />
                </div>

                 
                {/* Phone */}
                <div className="col-md-3">
                  <label className="line-label">Phone Number<em>*</em></label>
                  <input type="text" className="form-control line-field" />
                </div>

                 {/* Organization */}
                <div className="col-md-3">
                  <label className="line-label">Organization <em>*</em></label>
                  <select className="line-field">
                    <option value="">Select Organization</option>
                    <option value="">BIBA</option>
                    <option value="">Namdhari</option>
                    <option value="">Lemon Tree</option>
                  </select>
                </div>

                {/* Department */}
                <div className="col-md-3">
                  <label className="line-label">Department </label>
                  <select className="line-field">
                    <option value="">Select Department</option>
                    <option value="">JAVA</option>
                    <option value="">SAP</option>
                  </select>
                </div>

               

                {/* Role */}
                <div className="col-md-3">
                  <label className="line-label">Role <em>*</em></label>
                  <select
                    className="line-field"
                    value={role}
                    onChange={(e) => {
                      setRole(e.target.value);
                      setCustomerType("");
                      setAgentType("");
                    }}
                  >
                    <option value="">Select Role</option>
                    <option value="Customer">Customer</option>
                    <option value="Agent">Agent</option>
                  </select>
                </div>

                {/* Customer Type */}
                {role === "Customer" && (
                  <div className="col-md-3">
                    <label className="line-label">Customer Type <em>*</em></label>
                    <select
                      className="line-field"
                      value={customerType}
                      onChange={(e) => setCustomerType(e.target.value)}
                    >
                      <option value="">Select Customer Type</option>
                      <option value="Customer">Customer</option>
                      <option value="Manager">Manager</option>
                    </select>
                  </div>
                )}

                {/* Agent Type */}
                {role === "Agent" && (
                  <div className="col-md-3">
                    <label className="line-label">Agent Type <em>*</em></label>
                    <select
                      className="line-field"
                      value={agentType}
                      onChange={(e) => setAgentType(e.target.value)}
                    >
                      <option value="">Select Agent Type</option>
                      <option value="Agent">Consultant</option>
                      <option value="HOD">HOD</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                )}

                {/* Manager */}
                {role === "Customer" && customerType === "Customer" && (
                  <div className="col-md-3">
                    <label className="line-label">Manager Name <em>*</em></label>
                    <select className="line-field">
                      <option value="">Select Manager</option>
                    </select>
                  </div>
                )}

               

              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="text-right mb-4">
          <button className="btn btn-primary btn-sm mr-2">Submit</button>
          <button className="btn btn-secondary btn-sm">Close</button>
        </div>
      </div>
    </div>
  );
}

export default AdminRoleManagement;
