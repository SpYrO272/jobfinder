import React, { useState } from "react";
import man from "../assets/man.png";
import acc from "../assets/account.webp";
import search from "../assets/search.png"
import apply from "../assets/apply.png"
import Header from "../components/Header";
import Footer from "../components/Footer"
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';

function Home() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status
  

  const handleLogout = () => {
    setIsLoggedIn(false); // Reset login state to false
    sessionStorage.removeItem("token"); // Optionally remove the token
    // Redirect to login page (optional)
  };
  
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100vh",
          backgroundImage: `url(https://images.unsplash.com/photo-1619252584172-a83a949b6efd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container-fluid">
          <div className="row">
            <Header isLoggedIn={isLoggedIn}  handleLogout={handleLogout} />
            <div className="col-1 col-md-1"></div>

            {/* Hide the man image */}
            <div className="col-10 col-md-4 text-center text-md-start d-none d-md-block">
              <img src={man} alt="man illustration" className="img-fluid" />
            </div>

            <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
              <div className="text-center">
                <h2
                  style={{
                    fontFamily: "Archivo Black, sans-serif",
                    fontWeight: "800",
                    fontSize: "4.5rem",
                    color: "#001567",
                  }}
                  className="responsive-heading"
                >
                  Start Your Career <br /> Journey Today
                </h2>
                <p className="fs-4 mt-4">
                  Discover roles aligned with your unique skills and
                  aspirations,<br /> paving the way for a fulfilling career.
                </p>
                {/* <div className="d-flex flex-column flex-md-row mt-4 justify-content-center align-items-center">
                  <input
                    type="text"
                    placeholder="Job Title"
                    className="form-control mb-2 mb-md-0 w-100 w-md-25"
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    className="form-control mb-2 mb-md-0 w-100 w-md-25 ms-md-2 me-md-2"
                  />
                  <button
                    className="btn btn-primary w-100 w-md-auto border-0"
                    style={{ backgroundColor: "#5DC7EE" }}
                  >
                    Search
                  </button>
                </div> */}
              </div>
            </div>
            <div className="col-1 col-md-1"></div>
          </div>
        </div>
      </div>
{/* category section */}
      <div  style={{ backgroundColor: "#EBF9FF", width: "100%" }}>
  <div className="container-fluid pb-5">
    <h2
      className="text-center pt-5"
      style={{
        fontFamily: "Archivo Black, sans-serif",
        fontWeight: "800",
        color: "#001567",
      }}
    >
      Categories
    </h2>
    <p className="text-center">Explore diverse job categories tailored to match your interests and expertise</p>
    
    {/* First Row */}
    <div className="row justify-content-center">
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center my-3">
        <Card className="p-3" style={{ backgroundColor: "#BCF5F3", width: "100%", maxWidth: "20rem" }}>
          <Card.Img
            variant="top"
            src="https://www.simplilearn.com/ice9/free_resources_article_thumb/How_to_Learn_Web_Designing.jpg"
            style={{ width: "100%", height: "14rem", objectFit: "cover" }}
          />
          <Card.Body>
            <Card.Title className="text-center" style={{ fontFamily: "Archivo Black, sans-serif", fontWeight: "800", fontSize: "1.3rem", color: "#001567" }}>
              Web Designing
            </Card.Title>
            <div className="d-flex justify-content-center">
              <Button className="border-0" variant="primary" style={{ backgroundColor: '#5DC7EE' }}>Available : 4</Button>
            </div>
          </Card.Body>
        </Card>
      </div>
      
      {/* Repeat Card with Graphic Designing */}
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center my-3">
        <Card className="p-3" style={{ backgroundColor: "#BCF5F3", width: "100%", maxWidth: "20rem" }}>
          <Card.Img
            variant="top"
            src="https://omxtechnologies.com/wp-content/uploads/2024/07/img2.2.jpg"
            style={{ width: "100%", height: "14rem", objectFit: "cover" }}
          />
          <Card.Body>
            <Card.Title className="text-center" style={{ fontFamily: "Archivo Black, sans-serif", fontWeight: "800", fontSize: "1.3rem", color: "#001567" }}>
              Graphic Designing
            </Card.Title>
            <div className="d-flex justify-content-center">
              <Button className="border-0" variant="primary" style={{ backgroundColor: '#5DC7EE' }}>Available : 4</Button>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Repeat Card with Web Development */}
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center my-3">
        <Card className="p-3" style={{ backgroundColor: "#BCF5F3", width: "100%", maxWidth: "20rem" }}>
          <Card.Img
            variant="top"
            src="https://media.licdn.com/dms/image/D5612AQGvXXjCBq-Etg/article-cover_image-shrink_600_2000/0/1688710312431?e=2147483647&v=beta&t=Sr-TVjdDa7XsqxzaOEM9IGB7plCwHCm5ihB2cyglZMc"
            style={{ width: "100%", height: "14rem", objectFit: "cover" }}
          />
          <Card.Body>
            <Card.Title className="text-center" style={{ fontFamily: "Archivo Black, sans-serif", fontWeight: "800", fontSize: "1.3rem", color: "#001567" }}>
              Web Development
            </Card.Title>
            <div className="d-flex justify-content-center">
              <Button className="border-0" variant="primary" style={{ backgroundColor: '#5DC7EE' }}>Available : 4</Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>

   
    
  </div>
</div>
{/* next section */}
<div style={{ backgroundColor: "#F8F1F0", width: "100%" }}>
  <div className="container-fluid pb-5">
  <h2
      className="text-center pt-5"
      style={{
        fontFamily: "Archivo Black, sans-serif",
        fontWeight: "800",
        color: "#001567",
      }}
    >
      How it Works?
    </h2>

    <p className="text-center mb-5">Simple steps to connect you with your ideal job: search, apply, and get hired!</p>

    <div className="row justify-content-center">
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center my-3">
          <Card className="p-3" style={{ backgroundColor: "#FBB1B1", width: "100%", maxWidth: "20rem" }}>
            <div className="d-flex justify-content-center align-items-center">
              <Card.Img
                variant="top"
                src={acc}
                style={{ width: "50%", height: "80%" }}
              />
            </div>
            <Card.Body>
              <Card.Title className="text-center" style={{ fontFamily: "Archivo Black, sans-serif", fontWeight: "800", fontSize: "1.3rem", color: "#001567" }}>
                Create account
              </Card.Title>
        
            </Card.Body>
          </Card>
        </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center my-3">
          <Card className="p-3" style={{ backgroundColor: "#78AEEB", width: "100%", maxWidth: "20rem" }}>
            <div className="d-flex justify-content-center align-items-center">
              <Card.Img
                variant="top"
                src={search}
                style={{ width: "50%", height: "80%" }}
              />
            </div>
            <Card.Body>
              <Card.Title className="text-center" style={{ fontFamily: "Archivo Black, sans-serif", fontWeight: "800", fontSize: "1.3rem", color: "#001567" }}>
                Search jobs
              </Card.Title>
        
            </Card.Body>
          </Card>
        </div>
  
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center my-3">
          <Card className="p-3" style={{ backgroundColor: "#93F9A2", width: "100%", maxWidth: "20rem" }}>
            <div className="d-flex justify-content-center align-items-center">
              <Card.Img
                variant="top"
                src={apply}
                style={{ width: "75%", height: "90%" }}
              />
            </div>
            <Card.Body>
              <Card.Title className="text-center" style={{ fontFamily: "Archivo Black, sans-serif", fontWeight: "800", fontSize: "1.3rem", color: "#001567" }}>
                Apply
              </Card.Title>
        
            </Card.Body>
          </Card>
        </div>
    </div>

    
  </div>

</div>
      {/* Additional CSS for responsive text styling */}
      <style jsx>{`
        @media (max-width: 768px) {
          .responsive-heading {
            font-size: 2rem; /* Smaller font size for smaller screens */
          }
          .responsive-paragraph {
            font-size: 1rem; /* Adjust paragraph font size for readability */
          }
        }
        @media (max-width: 576px) {
          .responsive-heading {
            font-size: 1.8rem;
          }
          .responsive-paragraph {
            font-size: 0.9rem;
          }
        }
      `}</style>
      <Footer/>
    </>
  );
}

export default Home;
