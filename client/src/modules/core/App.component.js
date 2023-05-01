import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { NewDashboard, Home } from "./index";
import { AdminList } from "../admin";
import { Login, ChangePassword, Dashboard, UserList } from "../user";
import PermissionList from "../permission/components/index";

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
                <Route path="/" element={<NewDashboard />}>
                    <Route index element={<Home />} />
                    <Route path="/change-password" element={<ChangePassword />} />
                    <Route path="/admins" element={<AdminList />} />
                    <Route path="/users" element={<UserList />} />
                </Route>

                <Route path="/permission" element={<PermissionList />} />
            </Routes>
        </>
    );
}

export default App;
