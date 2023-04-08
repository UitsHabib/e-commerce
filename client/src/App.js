import { Routes, Route } from "react-router-dom";
import Dashboard from "./common/dashboard.component";
import Login from "./login/login.component";
import ChangePassword from "./user/ChangePassword";
import AdminDashboard from "./admin/admin-dashboard.component";

import CustomerSignUp from "./user/customersignup.component";
import VendorSignUp from "./user/vendorsignup.component";
import PermissionTable from "./permission/permissionTable.component";
import PermissionCreate from "./permission/permission.create";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/customer-signup" element={<CustomerSignUp />} />
        <Route path="/vendor-signup" element={<VendorSignUp />} />
        <Route path="/permission" element={<PermissionTable />} />
        <Route path="/permission/create" element={<PermissionCreate />} />
      </Routes>
    </>
  );
}

export default App;
