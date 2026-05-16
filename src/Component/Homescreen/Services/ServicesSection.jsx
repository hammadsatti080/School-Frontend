import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./ServicesSection.css";
import { useNavigate } from "react-router-dom";
import FeaturesSection from "../Features/FeaturesSection";

export default function ServicesSection() {
  const services = [
    {
      title: "Primary & Middle Classes",
      description: "Nursery to Middle School (Class 1–8) with quality education.",
      icon: "bi-journal-bookmark",
      link: "/toper"
    },
    {
      title: "High School & College Prep",
      description: "Secondary & Higher Secondary classes with modern syllabus.",
      icon: "bi-mortarboard",
      link: "/toper"
    },
    {
      title: "Computer & Coding",
      description: "Basic computer skills, MS Office, Programming & Web Dev.",
      icon: "bi-laptop",
      link: "/Computercodng"
    },
    {
      title: "Sports & Athletics",
      description: "Football, Cricket, Basketball, Athletics & physical fitness.",
      icon: "bi-basket",
      link: "/Computercodng"
    },
    {
      title: "Art & Music",
      description: "Drawing, Painting, Music, Dance & creative activities.",
      icon: "bi-music-note-beamed",
      link: "/Computercodng"
    },
    {
      title: "Library & STEM",
      description: "Library access, Reading Clubs, STEM & Science Labs.",
      icon: "bi-book",
      link: "/Computercodng"
    },
  ];

  const navigate = useNavigate();

  return (
    <section className="services-section py-5">
      <div className="container">
        <div className="row mb-4 text-center">
          <div className="col-12">
            <h2 className="fw-bold">Our Services & Courses</h2>
            <p className="text-muted">
              We provide comprehensive academic programs, co-curricular activities, 
              and skill development courses to nurture every student.
            </p>
          </div>
        </div>

        <div className="row g-4">
          {services.map((service, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4">
              <div className="card service-card h-100 text-center p-3">
                <i className={`bi ${service.icon} service-icon mb-3`} style={{ fontSize: "2rem", color: "#0d6efd" }}></i>
                <div className="card-body">
                  <h5 className="card-title fw-semibold">{service.title}</h5>
                  <p className="card-text">{service.description}</p>
                  <button
                    className="btn btn-primary mt-2"
                    onClick={() => navigate(service.link)}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <FeaturesSection />
      </div>
    </section>
  );
}