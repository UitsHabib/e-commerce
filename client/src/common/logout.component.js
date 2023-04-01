import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

function Logout() {
    const [logout, setLogout] = useState({ loggout: false });

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

    return (
        <div onClick={logoutHandler}>
            {logout.loggout && <Navigate to="/" replace={true} />}
            <i className="bi bi-box-arrow-right"></i> Logout
        </div>
    );
}

export default Logout;
