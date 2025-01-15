import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import Footer from '../components/Footer';
import './Jobs.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { addFormDataApi } from '../services/allApi';


function Jobs() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [show, setShow] = useState(false);

  const handleClose = () =>{ setShow(false);
    handleCancel()
  }  
  const handleShow = () => setShow(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [jobs, setJobs] = useState([]); 
  const [selectedJobType, setSelectedJobType] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedSalary, setSelectedSalary] = useState('');
  const [filterKey, setFilterKey] = useState(0); 
   const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    resume: "", 
  });
  const [token,setToken] = useState("")
  console.log(formData);
  console.log(token);
  

  const handleCancel = ()=>{
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      resume: "", 

    })
  }

  const handleLogout = () => {
    setIsLoggedIn(false); 
    sessionStorage.removeItem("token");
   
  };
  
  const handleSubmit = async()=>{
    const {name,email,phone,address,resume}= formData
    if(!name || !email || !phone || !address || !resume){
      toast.error('Please fill in all fields and upload a resume.', {
        position: 'top-center',
        autoClose: 2000,
        theme: 'colored',
      });
    }
    else{
      //append
      const reqBody = new FormData()

      reqBody.append("name",name)
      reqBody.append("email",email)
      reqBody.append("phone",phone)
      reqBody.append("address",address)
      reqBody.append("resume",resume)


     if(token){
      const reqHeader = {
        "Content-Type" : "multipart/form-data",
        "Authorization":`Bearer ${token}`
      }
      const result = await addFormDataApi(reqBody,reqHeader)
      console.log(result);
      if(result.status==200){
        Swal.fire({
          title: 'Success!',
          text: 'Your job application and resume have been successfully submitted! We will review your application and contact you if shortlisted. Thank you for applying!',
          icon: 'success',
          button: 'Okay',
        });
        handleClose()
        
      }
      else if(result.status==406){
        toast.warning(result.response.data)
        handleCancel()
      }
      else{
        toast.error('Something went wrong')
        handleClose()
      }
      
     }
     else{
      toast.warning('Please Login')
     }
    }
  }
  const handleFile = (e)=>{
    // console.log(e.target.files[0]);
    setFormData({...formData, resume:e.target.files[0]})
    
  }
  
  const filteredJobs = jobs.filter(job => {
    const matchesJobType = selectedJobType ? job.jobType === selectedJobType : true;
    const matchesLocation = selectedLocation ? job.location === selectedLocation : true;
    
    const matchesSalary = selectedSalary
    ? (() => {
        const salaryValue = selectedSalary;
        if (salaryValue === "1000000+") {
          return job.salary > 100000; 
        }
        const [minSalary, maxSalary] = salaryValue.split('-').map(Number);
        if (maxSalary) {
          return job.salary >= minSalary && job.salary <= maxSalary;
        }
        return job.salary >= minSalary; 
      })()
    : true;

  return matchesJobType && matchesLocation && matchesSalary;
  });
  
  const handleClearFilters = () => {
    setSelectedJobType('');
    setSelectedLocation('');
    setSelectedSalary('');
    setFilterKey((prevKey) => prevKey + 1); 
  };

