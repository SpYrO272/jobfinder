import React, { useState } from 'react'
import logo from '../assets/logo1.png';
import { Link, useNavigate } from 'react-router-dom';
import { registerApi } from '../services/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Register() {
  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState({
    username:"",
    email:"",
    password:""
  })

  console.log(userDetails);
  
  const handleRegister = async()=>{
    const {username,email,password} = userDetails
    if(!username || !email || !password){
      toast.info('Please fill the form')
    }
    else{
      const result = await registerApi(userDetails)
      console.log(result);
      if(result.status==200){
        toast.success("Registration Successfull")
        setUserDetails({
          username:"",
          email:"",
          password:""
          
        })
        navigate('/login')
      }
      else if(result.status==406){
        toast.warning(result.response.data)
      }
      else{
        toast.error("Something went wrong")
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
          style={{ backgroundColor: '#61D9E7', height: '100vh' }}
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
            Register now and <br /> Unlock<br />
            New Carrer Opportunites
          </h2>
          <img
            className="justify-content-center"
            src="https://img1.picmix.com/output/stamp/normal/0/5/3/4/1784350_8c376.gif"
            alt="no image"
            style={{ width: '40%' }}
          />
        </div>

        {/* Right side (blue background) */}
        <div
          className="col-md-7 d-flex flex-column"
          style={{ backgroundColor: '#FF6B6B', height: '100vh' }}
        >
          {/* Header section with logo and signup link */}
          <div className="container d-flex justify-content-between">
            <img className="mt-4" style={{ width: '120px' }} src={logo} alt="logo" />
            <p className="mt-5">
              Already have an account? <Link to={'/login'}><span className="text-primary">Sign in</span></Link>
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
              Register to Job Finder
            </h2>
            <p className='mt-2 mb-5'>Discover the jobs that matches your skills and ambitions!</p>

            <div className="d-flex justify-content-center align-items-center flex-column" style={{ width: '80%' }}>
              <input
                type="text"
                placeholder="Username"
                className="form-control mb-3"
                value={userDetails.username}
                onChange={(e)=>setUserDetails({...userDetails,username:e.target.value})}
                style={{ width: '80%' }}
              />
              <input
                type="text"
                placeholder="Email ID"
                className="form-control mb-3"
                value={userDetails.email}
                onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})}
                style={{ width: '80%' }}
              />

<input
                type="password"
                placeholder="Password"
                className="form-control mb-2"
                value={userDetails.password}
                onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})}
                style={{ width: '80%' }}
              />
              <p className="text-primary">Forgotten password?</p>
              
                
              <button onClick={handleRegister} className="btn btn-primary border-0" style={{ width: '80%' }}>
                Register
              </button>
                
                
            </div>
          </div>
        </div>
      </div>
    </div>
    <ToastContainer theme='colored' position='top-center' autoClose={2000}/>
  </>
  )
}

export default Register