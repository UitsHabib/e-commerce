import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';


const Topbar = () => {
  const location = useLocation();
  const urls = location.pathname.split('/');
 
  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

      <Breadcrumb className='mx-3'>
        {
          location.pathname === '/' || urls.map((url, index) => {
            if (!url) {
              return <Breadcrumb.Item key={index}>
                <Link to={'/'}>Home</Link>
              </Breadcrumb.Item>
            } else {
              return <Breadcrumb.Item key={index}>
                <Link to={`/${url}`} >
                  {url}
                </Link>
              </Breadcrumb.Item>
            }
          })

        }
        {location.pathname === '/' && <Breadcrumb.Item>
          <Link to={'/'}>Home</Link>
        </Breadcrumb.Item>}
      </Breadcrumb>
      
      <ul className="navbar-nav ml-auto">
        <div className="topbar-divider d-none d-sm-block"></div>

        <li className="nav-item dropdown no-arrow">
          <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">Shameem</span>
          </a>
          <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
            aria-labelledby="userDropdown">
            <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
              Logout
            </a>
          </div>
        </li>

      </ul>

    </nav>
  )
}

export default Topbar