import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Logout() {
    const [logout, setLogout] = useState({ loggout: false });

    const navigate = useNavigate();

    async function logoutHandler() {
        try {
            const res = await axios.post("http://localhost:3000/users/logout");
            if (res.status === 200) {
                localStorage.removeItem("access_token");
                setLogout({
                    ...logout,
                    loggout: true,
                });
            }
        } catch (err) {
            console.log(err);
        }
    }

    {
        logout.loggout && navigate("/login", { replace: true });
    }

    return (
        <div onClick={logoutHandler}>
            <i className="bi bi-box-arrow-right"></i> Logout
        </div>
    );
}

export default Logout;
