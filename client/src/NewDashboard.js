import React from 'react';
import Sidebar from './common/sidebar.component';
import Topbar from './common/topbar.component';
import { Outlet } from 'react-router-dom';

const NewDashboard = () => {
    return <div id='wrapper'>
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
                <Topbar />
                <Outlet />
            </div>
        </div>

    </div>
}

export default NewDashboard