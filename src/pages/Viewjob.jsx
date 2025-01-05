import React, { useEffect,useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import ust from '../assets/ust.png';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

function Viewjob() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [job, setJob] = useState(null); // State to hold the job data
  const { id } = useParams(); // Get the job ID from the URL parameters
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    resume: null, // For file upload
  });

  const handleFileChange = (e) => {
    setFormData((prevData) => ({ ...prevData, resume: e.target.files[0] }));
  };
 // Handle form field changes
 const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({ ...prevData, [name]: value }));
};

  // Handle form submission
  const handleSubmit = () => {
    const { name, email, phone, address, resume } = formData;

    // Validation: Check if all fields are filled
    if (!name || !email || !phone || !address || !resume) {
      toast.error('Please fill in all fields and upload a resume.', {
        position: 'top-center',
        autoClose: 2000,
        theme: 'colored',
      });
      return;
    }

    // Simulate successful submission
    Swal.fire({
      title: 'Success!',
      text: 'Your job application and resume have been successfully submitted! We will review your application and contact you if shortlisted. Thank you for applying!',
      icon: 'success',
      button: 'Okay',
    });
    // Close modal after a short delay
    setTimeout(() => handleClose(), 2000);
  };
 



  // Fetch job data from the server
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`http://localhost:5000/jobs/${id}`); // Fetch job by ID
        if (!response.ok) {
          throw new Error('Failed to fetch job');
        }
        const jobData = await response.json();
        setJob(jobData); // Set the job data to state
      } catch (error) {
        console.error(error);
      }
    };

    fetchJob();
  }, [id]);

  // Show loading state or error if job is not found
  if (!job) {
    return <p>Loading...</p>; // Or handle error case here
  }

  return (
    <>
      <div style={{ backgroundColor: '#C0EEFF', width: '100%', minHeight: '100vh' }}>
        <div className="container-fluid p-5">
          <div className="position-relative d-flex align-items-center">
            {/* Logo and Company Name */}
            <img
              src={ust}
              alt="UST logo"
              className="img-fluid" // Bootstrap class for responsive image
              style={{
                width: '6%', // Keeps the aspect ratio intact
                maxWidth: '6%', // Ensures the image doesn't exceed 60% of the parent width on large screens
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
            <FontAwesomeIcon
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
            />
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

          {/* Apply Button */}
          <button onClick={handleShow} className="border-0 px-4 py-1 mt-3" style={{ backgroundColor: '#F46236', color: '#FFFFFF' }}>
            Apply
          </button>

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
      </Modal>
        </div>
      </div>
    </>
  );
}

export default Viewjob;
