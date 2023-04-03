import { Routes, Route } from "react-router-dom";

import ForgetPassword from "./modules/platform/user/components/User.ForgetPassword";
import Login from "./modules/platform/user/components/User.Login";
import Registration from "./modules/platform/user/components/User.Registration";
import "./App.css";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/forgetPassword" element={<ForgetPassword />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;
