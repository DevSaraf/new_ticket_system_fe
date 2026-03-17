import React from "react";

function DeliveryLeadDashboard() {
  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center mb-4 row">
        <div className="col-6">
          <h1 className="h4 mb-0 text-gray-800 ">Delivery Lead Dashboard</h1>
        </div>
        <div className="col-6 text-right">
          <select
            className="line-field" style={{width:"150px"}}
            // style="width:150px; background-color: #fff; margin-bottom: 0px;"
          >
            <option>Last 24 hour</option>
            <option>Today</option>
            <option>Yesterday</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last week</option>
            <option>Current Week</option>
            <option>Last Month</option>
            <option>Current Month</option>
          </select>
        </div>
      </div>

      <div className="row top-card-tiles">
        <div className="col-xl-2 col-md-6 mb-4">
          <div className="card border-left-primary shadow py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Open Tickets
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">5</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-calendar fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-2 col-md-6 mb-4">
          <div className="card border-left-success shadow py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Onhold Tickets
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">12</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-hourglass-half  fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-2 col-md-6 mb-4">
          <div className="card border-left-warning shadow py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    Overdue Tickets
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">5</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-exclamation-circle fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-2 col-md-6 mb-4">
          <div className="card border-left-info shadow py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                    Due Today{" "}
                  </div>
                  <div className="row no-gutters align-items-center">
                    <div className="col-auto">
                      <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                        2
                      </div>
                    </div>
                    <div className="col">
                      <div className="progress progress-sm mr-2">
                        <div
                          className="progress-bar bg-info"
                          role="progressbar"
                          // style="width: 50%"
                          aria-valuenow="50"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-check-circle fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-2 col-md-6 mb-4">
          <div className="card border-left-secondary shadow py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-secondary text-uppercase mb-1">
                    <a href="/list-unassigned-ticket">Unassigned Ticket</a>
                  </div>
                  <div className="row no-gutters align-items-center">
                    <div className="col-auto">
                      <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                        2
                      </div>
                    </div>
                    <div className="col">
                      <div className="progress progress-sm mr-2">
                        <div
                          className="progress-bar bg-info"
                          role="progressbar"
                          // style="width: 50%"
                          aria-valuenow="50"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-user-times fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-2 col-md-6 mb-4">
          <div className="card border-left-danger shadow py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">
                    SLA Violation
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">5</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-tasks fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-4 col-lg-4">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">
                Traffic Analysis
              </h6>
              <div className="dropdown no-arrow">
                <a
                  className="dropdown-toggle"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                  aria-labelledby="dropdownMenuLink"
                >
                  <div className="dropdown-header">Dropdown Header:</div>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="chart-area">
                {/* <canvas id="myAreaChart"></canvas> */}
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-lg-4">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                Average Handling Time
              </h6>
            </div>
            <div className="card-body">
              <h4 className="small font-weight-bold">
                First Response Time <span className="float-right">20%</span>
              </h4>
              <div className="progress mb-4">
                <div
                  className="progress-bar bg-danger"
                  role="progressbar"
                  // style="width: 20%"
                  aria-valuenow="20"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <h4 className="small font-weight-bold">
                Response Time <span className="float-right">40%</span>
              </h4>
              <div className="progress mb-4">
                <div
                  className="progress-bar bg-warning"
                  role="progressbar"
                  // style="width: 40%"
                  aria-valuenow="40"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <h4 className="small font-weight-bold">
                Resolution Time <span className="float-right">60%</span>
              </h4>
              <div className="progress mb-4">
                <div
                  className="progress-bar"
                  role="progressbar"
                  // style="width: 60%"
                  aria-valuenow="60"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-lg-4">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Happiness Rate</h6>
              <div className="dropdown no-arrow">
                <a
                  className="dropdown-toggle"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                  aria-labelledby="dropdownMenuLink"
                >
                  <div className="dropdown-header">Dropdown Header:</div>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="chart-pie pt-4 pb-2">
                <canvas id="myPieChart"></canvas>
              </div>
              <div className="mt-4 text-center small">
                <span className="mr-2">
                  <i className="fas fa-circle text-primary"></i> Direct
                </span>
                <span className="mr-2">
                  <i className="fas fa-circle text-success"></i> Social
                </span>
                <span className="mr-2">
                  <i className="fas fa-circle text-info"></i> Referral
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliveryLeadDashboard;
