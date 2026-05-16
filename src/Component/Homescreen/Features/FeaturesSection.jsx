import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./FeaturesSection.css";

export default function FeaturesSection() {
  const features = [
    {
      title: "Student Competitions",
      description: "Inter-school and intra-school academic competitions.",
      icon: "bi-trophy",
    },
    {
      title: "Sports & Games Events",
      description: "Organizing sports tournaments and fun games for students.",
      icon: "bi-basket",
    },
    {
      title: "Awards & Recognition",
      description: "Distributing awards to outstanding performers.",
      icon: "bi-award",
    },
    {
      title: "Scholarships",
      description: "Providing scholarships to talented and deserving students.",
      icon: "bi-mortarboard",
    },
    {
      title: "Workshops & Seminars",
      description: "Educational workshops to enhance skills and knowledge.",
      icon: "bi-lightning-charge",
    },
    {
      title: "Cultural Programs",
      description: "Dance, Music, and Arts events to showcase talents.",
      icon: "bi-music-note-beamed",
    },
  ];

  return (
    <section className="features-section py-5">
      <div className="container">
        <div className="row mb-4 text-center">
          <div className="col-12">
            <h2 className="fw-bold">Future Features & Initiatives</h2>
            <p className="text-muted">
              We are constantly evolving and planning new programs and activities 
              to enrich student life and learning experience.
            </p>
          </div>
        </div>

        <div className="row g-4">
          {features.map((feature, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4">
              <div className="card feature-card h-70 text-center p-3">
                <i className={`bi ${feature.icon} feature-icon mb-3`}></i>
                <div className="card-body">
                  <h5 className="card-title fw-semibold">{feature.title}</h5>
                  <p className="card-text">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}