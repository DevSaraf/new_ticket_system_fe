import React, { useEffect, useState } from "react";
import { API_BASE_URL } from '../../config';

function ManageCustomers() {
  const [customers, setCustomers] = useState([]); // State to store customers
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to manage errors

  // Fetch customers from API
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      const response = await fetch(`${API_BASE_URL}/api/manager/customers`, {
        method: "GET",
        headers: {
          Authorization: token, // Add token to Authorization header
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch customers");
      }

      const data = await response.json();
      setCustomers(data); // Update state with fetched customers
    } catch (err) {
      console.error("Error fetching customers:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers(); // Fetch customers on component mount
  }, []);

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center mb-4 row">
        <div className="col-12">
          <h1 className="h4 mb-0 text-gray-800">Manage Customers</h1>
        </div>
      </div>

      {/* Show success or error messages */}
      {error && <p className="text-danger">Error: {error}</p>}

      {/* Show loading spinner */}
      {loading && <p>Loading customers...</p>}

      {/* Show customers table */}
      {!loading && !error && customers.length > 0 && (
        <div className="card card-form p-4 mb-4 shadow">
          <div className="responsive-table">
            <table className="action-table table table-border table-sm">
              <thead>
                <tr>
                  <th>Customer ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Account Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.account_name}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => console.log(`View customer: ${customer.id}`)}
                      >
                        View
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => console.log(`Delete customer: ${customer.id}`)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Show message if no customers are available */}
      {!loading && !error && customers.length === 0 && (
        <p className="text-center">No customers found.</p>
      )}
    </div>
  );
}

export default ManageCustomers;