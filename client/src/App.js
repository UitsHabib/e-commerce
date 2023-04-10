import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "./common/dashboard.component";
import Login from "./login/login.component";
import ChangePassword from "./user/ChangePassword";

import Home from "./Home";
import NewDashboard from "./NewDashboard";
import AdminList from "./admin/Index";

import ForgetPassword from "./user/ForgetPassword";

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

                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/change-password" element={<ChangePassword />} />

                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
            </Routes>
        </>
    );
}

export default App;
