import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function ITCourses() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sections data
  const sections = [
    {
      id: "coding",
      title: "Computer & Coding",
      description: "Build skills in programming, web development, and modern tech",
      bgImage: process.env.PUBLIC_URL + "/Homescreen/coding-bg.jpg",
      items: [
        { title: "Web Development", description: "HTML, CSS, JS, React", icon: "bi-laptop" },
        { title: "Programming Fundamentals", description: "C, C++, Python basics", icon: "bi-code-slash" },
        { title: "App Development", description: "React Native & Flutter apps", icon: "bi-phone" },
        { title: "Database & SQL", description: "MySQL & MongoDB basics", icon: "bi-server" },
        { title: "AI & Machine Learning", description: "Intro to AI & ML", icon: "bi-robot" },
        { title: "Cybersecurity Basics", description: "Safety & encryption", icon: "bi-shield-lock" },
      ],
                        
      enrollLink: "/FeeChallan",
    },
    {
      id: "sports",
      title: "Sports & Athletics",
      description: "Physical fitness, teamwork, and competitions",
      bgImage: process.env.PUBLIC_URL + "/Homescreen/sports-bg.jpg",
      items: [
        { title: "Football", description: "Team skills & matches", icon: "bi-ball" },
        { title: "Cricket", description: "Batting, bowling, fielding", icon: "bi-ball" },
        { title: "Basketball", description: "Drills & competitions", icon: "bi-basket" },
        { title: "Athletics", description: "Track & field events", icon: "bi-trophy" },
        { title: "Yoga & Fitness", description: "Strength & flexibility", icon: "bi-heart" },
      ],
    },
    {
      id: "arts",
      title: "Arts & Music",
      description: "Creative expression through arts, music, and drama",
      bgImage: process.env.PUBLIC_URL + "/Homescreen/arts-bg.jpg",
      items: [
        { title: "Drawing & Painting", description: "Creative arts & techniques", icon: "bi-brush" },
        { title: "Music & Dance", description: "Vocals, instruments, choreography", icon: "bi-music-note-beamed" },
        { title: "Drama & Theatre", description: "Acting & stage performance", icon: "bi-easel" },
        { title: "Crafts & Design", description: "Hands-on creative projects", icon: "bi-palette" },
      ],
    },
    {
      id: "library",
      title: "Library & STEM",
      description: "Reading, research, and science lab experiences",
      bgImage: process.env.PUBLIC_URL + "/Homescreen/library-bg.jpg",
      items: [
        { title: "Library Access", description: "Books, journals, magazines", icon: "bi-book" },
        { title: "Reading Clubs", description: "Group reading & discussion", icon: "bi-people" },
        { title: "STEM Labs", description: "Experiments & projects", icon: "bi-beaker" },
        { title: "Science Activities", description: "Interactive learning", icon: "bi-flask" },
      ],
    },
  ];

  const [selectedSection, setSelectedSection] = useState("coding"); // default selected

  const handleEnroll = (link) => {
    if (link) window.location.href = link;
  };

  const current = sections.find((s) => s.id === selectedSection);

  return (
    <div className="activities-single-dropdown container py-4">
      {/* Dropdown selector */}
      <div className="mb-4 w-50">
        <select
          className="form-select"
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
        >
          {sections.map((section) => (
            <option key={section.id} value={section.id}>
              {section.title}
            </option>
          ))}
        </select>
      </div>

      {/* Selected section content */}
      {current && (
        <>
          {/* Hero */}
          <div
            className="hero text-white text-center d-flex align-items-center justify-content-center rounded mb-4"
            style={{
              backgroundImage: `url(${current.bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "250px",
            }}
          >
            <div className="bg-dark bg-opacity-50 p-3 rounded">
              <h4 className="fw-bold">{current.title}</h4>
              <p>{current.description}</p>
            </div>
          </div>

          {/* Cards */}
          <div className="row g-4">
            {current.items.map((item, idx) => (
              <div key={idx} className="col-12 col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm p-3 text-center hover-card">
                  <i
                    className={`bi ${item.icon} mb-3`}
                    style={{ fontSize: "2rem", color: "#0d6efd" }}
                  ></i>
                  <div className="card-body">
                    <h5 className="card-title fw-semibold">{item.title}</h5>
                    <p className="card-text">{item.description}</p>
                    {current.enrollLink && (
                      <button
                        className="btn btn-primary mt-2"
                        onClick={() => handleEnroll(current.enrollLink)}
                      >
                        Enroll Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}