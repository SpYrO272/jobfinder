import React from 'react';
import logo1 from '../assets/logo1.png';

function Page1() {
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100vh",
          position: "relative",
          backgroundImage: `url(https://plus.unsplash.com/premium_photo-1678917827802-721b5f5b4bf0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Black Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Black with 50% opacity
            zIndex: 1,
          }}
        ></div>

        {/* Logo */}
        <img
          src={logo1}
          alt="Logo"
          style={{
            position: "absolute",
            top: "20px", // Adjust as needed for spacing
            left: "20px", // Adjust as needed for spacing
            width: "120px",
            zIndex: 2, // Ensure it appears above the overlay
          }}
        />
      </div>
    </>
  );
}

export default Page1;
