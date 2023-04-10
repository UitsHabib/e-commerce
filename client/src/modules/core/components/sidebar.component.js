import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <>
            <ul className="navbar-nav sidebar accordion" id="accordionSidebar" style={{'backgroundColor':'#dee2e6'}}>

                <span className="sidebar-brand d-flex align-items-center justify-content-center" >
                    Ecommerce
                </span>

                <li className="nav-item text-dark my-0 active">
                    <Link className="nav-link" to="/">
                        <span>Dashboard</span></Link>
                </li>
                <li className="nav-item text-dark my-0 active">
                    <Link className="nav-link" to="/admins">
                        <span>Admin</span></Link>
                </li>
               

            </ul>
        </>
    )
}

export default Sidebar