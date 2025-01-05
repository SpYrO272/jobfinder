import React from 'react'
import { Link } from 'react-router-dom'

function Pagenotfound() {
  return (
    <div className='container-fluid mt-5'>
        <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8 d-flex justify-content-center align-items-center flex-column">
                <img src="https://www.scopycode.com/includes/images/blog/error_404.gif" alt="no image" className='w-50'/>
                <h1>Look like you're lost</h1>
                <h5>The page you ae looking is unavailable</h5>
                <Link to={'/'}><button className='btn btn-success mt-3 rounded-0'>Back Home</button></Link>
            </div>
            <div className='col-md-2'> </div>
        </div>

    </div>
  )
}

export default Pagenotfound