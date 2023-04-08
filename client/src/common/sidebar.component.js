import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <>
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="#">
                    Ecommerce
                </a>

                <li className="nav-item active">
                    <Link className="nav-link" to="/">
                        <span>Dashboard</span></Link>
                </li>
                <li className="nav-item active">
                    <Link className="nav-link" to="/admins">
                        <span>Admin</span></Link>
                </li>
               

            </ul>
        </>
    )
}

export default Sidebar