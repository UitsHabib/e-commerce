import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./components/Home";
import NewDashboard from "../core/components/NewDashboard";
import AdminRoutes from "../admins";
import UserRoutes from "../users";

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
                <Route path="/login" element={<UserRoutes.Login />} />
                <Route path="/" element={<NewDashboard />}>
                    <Route index element={<Home />} />
                    <Route path="/change-password" element={<UserRoutes.ChangePassword />} />
                    <Route path="/admins" element={<AdminRoutes.AdminList />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
