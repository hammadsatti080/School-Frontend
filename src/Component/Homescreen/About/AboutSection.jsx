import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css'; // Bootstrap icons
import "./AboutSection.css"; // Custom CSS

export default function AboutSection() {
  return (
    <section className="about-section py-5 " style={{ backgroundColor: "#f8f9fa" }}>
      {/* Top Text Content */}
      <div className="container mb-5">
  <div className="row align-items-center g-5 ">

    {/* LEFT TEXT */}
    <div className="col-md-6 text-center text-md-start about-text slide-in-left">

  <h2 className="fw-bold display-6 text-primary text-write">
    About Our School
  </h2>

  <p className="text-muted mt-3 lead text-write delay-1">
    For the last 10 years, our school has been committed to providing
    students with high-level education and fostering their all-round
    development. We believe in modern learning, discipline, and growth.
  </p>

</div>

    {/* RIGHT IMAGE */}
    <div className="col-md-6 text-center animate-fade-right">
      <div className="image-box">
        <img
          className="img-fluid rounded-4 shadow-lg about-img mb-4"
          src="./Homescreen/Aboutss.jpg"
          alt="About School"
        />
      </div>
    </div>

  </div>
  
        <div className="row text-center text-md-start g-4">
          {/* Mission */}
          <div className="col-md-4 mb-4">
            <div className="card h-100 p-4 shadow-sm bg-white">
              <div className="mb-3">
                <i className="bi bi-bullseye fs-1 text-primary"></i>
              </div>
              <h4 className="fw-semibold">Our Mission</h4>
              <p>
                To provide maximum students with quality education, building a 
                strong foundation for their future.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="col-md-4 mb-4">
            <div className="card h-100 p-4 shadow-sm bg-white">
              <div className="mb-3">
                <i className="bi bi-eye fs-1 text-success"></i>
              </div>
              <h4 className="fw-semibold">Our Vision</h4>
              <p>
                To become a leading institution recognized for excellence in 
                academics, sports, and extracurricular activities.
              </p>
            </div>
          </div>

          {/* Principal's Message */}
          <div className="col-md-4 mb-4">
            <div className="card h-100 p-4 shadow-sm bg-white">
              <div className="mb-3">
                <i className="bi bi-person-badge fs-1 text-warning"></i>
              </div>
              <h4 className="fw-semibold">Principal’s Message</h4>
              <p>
                We believe in nurturing young minds to become responsible, 
                knowledgeable, and confident citizens of tomorrow.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Facilities Images */}
      <div className="container facilities-container">
        <div className="row text-center g-4">
          <div className="col-sm-6 col-md-4">
            <div className="card h-100 p-3 shadow-sm">
              <img
                src={process.env.PUBLIC_URL + "/Homescreen/Lab.jpg"}
                alt="Lab"
                className="img-fluid rounded mb-2"
              />
              <h5 className="mt-2">Well-Equipped Labs</h5>
              <i className="bi bi-journal-bookmark fs-3 text-primary"></i>
            </div>
          </div>
          <div className="col-sm-6 col-md-4">
            <div className="card h-100 p-3 shadow-sm">
              <img
                src={process.env.PUBLIC_URL + "/Homescreen/Sport.jpg"}
                alt="Sports"
                className="img-fluid rounded mb-2 " 
               
              />
              <h5 className="mt-2">Sports Facilities</h5>
              <i className="bi bi-trophy fs-3 text-success"></i>
            </div>
          </div>
          <div className="col-sm-6 col-md-4">
            <div className="card h-100 p-3 shadow-sm">
              <img
                src={process.env.PUBLIC_URL + "/Homescreen/library.jpg"}
                alt="Library"
                className="img-fluid rounded mb-2"
              />
              <h5 className="mt-2">Library</h5>
              <i className="bi bi-book fs-3 text-warning"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}