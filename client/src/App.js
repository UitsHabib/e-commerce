import { Routes, Route } from "react-router-dom";
import Dashboard from "./common/dashboard.component";
import Login from "./login/login.component";

function App() {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </>
    );
}

export default App;
