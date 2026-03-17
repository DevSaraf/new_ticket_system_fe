import React from "react";
function ManagerDashboard() {
  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center mb-4 row">
        <div className="col-6">
          <h1 className="h4 mb-0 text-gray-800 ">Manager Dashboard</h1>
        </div>

        {/* <div className="col-6 text-right">
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
        </div> */}
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
                    5
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
                    Resolved Tickets
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    12
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
                    5
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
                    Overdue Tickets
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    12
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

      

      <div className="row">
        <div className="col-xl-8 col-lg-7">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">
                Ticket Stats
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

        <div className="col-xl-4 col-lg-5">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">
                Revenue Sources
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
              <div className="chart-pie pt-4 pb-2">
                {/* <canvas id="myPieChart"></canvas> */}
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

      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Projects</h6>
            </div>
            <div className="card-body">
              <h4 className="small font-weight-bold">
                Server Migration <span className="float-right">20%</span>
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
                Sales Tracking <span className="float-right">40%</span>
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
                Customer Database <span className="float-right">60%</span>
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
              <h4 className="small font-weight-bold">
                Payout Details <span className="float-right">80%</span>
              </h4>
              <div className="progress mb-4">
                <div
                  className="progress-bar bg-info"
                  role="progressbar"
                  // style="width: 80%"
                  aria-valuenow="80"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <h4 className="small font-weight-bold">
                Account Setup <span className="float-right">Complete!</span>
              </h4>
              <div className="progress">
                <div
                  className="progress-bar bg-success"
                  role="progressbar"
                  // style="width: 100%"
                  aria-valuenow="100"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6 mb-4">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                Illustrations
              </h6>
            </div>
            <div className="card-body">
              <div className="text-center">
                {/* <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style="width: 25rem;"
                                            src="../img/undraw_posting_photo.svg" alt="..."> */}
              </div>
              <p>
                Add some quality, svg illustrations to your project courtesy of{" "}
                <a target="_blank" rel="nofollow" href="https://undraw.co/">
                  unDraw
                </a>
                , a constantly updated collection of beautiful svg images that
                you can use completely free and without attribution!
              </p>
              <a target="_blank" rel="nofollow" href="https://undraw.co/">
                Browse Illustrations on unDraw &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerDashboard;
