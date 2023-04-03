import { Routes, Route } from "react-router-dom";
import Dashboard from "./common/dashboard.component";
import Login from "./login/login.component";
import CustomerSignUp from "./user/customersignup.component";
import VendorSignUp from "./user/vendorsignup.component";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/customer-signup" element={<CustomerSignUp />} />
                <Route path="/vendor-signup" element={<VendorSignUp />} />
            </Routes>
        </>
    );
}

export default App;
