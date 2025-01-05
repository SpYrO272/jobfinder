import { faFacebook, faInstagram, faLinkedin, faRProject } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import logo1 from '../assets/logo1.png';
import { Link } from 'react-router-dom';
function Footer() {
  return (
    <div className='container-fluid p-3' style={{backgroundColor:'#87C8E0'}}>
        <div className="row">
            <div className="col-md-4">
                <div className='d-flex '>
                  <img src={logo1} style={{ width: '120px' }} alt="" />
                  <h3 className='mt-3 ms-3' style={{fontFamily:'Archivo Black, sans-serif',fontWeight:'800'}}>Job Finder</h3>
                  </div>
               
                <p style={{textAlign:'justify'}}>Platform that connects job seekers with employers, offering job search tools and resume upload features. It allows users to apply directly to listings and track their applications. Personalized job alerts and career resources are also commonly available to help users find opportunities.</p>

            </div>
            <div className="col-md-2 d-md-flex justify-content-center">
                <div>
                    <h3 className='text-dark mb-4 mt-3' style={{fontFamily:'Archivo Black, sans-serif',fontWeight:'800'}}>Links</h3>
                    <Link to={'/'}><p>Home</p></Link>
                    <p>About us</p>
                    <p>Contact us</p>
                </div>
            </div>
            <div className="col-md-2 d-md-flex justify-content-center ">
                <div>
                    <h3 className='text-dark mb-4 mt-3' style={{fontFamily:'Archivo Black, sans-serif',fontWeight:'800'}}>Download</h3>
                    <p>Google Play</p>
                    <p>Windows</p>
                    <p>Apps Store</p>
                </div>
            </div>

            <div className="col-md-4 px-md-5">
                <h3 className='text-dark mt-3 mb-4' style={{fontFamily:'Archivo Black, sans-serif',fontWeight:'800'}}>Contact Us</h3>
                <div className='d-flex mt-4 mb-4'>
                    <input type="text" placeholder='Email Id' className='form-control'/>
                    <button className='btn btn-warning ms-3'>Subscribe</button>
                </div>
                <div className='d-flex justify-content-around mt-4'>
                <FontAwesomeIcon icon={faInstagram} className='fa-2x' />
                <FontAwesomeIcon icon={faTwitter} className='fa-2x'/>
                <FontAwesomeIcon icon={faLinkedin} className='fa-2x'/>
                <FontAwesomeIcon icon={faFacebook} className='fa-2x'/>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Footer