//   const handleFileChange = (e) => {
//     setFormData((prevData) => ({ ...prevData, resume: e.target.files[0] }));
//   };
//  // Handle form field changes
//  const handleChange = (e) => {
//   const { name, value } = e.target;
//   setFormData((prevData) => ({ ...prevData, [name]: value }));
// };




  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Fetch jobs from the server
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/jobs'); 
        if (!response.ok) throw new Error('Failed to fetch jobs');
        const data = await response.json();
        setJobs(data); 

      const processedData = data.map(job => ({
        ...job,
        salary: String(job.salary), 
      }));

      setJobs(processedData);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
      setIsLoggedIn(true)
    }
  },[])

  return (
    <>
      <div className="bg" style={{
        width: "100%",
        minHeight: "100vh",
        backgroundImage:'url("https://images.unsplash.com/photo-1619252584172-a83a949b6efd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' ,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: isMobile ? "scroll" : "fixed", 
        display: "flex",
        flexDirection: "column",
        paddingBottom: "60px", 
        overflow: "hidden", 
      }}>
        <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

        <div className="container-fluid mt-5 d-flex flex-column flex-grow-1">
          <div className="row">
            {/* Filter Section */}
            <div className="col-md-3 col-sm-12 mb-4">
              <div className="p-4 rounded shadow-sm ms-5 w-75" style={{backgroundColor:'#70A0D3'}}  key={filterKey}>
                <h2 className="h4 mb-4 text-center" style={{
                  fontFamily: 'Archivo Black, sans-serif',
                  fontWeight: '800',
                  fontSize: '1.8rem',
                  color: '#001567',
                }}>Filter Jobs</h2>
<hr />
                 {/* Job Type Filter */}
    <div className="mb-3">
      <h5 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Jobs</h5>
      <div className="form-check ">
        <input
      
          type="radio"
          name="jobType"
          id="fullTime"
          className="form-check-input "
          value="Full-time"
          onChange={(e) => setSelectedJobType(e.target.value)}
        />
        <label htmlFor="fullTime" className="form-check-label">Full-Time</label>
      </div>
      <div className="form-check">
        <input
          type="radio"
          name="jobType"
          id="partTime"
          className="form-check-input"
          value="Part-time"
          onChange={(e) => setSelectedJobType(e.target.value)}
        />
        <label htmlFor="partTime" className="form-check-label">Part-Time</label>
      </div>
      <div className="form-check">
        <input
          type="radio"
          name="jobType"
          id="internship"
          className="form-check-input"
          value="Internship"
          onChange={(e) => setSelectedJobType(e.target.value)}
        />
        <label htmlFor="internship" className="form-check-label">Internship</label>
      </div>
      
    </div>

                {/* Location Filter */}
    <div className="mb-3">
      <h5 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Location</h5>
      <div className="form-check">
        <input
          type="radio"
          name="location"
          id="trivandrum"
          className="form-check-input"
          value="Trivandrum"
          onChange={(e) => setSelectedLocation(e.target.value)}
        />
        <label htmlFor="trivandrum" className="form-check-label">Trivandrum</label>
      </div>
      <div className="form-check">
        <input
          type="radio"
          name="location"
          id="kochi"
          className="form-check-input"
          value="Kochi"
          onChange={(e) => setSelectedLocation(e.target.value)}
        />
        <label htmlFor="kochi" className="form-check-label">Kochi</label>
      </div>
      <div className="form-check">
        <input
          type="radio"
          name="location"
          id="bangalore"
          className="form-check-input"
          value="Bangalore"
          onChange={(e) => setSelectedLocation(e.target.value)}
        />
        <label htmlFor="bangalore" className="form-check-label">Bangalore</label>
      </div>
      <div className="form-check">
        <input
          type="radio"
          name="location"
          id="mumbai"
          className="form-check-input"
          value="Mumbai"
          onChange={(e) => setSelectedLocation(e.target.value)}
        />
        <label htmlFor="mumbai" className="form-check-label">Mumbai</label>
      </div>
      </div>

                 {/* Salary Filter */}
    <div className="mb-3">
      <h5 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Salary</h5>
      <div className="form-check">
        <input
          type="radio"
          name="salary"
          id="salary30k50k"
          className="form-check-input"
          value="30000-50000"
          onChange={(e) => setSelectedSalary(e.target.value)}
        />
        <label htmlFor="salary30k50k" className="form-check-label">30000-50000</label>
      </div>
      <div className="form-check">
        <input
          type="radio"
          name="salary"
          id="salary50k80k"
          className="form-check-input"
          value="50000-80000"
          onChange={(e) => setSelectedSalary(e.target.value)}
        />
        <label htmlFor="salary50k80k" className="form-check-label">50000-80000</label>
      </div>
      <div className="form-check">
        <input
          type="radio"
          name="salary"
          id="salary100k"
          className="form-check-input"
          value="1000000+"
          onChange={(e) => setSelectedSalary(e.target.value)}
        />
        <label htmlFor="salary100k" className="form-check-label">100000+</label>
      </div>
      <hr />
       {/* Clear All Filters Button */}
        <div className="mb-3">
          <button
            className="btn btn-primary w-100"
            onClick={handleClearFilters}
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </div>
  </div>

            {/* Jobs List Section */}
            <div className="col-md-9 col-sm-12">
              <div className="row">
                {/* Job Card */}
               {filteredJobs.map((job)=>(
                 <div className="col-md-3 col-sm-6 mb-4">
                 <div className="card h-100 shadow-sm p-3" style={{backgroundColor:'#D2C4DE'}}>
                   <div className="card-body ">
                     <h1 className='text-center mb-3' style={{
                  fontFamily: 'Archivo Black, sans-serif',
                  fontWeight: '800',
                  fontSize: '2rem',
                  color: '#001567',
                }}>{job.company}</h1>
                <hr />
                     <h4 className="card-title fw-bolder mb-3" style={{fontFamily: 'Archivo Black, sans-serif'}}>{job.jobTitle}</h4>
                     <p className="card-text fw-bold fs-5">Location : {job.location}</p>
                     <p className="card-text fw-bold fs-5 mb-4">Salary : {job.salary}</p>
                     
                     
                     <div className='d-flex justify-content-center align-content-center'>
                       <Link to={`/view/${job._id}`}>
                         <button className='w-100 me-5 p-2 bg-primary border-0 text-white'>View</button>
                       </Link>
                       <button onClick={handleShow} className='w-100 mx-3 ms-4 p-2 bg-danger border-0 rounded-0 text-white'>Apply</button>

                       <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{
                  fontFamily: 'Archivo Black, sans-serif',
                  fontWeight: '800',
                  fontSize: '1.8rem',
                  color: '#001567',
                }}>{job.company} - <span>Application Form</span></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='my-1'>
                              <input
                                type="text"
                                placeholder='Name'
                                name="name"
                                className='form-control'
                                value={formData.name}
                                onChange={(e)=>setFormData({...formData,name:e.target.value})}
                              />
                            </div>
                            <div className='mt-3'>
                              <input
                                type="email"
                                placeholder='Email Id'
                                name="email"
                                className='form-control'
                                 value={formData.email}
                                onChange={(e)=>setFormData({...formData,email:e.target.value})}
                              />
                            </div>
                            <div className='mt-3'>
                              <input
                                type="text"
                                placeholder='Phone Number'
                                name="phone"
                                className='form-control'
                                value={formData.phone}
                                onChange={(e)=>setFormData({...formData,phone:e.target.value})}
                              />
                            </div>
                            <div className='mt-3'>
                              <textarea
                                className='form-control'
                                placeholder='Address'
                                name="address"
                                 value={formData.address}
                                onChange={(e)=>setFormData({...formData,address:e.target.value})}
                              ></textarea>
                            </div>
                            <div className='mt-3'>
                              <input type="file"  onChange={(e)=>handleFile(e)} />
                            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleSubmit}>
            Submit
          </Button>
          <ToastContainer position='top-center' autoClose={2000} theme='colored'/>

        </Modal.Footer>
      </Modal>
                     
                     </div>
                   </div>
                 </div>
               </div>

               ))}



              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Jobs;