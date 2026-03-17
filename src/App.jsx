import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout.jsx";
import Login from "./components/Login/Login.jsx";
import CustomerDashboard from "./pages/CustomerDashboard/CustomerDashboard.jsx";
import ListCustomerTicket from "./pages/ListCustomerTicket/ListCustomerTicket.jsx";
import ViewCustomerTicket from "./pages/ViewCustomerTicket/ViewCustomerTicket.jsx";
import EditCustomerTicket from "./pages/EditCustomerTicket/EditCustomerTicket.jsx";
import CreateCustomerTicket from "./pages/CreateCustomerTicket/CreateCustomerTicket.jsx";
import CustomerProfile from "./pages/CustomerProfile/CustomerProfile.jsx";

import ManagerDashboard from "./pages/ManagerDashboard/ManagerDashboard.jsx";
import CreateManagerTicket from "./pages/CreateManagerTicket/CreateManagerTicket.jsx";
import ManageCustomerTicket from "./pages/ManageCustomerTicket/ManageCustomerTicket.jsx";
import ManageCustomers from "./pages/ManageCustomers/ManageCustomers.jsx";
import ApprovedTicketListByManger from "./pages/ApprovedTicketListByManger/ApprovedTicketListByManger.jsx";
import RejectedTicketListByManager from "./pages/RejectedTicketListByManager/RejectedTicketListByManager.jsx";
import ViewManagerTicket from "./pages/ViewManagerTicket/ViewManagerTicket.jsx";

import NormalAgentDashboard from "./pages/NormalAgentDashboard/NormalAgentDashboard.jsx";
import CreateAgentTicket from "./pages/CreateAgentTicket/CreateAgentTicket.jsx";
import ManageAgentUnassignedTicket from "./pages/ManageAgentUnassignedTicket/ManageAgentUnassignedTicket.jsx";
import AgentAssignedTicket from "./pages/AgentAssignedTicket/AgentAssignedTicket.jsx";
import ViewAgentTicket from "./pages/ViewAgentTicket/ViewAgentTicket.jsx";
import EditAgentTicket from "./pages/EditAgentTicket/EditAgentTicket.jsx";


import AdminDashboard from "./pages/AdminDashboard/AdminDashboard.jsx";
import AdminRoleManagement from "./pages/AdminRoleMangement/AdminRoleMangement.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="" element={<Login />} />
        <Route
          path="/customer-dashboard"
          element={
            <MainLayout>
              <CustomerDashboard />
            </MainLayout>
          }
        />
        <Route
          path="/list-customer-ticket"
          element={
            <MainLayout>
              <ListCustomerTicket />
            </MainLayout>
          }
        />
        <Route
          path="/view-customer-ticket/:ticketId"
          element={
            <MainLayout>
              <ViewCustomerTicket />
            </MainLayout>
          }
        />
        <Route
          path="/edit-customer-profile/:ticketId"
          element={
            <MainLayout>
              <EditCustomerTicket />
            </MainLayout>
          }
        />
        <Route
          path="/create-customer-ticket"
          element={
            <MainLayout>
              <CreateCustomerTicket />
            </MainLayout>
          }
        />
        <Route
          path="/customer-profile"
          element={
            <MainLayout>
              <CustomerProfile />
            </MainLayout>
          }
        />
        <Route
          path="/manager-dashboard"
          element={
            <MainLayout>
              <ManagerDashboard />
            </MainLayout>
          }
        />
        <Route
          path="/create-manager-ticket"
          element={
            <MainLayout>
              <CreateManagerTicket />
            </MainLayout>
          }
        />
        <Route
          path="/manage-customer-ticket"
          element={
            <MainLayout>
              <ManageCustomerTicket />
            </MainLayout>
          }
        />
        <Route
          path="/approved-ticket"
          element={
            <MainLayout>
              <ApprovedTicketListByManger />
            </MainLayout>
          }
        />
        <Route
          path="/rejected-ticket"
          element={
            <MainLayout>
              <RejectedTicketListByManager />
            </MainLayout>
          }
        />
        <Route
          path="/manage-customers"
          element={
            <MainLayout>
              <ManageCustomers />
            </MainLayout>
          }
        />
        <Route
          path="/view-manager-ticket/:ticketId"
          element={
            <MainLayout>
              <ViewManagerTicket />
            </MainLayout>
          }
        />

        <Route
          path="/normal-agent-dashboard"
          element={
            <MainLayout>
              <NormalAgentDashboard />
            </MainLayout>
          }
        />
        <Route
          path="/create-agent-ticket"
          element={
            <MainLayout>
              <CreateAgentTicket />
            </MainLayout>
          }
        />

        <Route
          path="/agent-unassigned-ticket"
          element={
            <MainLayout>
              <ManageAgentUnassignedTicket />
            </MainLayout>
          }
        />
        <Route
          path="/agent-assigned-ticket"
          element={
            <MainLayout>
              <AgentAssignedTicket />
            </MainLayout>
          }
        />
        <Route
          path="/view-agent-ticket/:ticketId"
          element={
            <MainLayout>
              <ViewAgentTicket />
            </MainLayout>
          }
        />
        <Route
          path="/edit-agent-ticket/:ticketId"
          element={
            <MainLayout>
              <EditAgentTicket />
            </MainLayout>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <MainLayout>
              <AdminDashboard />
            </MainLayout>
          }
        />
        <Route
          path="/admin-role-management"
          element={
            <MainLayout>
              <AdminRoleManagement />
            </MainLayout>
          }
        />
         

        
      </Routes>
    </Router>
  );
}

export default App;
