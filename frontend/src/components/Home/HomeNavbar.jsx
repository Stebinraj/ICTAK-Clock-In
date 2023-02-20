import React from 'react'
import { Link } from 'react-router-dom'

const HomeNavbar = () => {
    return (
        // home page navbar
        <nav className="navbar bg-light fixed navbar-expand-lg home-navbar">
            <div className="container-fluid">
                <Link to={'/'} style={{ fontWeight: "bold", fontSize: '20px' }}>
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
                </div>
            </div>
        </nav>
    )
}

export default HomeNavbar