import { Routes, Route } from "react-router-dom";
import "./App.css";
import ForgetPassword from "./modules/platform/user/components/User.ForgetPassword";
import Login from "./modules/platform/user/components/User.SignIn";
import SignUp from "./modules/platform/user/components/User.SignUp";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/forgetPassword" element={<ForgetPassword />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/signIn" element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;
