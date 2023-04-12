import React, { useState, useEffect } from "react";
import Fullnavbar from "../../core/components/navbar.component";
import { Outlet, useNavigate } from "react-router-dom";

const token = localStorage.getItem("access_token");
const access_token = `Bearer ${token}`;
const headers = {
    Authorization: access_token,
};

function Dashboard() {
    const [user, setUser] = useState("Noman");

    const navigate = useNavigate();
    token === null && navigate("/login", { replace: true });

    return (
        <>
            <Fullnavbar user={user} />
            <Outlet />
        </>
    );
}

export default Dashboard;
