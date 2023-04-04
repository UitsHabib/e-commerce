import { Routes, Route } from "react-router-dom";
import Dashboard from "./common/dashboard.component";
import Login from "./login/login.component";
<<<<<<< HEAD
import ChangePassword from "./user/ChangePassword";
=======
import AdminDashboard from "./admin/admin-dashboard.component";
>>>>>>> 9733f31 (Update Server)

function App() {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path='/change-password' element={<ChangePassword />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
        </>
    );
}

export default App;
