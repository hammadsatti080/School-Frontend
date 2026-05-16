import React from "react";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container" style={{marginLeft:"30px"}}>

        {/* Logo */}
        <div className="d-flex align-items-left">
  <img
    src="./Homescreen/school3.jpg"
    alt="School Logo"
    style={{
      width: "70px",      // adjust size as needed
      height: "40px",
      objectFit: "cover", // keeps aspect ratio
      borderRadius: "5px" // optional, rounded corners
    }}
  />
  <span style={{ marginLeft: "10px", fontWeight: "bold", fontSize: "1.2rem" }}>
    My App
  </span>
</div>

        {/* Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto text-center text-lg-start  ">

            <li className="nav-item mx-2">
              <a className="nav-link nav-hover " href="/">Home</a>
            </li>

            <li className="nav-item mx-2">
              <a className="nav-link nav-hover" href="/about">About</a>
            </li>
            <li className="nav-item mx-2">
              <a className="nav-link nav-hover" href="/Service">Services</a>
            </li>
            <li className="nav-item mx-2">
              <a className="nav-link nav-hover" href="/Contact">Contact</a>
            </li>

            <li className="nav-item mx-2">
              <a className="nav-link nav-hover" href="/faq">FAQ</a>
            </li>

            <li className="nav-item mx-2">
              <a className="nav-link nav-hover" href="/Login">Auth</a>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
}