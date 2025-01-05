import React, { useState } from "react";
import logo1 from '../assets/logo1.png';
import { Link, useNavigate } from "react-router-dom";
import './Header.css'; 


function Header({ isLoggedIn, setIsLoggedIn}) {
  const [showModal, setShowModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Handle job click logic
  const handleJobClick = () => {
    if (!isLoggedIn) {
      setShowModal(true); // Show modal if not logged in
    } else {
      navigate("/jobs"); // Navigate to jobs if logged in
    }
  };

  // Handle modal close and job redirection
  const handleCloseModal = () => {
    setShowModal(false); // Close modal
  };

  // Trigger navigation after modal action
  const handleModalAction = () => {
    setShowModal(false); // Close modal
    navigate("/login"); // Navigate to login page
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("token"); // Clear session data if applicable
    navigate("/"); // Redirect to home page
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center px-5 py-5">
      <div className="w-75 bg-light p-3">
        <div className="d-flex justify-content-between align-items-center">
          <img src={logo1} style={{ width: '120px' }} alt="Logo" />

          {/* Hamburger icon for smaller screens */}
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
                <Link className="fs-5 text-dark me-3" to="/profile">Profile</Link> {/* Display Profile when logged in */}
                <Link className="fs-5 text-dark me-3" onClick={handleLogout} to="/">Logout</Link> {/* Optionally include Logout */}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal for showing login prompt */}
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
