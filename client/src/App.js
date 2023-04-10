import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "./common/dashboard.component";
import Login from "./login/login.component";
import ChangePassword from "./user/ChangePassword";
import Home from "./Home";
import NewDashboard from "./NewDashboard";
import AdminList from "./modules/admin/Index";

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
                <Route path="/" element={<NewDashboard />}>
                    {/* <Route path="/dashboard" index element={<Dashboard />} /> */}
                    <Route index element={<Home />} />
                    <Route path="/change-password" element={<ChangePassword />} />
                    <Route path="/admins" element={<AdminList />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
