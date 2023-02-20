import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';

const AdminNavbar = () => {

    const name = sessionStorage.getItem('Name');
    const navigate = useNavigate();

    // logout, session clearing, navigation
    const logout = (e) => {
        e.preventDefault();
        sessionStorage.clear();
        navigate('/', { replace: true });
    }

    return (
        // admin navbar start
        <nav className="navbar bg-light fixed navbar-expand-lg employee-navbar">
            <div className="container-fluid">
                <Link to={'/admin'} style={{ fontWeight: "bold", fontSize: '20px' }}>
                    <img src={require('../../assets/logo.png')} alt="Logo" width="55" height="55" className="d-inline-block align-text-center me-1" />
                    ICTAK Clock-In
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">ICTAK Clock-In</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <h4 className='mt-2 me-3'>{name}</h4>
                            <li className="nav-item">
                                <NavLink to={'/admin'} className='me-2' activeclassname='active' aria-current="page">
                                    <button className='btn btn-primary'>Dashboard</button>
                                </NavLink>
                            </li>
                            <br />
                            <li className="nav-item">
                                <Link onClick={logout} to={'/'} aria-current="page">
                                    <button className='btn btn-primary'>Logout</button>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
        // admin navbar end
    )
}

export default AdminNavbar