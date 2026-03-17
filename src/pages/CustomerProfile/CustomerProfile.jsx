import React, { useEffect, useState } from "react";
import { API_BASE_URL } from '../../config';
import axios from "axios";

function CustomerProfile() {
  const [profile, setProfile] = useState(null); // State to store profile data
  const [loading, setLoading] = useState(true); // State to handle loading
  const token = localStorage.getItem('token'); // Replace 'token' with the key you used to store the token


  useEffect(() => {
    // Fetch user profile data
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/customer/profile`, {
          headers: {
            Authorization: token,
          },
        });
        setProfile(response.data); // Set profile data
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while fetching data
  }

  if (!profile) {
    return <div>Error loading profile data.</div>; // Show error if profile data is not available
  }

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center mb-4">
        <h1 className="h4 mb-0 text-gray-800">Customer Profile</h1>
      </div>
      <div id="accordion">
        <div className="card mb-4">
          <div className="card-header" id="headingOne">
            <h5 className="mb-0">
              <button
                className="btn btn-link btn-collapse"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                User Information
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
                    Requester Name <em>*</em>
                  </label>
                  <input
                    type="text"
                    className="form-control line-field"
                    value={profile.name}
                    disabled
                  />
                </div>
                <div className="col-md-3">
                  <label className="line-label">
                    Account Name <em>*</em>
                  </label>
                  <input
                    type="text"
                    className="form-control line-field"
                    value={profile.account_name}
                    disabled
                  />
                </div>
                <div className="col-md-3">
                  <label className="line-label">
                    Email ID<em>*</em>
                  </label>
                  <input
                    type="text"
                    className="form-control line-field"
                    value={profile.email}
                    disabled
                  />
                </div>
                <div className="col-md-3">
                  <label className="line-label">Phone Number</label>
                  <input
                    type="text"
                    className="form-control line-field"
                    value={profile.phone}
                    disabled
                  />
                </div>
                {/* <div className="col-md-3">
                  <label className="line-label">
                    Department <em>*</em>
                  </label>
                  <input
                    type="text"
                    className="form-control line-field"
                    value={profile.department}
                    disabled
                  />
                </div>
                <div className="col-md-3">
                  <label className="line-label">Organization</label>
                  <input
                    type="text"
                    className="form-control line-field"
                    value={profile.organization}
                    disabled
                  />
                </div> */}
                <div className="col-md-3">
                  <label className="line-label">
                    Role <em>*</em>
                  </label>
                  <select className="form-control line-field form-select" disabled>
                    <option>{profile.role_name}</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="line-label">
                    Status <em>*</em>
                  </label>
                  <select className="form-control line-field form-select" disabled>
                    <option>{profile.is_active ? "Active" : "Inactive"}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerProfile;