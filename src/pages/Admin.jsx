import React, { useEffect, useState } from 'react';
import './Admin.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faListCheck, faSuitcase, faBars } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getFormDataApi } from '../services/allApi';


function Admin() {
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formDetails, setFormDetails] = useState([])
  const [jobDetails, setJobDetails] = useState({
    jobTitle: '',
    jobDescription: '',
    company:'',
    location: '',
    salary: '',
    jobType: '',
    deadline: '',
    experience: '',
  });

  const [jobs, setJobs] = useState([]); 
  const [shortlistedCount, setShortlistedCount] = useState(0);



const handleShortlist = (id) => {
  
  setShortlistedCount(shortlistedCount + 1);  
  console.log(`Applicant with ID ${id} has been shortlisted.`);
};

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setJobDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
  };
  
  const getformDetails = async()=>{
    const result = await getFormDataApi()
    // console.log(result);
    setFormDetails(result.data)
  }
  console.log(formDetails);
  

  useEffect(()=>{
    getformDetails()

  },[])
    // Fetch jobs from the server
    useEffect(() => {
      const fetchJobs = async () => {
        try {
          const response = await fetch('http://localhost:5000/jobs');
          if (response.ok) {
            const jobsData = await response.json();
            setJobs(jobsData); // Update the state with fetched jobs
          } else {
            console.error('Failed to fetch jobs.');
          }
        } catch (error) {
          console.error('Error fetching jobs:', error);
        }
      };
    
      fetchJobs();
    }, []);

  // Handle form submission to post job
  const handlePostJob = async(e) => {
    e.preventDefault();


     if (
      !jobDetails.jobTitle ||
      !jobDetails.jobDescription ||
      !jobDetails.company ||
      !jobDetails.location ||
      !jobDetails.salary ||
      !jobDetails.jobType ||
      !jobDetails.deadline ||
      !jobDetails.experience
    ) {
      toast.error('Please fill in all the fields!');
      return;
    }

    const newJob = {
      ...jobDetails,
      postedDate: new Date().toISOString().split('T')[0],
    };

    try {
      // Send data to the backend
      const response = await fetch('http://localhost:5000/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newJob),
      });
  
      if (response.ok) {
        const savedJob = await response.json();
        toast.success('Job posted successfully!');
        
        
        setJobs((prevJobs) => [...prevJobs, savedJob]);
  
      
        setJobDetails({
          jobTitle: '',
          jobDescription: '',
          company:'',
          location: '',
          salary: '',
          jobType: '',
          deadline: '',
          experience: '',
        });
      } else {
        toast.error('Failed to post the job!');
      }
    } catch (error) {
      console.error('Error posting job:', error);
      toast.error('Server error. Please try again later.');
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      
      const response = await fetch(`http://localhost:5000/jobs/${jobId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        toast.success('Job deleted successfully!');
        setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      } else {
        toast.error('Failed to delete job!');
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      toast.error('Server error. Please try again later.');
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'Dashboard':
        return (
          <div style={{ backgroundColor: '#FEFACF', height: '100vh', width: '100%' }}>
            <h1 style={{
              textAlign: 'center',
              marginBottom: '80px',
              marginTop:'20px',
              fontFamily: "Archivo Black, sans-serif",
              fontWeight: "800",
              fontSize: "2rem"
            }}>Dashboard</h1>
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              gap: '20px',
              flexWrap: 'wrap',
            }}>
              {/* Card 1 */}
              <div style={{
                width: '350px',
                padding: '30px',
                backgroundColor: '#10047D',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                borderRadius: '10px',
                textAlign: 'center',
              }}>
                <h3 className='mb-4' style={{
                  fontFamily: "Archivo Black, sans-serif",
                  fontWeight: "800",
                  fontSize: "1.8rem",
                  color: "#ffffff"
                }}><FontAwesomeIcon icon={faSuitcase} size="xl" /> Total Jobs</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffffff' }}>{jobs.length}</p>
              </div>

              {/* Card 2 */}
              <div style={{
                width: '340px',
                padding: '30px',
                backgroundColor: '#50C350',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                borderRadius: '10px',
                textAlign: 'center',
              }}>
                <h3 className='mb-4' style={{
                  fontFamily: "Archivo Black, sans-serif",
                  fontWeight: "800",
                  fontSize: "1.8rem",
                  color: "#ffffff"
                }}><FontAwesomeIcon icon={faCircleCheck} size="xl" /> Applied Jobs</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: "#ffffff" }}>{formDetails.length}</p>
              </div>

              {/* Card 3 */}
              <div style={{
                width: '350px',
                padding: '30px',
                backgroundColor: '#EE2F2F',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                borderRadius: '10px',
                textAlign: 'center',
              }}>
                <h3 className='mb-4' style={{
                  fontFamily: "Archivo Black, sans-serif",
                  fontWeight: "800",
                  fontSize: "1.8rem",
                  color: "#ffffff"
                }}><FontAwesomeIcon icon={faListCheck} size="xl" /> Shortlisted</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: "#ffffff" }}>{shortlistedCount}</p>
              </div>
            </div>
          </div>
        );
      case 'Post Job':
        return (
          <div style={{ padding: '20px' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '80px', fontFamily: "Archivo Black, sans-serif", fontWeight: "800", fontSize: "2rem" }}>
            Post a Job
          </h1>
          <form className="container" onSubmit={handlePostJob}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="jobTitle" className="form-label">Job Title</label>
                <input
                  type="text"
                  id="jobTitle"
                  className="form-control"
                  placeholder="Enter job title"
                  value={jobDetails.jobTitle}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="jobDescription" className="form-label">Job Description</label>
                <textarea
                  id="jobDescription"
                  className="form-control"
                  rows="3"
                  placeholder="Enter job description"
                  value={jobDetails.jobDescription}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="company" className="form-label">Company</label>
                <input
                  type="text"
                  id="company"
                  className="form-control"
                  placeholder="Enter Company name"
                  value={jobDetails.company}
                  onChange={handleInputChange}
                />
              </div>
            <div className="col-md-6">
                <label htmlFor="location" className="form-label">Location</label>
                <input
                  type="text"
                  id="location"
                  className="form-control"
                  placeholder="Enter job location"
                  value={jobDetails.location}
                  onChange={handleInputChange}
                />
              </div>
            </div>  
              <div className='row mb-3'>
              <div className="col-md-6 mt-2">
                <label htmlFor="experience" className="form-label">Experience</label>
                <input
                  type="number"
                  id="experience"
                  className="form-control"
                  placeholder="Enter Experience"
                  value={jobDetails.experience}
                  onChange={handleInputChange}
                />
              </div>
                <div className="col-md-6">
                  <label htmlFor="salary" className="form-label">Salary</label>
                  <input
                    type="number"
                    id="salary"
                    className="form-control"
                    placeholder="Enter salary"
                    value={jobDetails.salary}
                    onChange={handleInputChange}
                  />
                </div>
              
              </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="jobType" className="form-label">Job Type</label>
                <select
                  id="jobType"
                  className="form-select"
                  value={jobDetails.jobType}
                  onChange={handleInputChange}
                >
                  <option value="">Select job type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="deadline" className="form-label">Application Deadline</label>
                <input
                  type="date"
                  id="deadline"
                  className="form-control"
                  value={jobDetails.deadline}
                  onChange={handleInputChange}
                />
              </div>
              
            </div>
            <div className="text-center mt-5 ">
              <button type="submit" className="btn btn-success">Post Job</button>
            </div>
          </form>
        </div>
      );
      
      case 'List Job':
        return (
          <div style={{ padding: '20px' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '20px', fontFamily: "Archivo Black, sans-serif", fontWeight: "800", fontSize: "2rem" }}>
            List a Job
          </h1>
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Sl. No</th>
                  <th scope="col">Job Title</th>
                  <th scope="col">Company</th>
                  <th scope="col">Experience</th>
                  <th scope="col">Last Date to Apply</th>
                  <th scope="col">Location</th>
                  <th scope="col">Job Posted</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{job.jobTitle}</td>
                    <td>{job.company}</td> 
                    <td>{job.experience} years</td>
                    <td>{job.deadline}</td>
                   
                    <td>{job.location}</td>
                    <td>{job.postedDate}</td>
                    <td>
                      <button className="btn btn-danger btn-sm" >Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        );
      case 'View Resume':
        return (
          <div style={{ padding: '20px' }}>
      <h1 style={{
        textAlign: 'center',
        marginBottom: '20px',
        fontFamily: "Archivo Black, sans-serif",
        fontWeight: "800",
        fontSize: "2rem",
      }}>
        Resumes
      </h1>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th scope="col">Sl. No</th>
              <th scope="col">Applicant Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone No:</th>
             
              <th scope="col">Resume</th>
              <th scope="col">Shortlist</th>
            </tr>
          </thead>
          <tbody>
            {/* Row */}
            {formDetails?.map((item,index)=>(
              <tr key={index}>
              <td>{index+1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>
              <a href={`/path/to/resumes/${encodeURIComponent(item.resume)}`} className="btn btn-primary btn-sm" download>
  {item.resume}
</a>

              </td>
              <td>
              <button
                    className={`btn btn-sm ${item.shortlisted ? 'btn-success' : 'btn-outline-success'}`}
                    onClick={() => handleShortlist(item._id)}
                    disabled={item.shortlisted} 
                  >
                    {item.shortlisted ? 'Shortlisted' : 'Shortlist'}
                  </button>
              </td>
            </tr>
            ))}
          
          </tbody>
        </table>
      </div>
    </div>
        );
      default:
        return <div><h1>Dashboard</h1><p>Welcome to the admin dashboard!</p></div>;
    }
  };

  return (
    <div style={{ display: 'flex', backgroundColor: '#FEFACF', height: '100vh', width: '100%' }}>
      {/* Sidebar */}
      <aside
  className={`p-4 ${sidebarOpen ? 'd-block position-absolute w-100' : 'd-none d-md-block'}`}
  style={{
    height: '100vh',
    width: '18%',
    zIndex: 1000,
    backgroundColor: '#85F783',
    margin: 0,
    padding: 0,
  }}
>
  <div className="profile d-flex justify-content-center align-items-center flex-column">
    <img
      src="https://img.freepik.com/premium-photo/stylish-man-flat-vector-profile-picture-ai-generated_606187-310.jpg"
      alt="Profile"
      style={{
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        marginBottom: '20px',
        marginTop: '30px',
      }}
    />
    <h4>Admin</h4>
  </div>
  <nav className="d-flex flex-column align-items-center mt-4">
    <ul
      className="list-unstyled w-100 text-center"
      style={{
        padding: 0,
      }}
    >
      <li className="mb-3">
        <button
          className="sidebar-btn w-75 mt-4"
          onClick={() => {
            setActiveSection('Dashboard');
            setSidebarOpen(false);
          }}
        >
          Dashboard
        </button>
      </li>
      <li className="mb-3">
        <button
          className="sidebar-btn w-75 mt-4"
          onClick={() => {
            setActiveSection('Post Job');
            setSidebarOpen(false);
          }}
        >
          Post Job
        </button>
      </li>
      <li className="mb-3">
        <button
          className="sidebar-btn w-75 mt-4"
          onClick={() => {
            setActiveSection('List Job');
            setSidebarOpen(false);
          }}
        >
          List Job
        </button>
      </li>
      <li className="mb-3">
        <button
          className="sidebar-btn w-75 mt-4"
          onClick={() => {
            setActiveSection('View Resume');
            setSidebarOpen(false);
          }}
        >
          View Resume
        </button>
      </li>
    </ul>
  </nav>
</aside>

      {/* Main*/}
      <main style={{ flex: 1, padding: '20px' }}>
        <button
          className="btn btn-outline-primary d-md-none mb-3"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FontAwesomeIcon icon={faBars} /> Menu
        </button>
        {renderSection()}
      </main>
      <ToastContainer theme="colored" position="top-center" autoClose={2000} />
    </div>
  );
}

export default Admin;
