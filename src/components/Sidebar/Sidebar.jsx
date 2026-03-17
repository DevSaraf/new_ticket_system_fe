import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/img/logo.png";

function Sidebar() {
  const location = useLocation(); // Get the current URL

  // Retrieve the role, agent_type, and customer_type from localStorage
  const role = localStorage.getItem("role"); // Example: 'customer', 'agent'
  const agentType = localStorage.getItem("agent_type"); // Example: 'normal', 'delivery_lead', 'admin', 'hod'
  const customerType = localStorage.getItem("customer_type"); // Example: 'customer', 'manager'

  // Define menus for each role and type
  const customerMenu = (
    <>
      <li className={`nav-item ${location.pathname === "/customer-dashboard" ? "active" : ""}`}>
        <Link className="nav-link" to="/customer-dashboard">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </Link>
      </li>
      <li className={`nav-item ${location.pathname === "/list-customer-ticket" ? "active" : ""}`}>
        <Link className="nav-link" to="/list-customer-ticket">
          <i className="fas fa-fw fa-ticket-alt"></i>
          <span>My Tickets</span>
        </Link>
      </li>
      <li className={`nav-item ${location.pathname === "/create-customer-ticket" ? "active" : ""}`}>
        <Link className="nav-link" to="/create-customer-ticket">
          <i className="fas fa-fw fa-plus"></i>
          <span>Create Ticket</span>
        </Link>
      </li>
      <li className={`nav-item ${location.pathname === "/customer-profile" ? "active" : ""}`}>
        <Link className="nav-link" to="/customer-profile">
          <i className="fas fa-fw fa-user"></i>
          <span>Customer Profile</span>
        </Link>
      </li>
    </>
  );

  const customerManagerMenu = (
    <>
      <li className={`nav-item ${location.pathname === "/customer-manager-dashboard" ? "active" : ""}`}>
        <Link className="nav-link" to="/manager-dashboard">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Manager Dashboard</span>
        </Link>
      </li>
      <li className={`nav-item ${location.pathname === "/create-manager-ticket" ? "active" : ""}`}>
        <Link className="nav-link" to="/create-manager-ticket">
          <i className="fas fa-fw fa-plus"></i>
          <span>Create Ticket</span>
        </Link>
      </li>
      <li className={`nav-item ${location.pathname === "/manage-customer-ticket" ? "active" : ""}`}>
        <Link className="nav-link" to="/manage-customer-ticket">
          <i className="fas fa-fw fa-users"></i>
          <span>Manage Customer Tickets</span>
        </Link>
      </li>
      <li className={`nav-item ${location.pathname === "/approved-ticket" ? "active" : ""}`}>
        <Link className="nav-link" to="/approved-ticket">
          <i className="fas fa-fw fa-check"></i>
          <span>Approved Tickets</span>
        </Link>
      </li>
      <li className={`nav-item ${location.pathname === "/rejected-ticket" ? "active" : ""}`}>
        <Link className="nav-link" to="/rejected-ticket">
          <i className="fas fa-fw fa-times"></i>
          <span>Rejected Tickets</span>
        </Link>
      </li>
      <li className={`nav-item ${location.pathname === "/manage-customers" ? "active" : ""}`}>
        <Link className="nav-link" to="/manage-customers">
          <i className="fas fa-fw fa-user"></i>
          <span>Manage Customers</span>
        </Link>
      </li>
    </>
  );

  const normalAgentMenu = (
    <>
      <li className={`nav-item ${location.pathname === "/normal-agent-dashboard" ? "active" : ""}`}>
        <Link className="nav-link" to="/normal-agent-dashboard">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Agent Dashboard</span>
        </Link>
      </li>
      <li className={`nav-item ${location.pathname === "/create-agent-ticket" ? "active" : ""}`}>
        <Link className="nav-link" to="/create-agent-ticket">
          <i className="fas fa-fw fa-plus"></i>
          <span>Create Ticket</span>
        </Link>
      </li>
      <li className={`nav-item ${location.pathname === "/agent-assigned-ticket" ? "active" : ""}`}>
        <Link className="nav-link" to="/agent-assigned-ticket">
          <i className="fas fa-fw fa-ticket-alt"></i>
          <span>Assigned Tickets</span>
        </Link>
      </li>
      <li className={`nav-item ${location.pathname === "/agent-unassigned-ticket" ? "active" : ""}`}>
        <Link className="nav-link" to="/agent-unassigned-ticket">
          <i className="fas fa-fw fa-ticket-alt"></i>
          <span>Unassigned Tickets</span>
        </Link>
      </li>
    </>
  );

  const adminAgentMenu = (
    <>
    <li className={`nav-item ${location.pathname === "/admin-dashboard" ? "active" : ""}`}>
        <Link className="nav-link" to="/admin-dashboard">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Admin Dashboard</span>
        </Link>
      </li>
      <li className={`nav-item ${location.pathname === "/admin-role-management" ? "active" : ""}`}>
        <Link className="nav-link" to="/admin-role-management">
          <i className="fas fa-fw fa-user-tie"></i>
          <span>Role Management</span>
        </Link>
      </li>
    </>
  );

  const hodAgentMenu = (
    <>
      <li className={`nav-item ${location.pathname === "/hod-dashboard" ? "active" : ""}`}>
        <Link className="nav-link" to="/hod-dashboard">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>HOD Dashboard</span>
        </Link>
      </li>
      <li className={`nav-item ${location.pathname === "/hod-reports" ? "active" : ""}`}>
        <Link className="nav-link" to="/hod-reports">
          <i className="fas fa-fw fa-chart-bar"></i>
          <span>Reports</span>
        </Link>
      </li>
      <li className={`nav-item ${location.pathname === "/hod-team-management" ? "active" : ""}`}>
        <Link className="nav-link" to="/hod-team-management">
          <i className="fas fa-fw fa-users"></i>
          <span>Team Management</span>
        </Link>
      </li>
    </>
  );

  // Render the appropriate menu based on role, agent_type, and customer_type
  const renderMenu = () => {
    if (role === "customer") {
      if (customerType === "customer") {
        return customerMenu;
      } else if (customerType === "manager") {
        return customerManagerMenu;
      }
    } else if (role === "agent") {
      if (agentType === "normal") {
        return normalAgentMenu;
      } else if (agentType === "admin") {
        return adminAgentMenu;
      } else if (agentType === "hod") {
        return hodAgentMenu;
      }
    }
    return null; // Default case (if no role matches)
  };

  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <a className="sidebar-brand d-flex align-items-center justify-content-center">
        <div className="sidebar-brand-text mx-3">
          <img src={Logo} alt="Logo" />
        </div>
      </a>

      <hr className="sidebar-divider my-0" />

      {/* Render the menu dynamically */}
      {renderMenu()}
    </ul>
  );
}

export default Sidebar;