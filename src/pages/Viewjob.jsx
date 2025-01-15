import React, { useEffect,useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import ust from '../assets/ust.png';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

function Viewjob() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [job, setJob] = useState(null); 
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    resume: null, 
  });

  const handleFileChange = (e) => {
    setFormData((prevData) => ({ ...prevData, resume: e.target.files[0] }));
  };
 
 const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({ ...prevData, [name]: value }));
};


  const handleSubmit = () => {
    const { name, email, phone, address, resume } = formData;

    if (!name || !email || !phone || !address || !resume) {
      toast.error('Please fill in all fields and upload a resume.', {
        position: 'top-center',
        autoClose: 2000,
        theme: 'colored',
      });
      return;
    }

   
    Swal.fire({
      title: 'Success!',
      text: 'Your job application and resume have been successfully submitted! We will review your application and contact you if shortlisted. Thank you for applying!',
      icon: 'success',
      button: 'Okay',
    });
    
    setTimeout(() => handleClose(), 2000);
  };
 



  // Fetch job data from the server
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`http://localhost:5000/jobs/${id}`); 
        if (!response.ok) {
          throw new Error('Failed to fetch job');
        }
        const jobData = await response.json();
        setJob(jobData); 
      } catch (error) {
        console.error(error);
      }
    };

    fetchJob();
  }, [id]);


  if (!job) {
    return <p>Loading...</p>; 
  }

  return (
    <>
      <div style={{ backgroundColor: '#C0EEFF', width: '100%', minHeight: '100vh' }}>
        <div className="container-fluid p-5">
          <div className="position-relative d-flex align-items-center">
            
            <img
              src={ust}
              alt="UST logo"
              className="img-fluid" 
              style={{
                width: '6%', 
                maxWidth: '6%', 
              }}
            />
            <h2
              className="ms-3 mt-4"
              style={{
                fontFamily: 'Archivo Black, sans-serif',
                fontWeight: '800',
                fontSize: '2.5rem',
                color: '#001567',
              }}
            >
              {job.company}
            </h2>
            
            {/* Bookmark Icon */}
            {/* <FontAwesomeIcon
              icon={faBookmark} 
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                fontSize: '2.5rem',
                color: '#2124D4',
                cursor: 'pointer',
              }}
              className="m-3"
            /> */}
          </div>

          {/* Job Title */}
          <h3
            className="mt-4"
            style={{
              fontFamily: 'Archivo Black, sans-serif',
              fontWeight: '800',
              fontSize: '1.6rem',
              color: '#2124D4',
            }}
          >
            {job.jobTitle}
          </h3>

          {/* Description Section */}
          <p className="mt-5" style={{ fontWeight: '600', fontSize: '1.4rem' }}>Description</p>
          <hr />

          {/* Job Details */}
          <p className="mb-2" style={{ fontSize: '1.4rem' }}>
            <span style={{ fontWeight: '600' }}>Role :</span> {job.jobTitle}
          </p>
          <p className="mb-2" style={{ fontSize: '1.4rem' }}>
            <span style={{ fontWeight: '600' }}>Type :</span> {job.jobType}
          </p>
          <p className="mb-2" style={{ fontSize: '1.4rem' }}>
            <span style={{ fontWeight: '600' }}>Location :</span> {job.location}
          </p>
          <p className="mb-2" style={{ fontSize: '1.4rem' }}>
            <span style={{ fontWeight: '600' }}>Description :</span> {job.jobDescription}
          </p>
          <p className="mb-2" style={{ fontSize: '1.4rem' }}>
            <span style={{ fontWeight: '600' }}>Experiences :</span> {job.experience}
          </p>
          <p className="mb-2" style={{ fontSize: '1.4rem' }}>
            <span style={{ fontWeight: '600' }}>Salary :</span> {job.salary}
          </p>
          <p className="mb-2" style={{ fontSize: '1.4rem' }}>
            <span style={{ fontWeight: '600' }}>Posted Date :</span> {job.deadline}
          </p>

   
          <Button
              onClick={() => navigate('/jobs')} 
              className='mt-5 p-1 px-0'
              variant="secondary"
              style={{
               width:'10%',
                fontSize: '1.5rem',
                color: '#FFFFFF',
                cursor: 'pointer',
               
              }}
            >
              Back
            </Button>

          {/* <Modal show={show} onHide={handleClose}>
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
                                onChange={handleChange}
                              />
                            </div>
                            <div className='mt-3'>
                              <input
                                type="email"
                                placeholder='Email Id'
                                name="email"
                                className='form-control'
                                value={formData.email}
                                onChange={handleChange}
                              />
                            </div>
                            <div className='mt-3'>
                              <input
                                type="text"
                                placeholder='Phone Number'
                                name="phone"
                                className='form-control'
                                value={formData.phone}
                                onChange={handleChange}
                              />
                            </div>
                            <div className='mt-3'>
                              <textarea
                                className='form-control'
                                placeholder='Address'
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                              ></textarea>
                            </div>
                            <div className='mt-3'>
                              <input type="file" onChange={handleFileChange} />
                            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleSubmit}>
            Submit
          </Button>
          <ToastContainer position='top-center' autoClose={2000} theme='colored'/>

        </Modal.Footer>
      </Modal> */}
        </div>
      </div>
    </>
  );
}

export default Viewjob;
