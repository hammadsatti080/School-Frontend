import React from "react";
import "./Homepage.css";
import {  useNavigate } from "react-router-dom";

export default function Homepage() {
    const navigate = useNavigate();
    const handlebutton =()=>{
        navigate("/Contact")
    }
    const handlebranch =()=>{
        navigate("/Branch")
    }
  return (
    <div
     className="homepage d-flex align-items-center justify-content-center"
    style={{
    backgroundImage: `url(${process.env.PUBLIC_URL + '/Homescreen/Homes.jpg'})`,
    backgroundSize: "cover",        // make the image cover the entire div
    backgroundPosition: "center",   // center the image
    backgroundRepeat: "no-repeat",  // prevent repeating
    width: "100%",                  // full width
    height: "100vh",                // full viewport height
  }}
    >
      <div className="overlay text-center p-4 px-md-5">
        <h1 className="display-4 fw-bold text-white mb-3">Best School in Town</h1>
        <p className="lead text-white mb-4">
          We provide quality education, nurturing environment, and
          holistic development for every student.
        </p>
        <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
          <button className="btn btn-primary btn-lg" onClick={handlebutton}>Contact</button>
          <button className="btn btn-outline-light btn-lg" onClick={handlebranch}>Branches</button>
        </div>
      </div>
    </div>
  );
}