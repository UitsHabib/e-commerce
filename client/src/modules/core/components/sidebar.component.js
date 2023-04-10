import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <>
            <ul className="navbar-nav sidebar sidebar-dark accordion" style={{'backgroundColor':'#E4E4E7'}} id="accordionSidebar">

                <a className="sidebar-brand d-flex align-items-center text-dark justify-content-center" href="#">
                    Ecommerce
                </a>

                <li className="nav-item active">
                    <Link className="nav-link text-dark" to="/">
                        Dashboard</Link>
                </li>
                <li className="nav-item active">
                    <Link className="nav-link text-dark" to="/admins">
                        <span>Admin</span></Link>
                </li>
               

            </ul>
        </>
    )
}

export default Sidebar