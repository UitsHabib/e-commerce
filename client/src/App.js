import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "./common/dashboard.component";
import Login from "./login/login.component";
import ChangePassword from "./user/ChangePassword";
import AdminDashboard from "./admin/admin-dashboard.component";

import CustomerSignUp from "./user/customersignup.component";
import VendorSignUp from "./user/vendorsignup.component";
import PermissionTable from "./permission/permissionTable.component";
import PermissionCreate from "./permission/permission.create";

import Home from "./Home";
import NewDashboard from "./NewDashboard";
import AdminList from "./admin/Index";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/customer-signup" element={<CustomerSignUp />} />
        <Route path="/vendor-signup" element={<VendorSignUp />} />
        <Route path="/permission" element={<PermissionTable />} />
        <Route path="/permission/create" element={<PermissionCreate />} />

        <Route index element={<Home />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/admins" element={<AdminList />} />
      </Routes>
    </>
  );
}
export default App;
