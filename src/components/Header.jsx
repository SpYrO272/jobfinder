import React, { useState } from "react";
import logo1 from '../assets/logo1.png';
import { Link, useNavigate } from "react-router-dom";
import './header.css'; 


function Header({ isLoggedIn, setIsLoggedIn}) {
  const [showModal, setShowModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();


  const handleJobClick = () => {
    if (!isLoggedIn) {
      setShowModal(true); 
    } else {
      navigate("/jobs");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false); 
  };

  const handleModalAction = () => {
    setShowModal(false); 
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("token");
    navigate("/"); 
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center px-5 py-5">
      <div className="w-75 bg-light p-3">
        <div className="d-flex justify-content-between align-items-center">
          <img src={logo1} style={{ width: '120px' }} alt="Logo" />

  
          <div className="menu-toggle d-lg-none" onClick={toggleMenu}>
            ☰
          </div>

          <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
            <Link to={'/'}><p className="fs-5 text-dark me-3">Home</p></Link>
            <p className="fs-5 text-dark me-3" onClick={handleJobClick}>Jobs</p> {/* Handle job click here */}
            {!isLoggedIn ? (
              <>
                <Link to={'/login'}><p className="fs-5 text-dark me-3">Login</p></Link>
                <Link to={'/register'}><p className="fs-5 text-dark me-3">Register</p></Link>
                <Link to={'/postjob'}>
                  <button className="btn btn-primary me-3 border-0" style={{ backgroundColor: '#5DC7EE' }}>Post Job</button>
                </Link>
              </>
            ): (
              <>
                <Link className="fs-5 text-dark me-3" to="/profile">Profile</Link>
                <Link className="fs-5 text-dark me-3" onClick={handleLogout} to="/">Logout</Link> 
              </>
            )}
          </div>
        </div>
      </div>

     
      {showModal && (
        <div className="modal show" style={{ display: 'block' }} tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fs-3 fw-bold">Login Required</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <p>You need to log in first in order to access the Jobs page.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleModalAction}>Go to Login</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
