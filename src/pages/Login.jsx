import React, { useState } from 'react';
import logo from '../assets/logo1.png';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginApi } from '../services/allApi';

function Login() {
  const navigate = useNavigate();
  const [logDetails, setLogDetails] = useState({
    email: '',
    password: '',
  });
  const handleLogin = async()=> {
    const { email, password } = logDetails;
    

    if(!email || !password){
      toast.info('Please fill in all fields');
    }
    else{
        const result = await loginApi(logDetails); 
        if (result.status === 200) {
          toast.success('Login Successful');
          setLogDetails({
            email: '',
            password: '',
          });
          sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
          sessionStorage.setItem("token",result.data.token)
          setTimeout(()=>{
            navigate('/profile'); 
          },2000)
        } else if (result.status === 406){
          toast.warning(result.response.data);
          setLogDetails({
            email: '',
            password: '',
          });
        } 
        else{
          toast.error('Something went wrong');
          setLogDetails({
            email: '',
            password: '',
          });
        }
  
    }
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {/* Left side (green background) */}
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
              Find your Dream <br />
              Job Here
            </h2>
            <img
              className="justify-content-center"
              src="https://arkca.com/assets/img/login.gif"
              alt="no image"
              style={{ width: '100%' }}
            />
          </div>

          {/* Right side (blue background) */}
          <div
            className="col-md-7 d-flex flex-column"
            style={{ backgroundColor: '#6EFDE5', height: '100vh' }}
          >
            {/* Header section with logo and signup link */}
            <div className="container d-flex justify-content-between">
              <img className="mt-4" style={{ width: '120px' }} src={logo} alt="logo" />
              <p className="mt-5">
                Don't have an account? <Link to={'/register'}><span className="text-primary">Sign up</span></Link>
              </p>
            </div>

            {/* Centered login form section */}
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
                Login to Job Finder
              </h2>
              <p className='mt-2 mb-5'>Now you can find your dream jobs in Job Finder</p>

              <div className="d-flex justify-content-center align-items-center flex-column" style={{ width: '80%' }}>
                <input
                  type="text"
                  placeholder="Email Id"
                  className="form-control mb-3"
                  value={logDetails.email}
                  onChange={(e)=>setLogDetails({...logDetails,email:e.target.value})}
                  style={{ width: '80%' }}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control mb-2"
                  value={logDetails.password}
                  onChange={(e)=>setLogDetails({...logDetails,password:e.target.value})}
                  style={{ width: '80%' }}
                />
                <p className="text-primary">Forgotten password?</p>
                
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

export default Login;