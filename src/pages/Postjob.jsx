import React, { useState } from 'react';
import logo from '../assets/logo1.png';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginApi } from '../services/allApi';

function Postjob() {
  const navigate = useNavigate();
  const [logDetails, setLogDetails] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    const { email, password } = logDetails;

    if (!email || !password) {
      toast.info('Please fill in all fields');
      return;
    }

    try {
      const response = await loginApi(logDetails); // Call backend API
      if (response.status === 200) {
        const { existingUser, token } = response.data;

        
        toast.success("Admin Login Successful");
        sessionStorage.setItem('adminUser', JSON.stringify(existingUser));
        sessionStorage.setItem('token', token);

        setTimeout(() => {
          navigate('/admin');
        }, 2000);
      } else {
        toast.warning(response.data);
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {/* Left side  */}
          <div
            className="col-md-5 d-flex flex-column justify-content-center align-items-center"
            style={{ backgroundColor: '#97F597', height: '100vh' }}
          >
            <h2
              className="text-center"
              style={{
                fontFamily: 'Archivo Black, sans-serif',
                fontWeight: '800',
                fontSize: '2.6rem',
                color: '#001567',
              }}
            >
              Admin Portal
            </h2>
            <img
              className="justify-content-center"
              src="https://arkca.com/assets/img/login.gif"
              alt="no image"
              style={{ width: '100%' }}
            />
          </div>

          {/* Right side */}
          <div
            className="col-md-7 d-flex flex-column"
            style={{ backgroundColor: '#6EFDE5', height: '100vh' }}
          >
       
            <div className="container d-flex justify-content-between">
              <img className="mt-4" style={{ width: '120px' }} src={logo} alt="logo" />
              <p className="mt-5">
                Go back to{' '}
                <Link to={'/'}><span className="text-primary">Home</span></Link>
              </p>
            </div>

            <div
              className="d-flex flex-column justify-content-center align-items-center"
              style={{ flexGrow: 1 }}
            >
              <h2
                style={{
                  fontFamily: 'Archivo Black, sans-serif',
                  fontWeight: '800',
                  fontSize: '2rem',
                  color: '#001567',
                }}
              >
                Admin Login
              </h2>
              <p className="mt-2 mb-5">Access the admin dashboard</p>

              <div className="d-flex justify-content-center align-items-center flex-column" style={{ width: '80%' }}>
                <input
                  type="text"
                  placeholder="Admin Email"
                  className="form-control mb-3"
                  value={logDetails.email}
                  onChange={(e) => setLogDetails({ ...logDetails, email: e.target.value })}
                  style={{ width: '80%' }}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control mb-2"
                  value={logDetails.password}
                  onChange={(e) => setLogDetails({ ...logDetails, password: e.target.value })}
                  style={{ width: '80%' }}
                />
                <p className="text-primary">Forgot password?</p>

                <button onClick={handleLogin} className="btn btn-primary border-0" style={{ width: '80%' }}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer theme="colored" position="top-center" autoClose={2000} />
    </>
  );
}

export default Postjob;
