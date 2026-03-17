import { useEffect, useState } from "react";
import { API_BASE_URL } from '../../config';

const BASE_URL = `${API_BASE_URL}/api/customer/tickets`;


function CustomerDashboard() {

  const [counts, setCounts] = useState({
    open: 0,
    closed: 0,
    unassigned: 0,
    overdue: 0
  });

  const token = localStorage.getItem("token");


  useEffect(() => {
    const headers = { Authorization: token };

    Promise.all([
      fetch(`${BASE_URL}/open/count`, { headers }).then(r => r.json()),
      fetch(`${BASE_URL}/closed/count`, { headers }).then(r => r.json()),
      fetch(`${BASE_URL}/unassigned/count`, { headers }).then(r => r.json()),
      fetch(`${BASE_URL}/uat/count`, { headers }).then(r => r.json())
    ]).then(([open, closed, unassigned, uat]) => {
      setCounts({
        open: open.open_tickets_count,
        closed: closed.closed_tickets_count,
        unassigned: unassigned.unassigned_tickets_count,
        uat: uat.uat_tickets_count
      });
    });
  }, []);



  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center mb-4 row">
        <div className="col-6">
          <h1 className="h4 mb-0 text-gray-800 ">Customer Dashboard</h1>
        </div>

        <div className="col-6 text-right">
          <a
            href="/create-customer-ticket"
            className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm mr-2"
          >
            <i className="fas fa-download fa-sm text-white-50"></i> Create New
            Ticket
          </a>
          <a
            href="/list-customer-ticket"
            className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
          >
            <i className="fas fa-download fa-sm text-white-50"></i> View All
            Ticket
          </a>
        </div>
      </div>

      <div className="row top-card-tiles">
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Open Tickets
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {counts.open}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-calendar fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Closed Tickets
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {counts.closed}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Unassigned Tickets
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {counts.unassigned}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-calendar fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    UAT Tickets
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {counts.uat}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- <div className="col-xl-2 col-md-6 mb-4">
                            <div className="card border-left-info shadow py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Active
                                                Sprints
                                            </div>
                                            <div className="row no-gutters align-items-center">
                                                <div className="col-auto">
                                                    <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">2</div>
                                                </div>
                                                <div className="col">
                                                    <div className="progress progress-sm mr-2">
                                                        <div className="progress-bar bg-info" role="progressbar"
                                                            style="width: 50%" aria-valuenow="50" aria-valuemin="0"
                                                            aria-valuemax="100"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> --> */}

        {/* <!-- <div className="col-xl-2 col-md-6 mb-4">
                            <div className="card border-left-warning shadow py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                Completed Sprints</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">5</div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-comments fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> --> */}
      </div>

      

      
    </div>
  );
}

export default CustomerDashboard;
