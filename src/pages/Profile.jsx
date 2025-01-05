import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Footer from "../components/Footer";

function Profile() {
  const [isLoggedIn] = useState(true); // Simulate user logged in

  const [selectedSection, setSelectedSection] = useState("Profile");
  const [isEditing, setIsEditing] = useState(false);
 // Check localStorage for existing profile data
 const savedProfileData = localStorage.getItem("profileData");
 const savedProfileImage = localStorage.getItem("profileImage");
  const [profileData, setProfileData] = useState(() => {
    if (savedProfileData) {
      return JSON.parse(savedProfileData);
    }
    else{
      return{
        
        name: "",
        role: "",
        aboutMe: "",
        education: [
          { level: "", institution: "", year: "", grade: "" },
          { level: "", institution: "", year: "", grade: "" },
        ],
        skills: [""],
      };
    }
      }
  )
  

  const handleLogout = () => {
    setIsLoggedIn(false); // Reset login state to false
    sessionStorage.removeItem("token"); // Optionally remove the token
    // Redirect to homepage or login page if needed
  };
  

  const [profileImage, setProfileImage] = useState(savedProfileImage || null);

  useEffect(() => {
    if (profileData) {
      localStorage.setItem("profileData", JSON.stringify(profileData));
    }
  }, [profileData]);

  useEffect(() => {
    if (profileImage) {
      localStorage.setItem("profileImage", profileImage);
    }
  }, [profileImage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleNavClick = (section) => setSelectedSection(section);

  const sections = {
    Profile: (
      <div>
        <div className="d-flex flex-column justify-content-center align-items-center text-center">
          {profileImage && (
          <div className="position-relative">
            <img
              src={profileImage}
              alt="Profile"
              className="img-fluid mb-3"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
              }}
            />
            {isEditing && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="form-control mt-2"
                style={{ width: "200px" }}
              />
            )}
          </div>
          )}
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleInputChange}
              className="form-control mb-3"
              style={{ width: "200px", textAlign: "center" }}
            />
          ) : (
            <h2
              style={{
                fontFamily: "Archivo Black, sans-serif",
                fontWeight: "800",
                fontSize: "1.6rem",
                color: "#10047D",
              }}
            >
              {profileData.name}
            </h2>
          )}

          {isEditing ? (
            <input
              type="text"
              name="role"
              value={profileData.role}
              onChange={handleInputChange}
              className="form-control mb-3"
            />
          ) : (
            <p style={{ fontSize: "1.3rem", fontWeight: "600" }}>
              {profileData.role}
            </p>
          )}
        </div>

        <h4
          className="mt-5"
          style={{
            fontFamily: "Archivo Black, sans-serif",
            fontWeight: "800",
            fontSize: "1.4rem",
            color: "#10047D",
          }}
        >
          About Me
        </h4>

        {isEditing ? (
          <textarea
            name="aboutMe"
            value={profileData.aboutMe}
            onChange={handleInputChange}
            className="form-control mt-3"
            rows="5"
          />
        ) : (
          <p
            className="mt-3 text-justify"
            style={{ fontSize: "1.2rem", textAlign: "justify" }}
          >
            {profileData.aboutMe}
          </p>
        )}
      </div>
    ),
    Education: (
      <div>
        <h3
          className="mt-1 text-center"
          style={{
            fontFamily: "Archivo Black, sans-serif",
            fontWeight: "800",
            fontSize: "1.6rem",
            color: "#10047D",
          }}
        >
          Education
        </h3>
        {profileData.education.map((edu, index) => (
          <div key={index} className="mb-4">
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="level"
                  value={edu.level}
                  onChange={(e) => {
                    const updatedEducation = [...profileData.education];
                    updatedEducation[index].level = e.target.value;
                    setProfileData({
                      ...profileData,
                      education: updatedEducation,
                    });
                  }}
                  className="form-control mb-2"
                />
                <input
                  type="text"
                  name="institution"
                  value={edu.institution}
                  onChange={(e) => {
                    const updatedEducation = [...profileData.education];
                    updatedEducation[index].institution = e.target.value;
                    setProfileData({
                      ...profileData,
                      education: updatedEducation,
                    });
                  }}
                  className="form-control mb-2"
                />
                <input
                  type="text"
                  name="year"
                  value={edu.year}
                  onChange={(e) => {
                    const updatedEducation = [...profileData.education];
                    updatedEducation[index].year = e.target.value;
                    setProfileData({
                      ...profileData,
                      education: updatedEducation,
                    });
                  }}
                  className="form-control mb-2"
                />
                <input
                  type="text"
                  name="grade"
                  value={edu.grade}
                  onChange={(e) => {
                    const updatedEducation = [...profileData.education];
                    updatedEducation[index].grade = e.target.value;
                    setProfileData({
                      ...profileData,
                      education: updatedEducation,
                    });
                  }}
                  className="form-control mb-2"
                />
              </>
            ) : (
              <>
                <h4
                  className="mt-5 mb-3"
                  style={{
                    fontFamily: "Archivo Black, sans-serif",
                    fontWeight: "800",
                    fontSize: "1.3rem",
                  }}
                >
                  {edu.level}
                </h4>
                <p style={{ fontWeight: "600" }}>
                  {edu.institution} ({edu.year})
                </p>
                <p
                  style={{ fontSize: "1.2rem", textAlign: "justify" }}
                >
                  Grade: {edu.grade}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    ),
    Skills: (
      <div>
        <h3
          className="mt-1 text-center"
          style={{
            fontFamily: "Archivo Black, sans-serif",
            fontWeight: "800",
            fontSize: "1.6rem",
            color: "#10047D",
          }}
        >
          Skills
        </h3>
        {isEditing ? (
          <textarea
            name="skills"
            value={profileData.skills.join(", ")}
            onChange={(e) =>
              setProfileData({
                ...profileData,
                skills: e.target.value
                  .split(", ")
                  .map((skill) => skill.trim()),
              })
            }
            className="form-control mt-3"
            rows="3"
          />
        ) : (
          <ul className="mt-3">
            {profileData.skills.map((skill, index) => (
              <li key={index} style={{ fontSize: "1.2rem" }}>
                {skill}
              </li>
            ))}
          </ul>
        )}
      </div>
    ),
  };

  return (
   <>
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          backgroundImage: `url(https://img.freepik.com/free-vector/spot-lights-background_23-2148616383.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
       
        <div className="container-fluid py-4 mt-5">
          <div className="row">
            <div className="col-1"></div>
            <div className="col-12 col-md-4 col-lg-3 mb-3">
              <Card
                className="text-center mx-auto d-flex"
                style={{
                  backgroundColor: "#ADABAB",
                  height: "104%",
                  paddingBottom: "10px",
                }}
              >
                <Card.Header
                  style={{
                    fontFamily: "Archivo Black, sans-serif",
                    fontWeight: "800",
                    fontSize: "1.6rem",
                    color:"#1B30B0"
                  }}
                >
                  {profileData.name}
                </Card.Header>
                <Nav className="flex-column">
                  {Object.keys(sections).map((key) => (
                    <Nav.Item key={key}>
                      <Nav.Link
                        onClick={() => handleNavClick(key)}
                        className={`${
                          selectedSection === key
                            ? "active font-weight-bold"
                            : "font-weight-bold"
                        }`}
                        style={{
                          color:'#8B710F', fontFamily: "Archivo Black, sans-serif",fontSize:'1.5rem',marginTop:'30px',fontWeight:'600'
                        }}
                      >
                        {key}
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
                <button
                  className={`btn ${
                    isEditing ? "btn-danger" : "btn-primary"
                  } mt-3 mx-auto mt-5`}
                  onClick={handleEditToggle}
                >
                  {isEditing ? "Save" : "Edit"}
                </button>
              </Card>
            </div>
            <div
              className="col-12 col-md-7 col-lg-7"
              style={{
                backgroundColor: "#ADABAB",
                borderRadius: "8px",
                padding: "20px",
                height:'100%'
              }}
            >
              {sections[selectedSection]}
            </div>
          </div>
        </div>
     
      </div>
            
      <Footer />
   </>
  );
}

export default Profile;
