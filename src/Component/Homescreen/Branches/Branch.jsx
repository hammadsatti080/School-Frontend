import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Branches() {
    const pakistanBranches = [
  {
    city: "Karachi",
    branches: [
      {
        name: "City Center Branch",
        address: "123 Main Street, Karachi",
        phone: "+92 300 1234567",
        email: "citycenter@school.com",
      },
      {
        name: "Korangi Branch",
        address: "45 Korangi Road, Karachi",
        phone: "+92 300 7654321",
        email: "korangi@school.com",
      },
      {
        name: "Korangi Branch",
        address: "45 Korangi Road, Multan",
        phone: "+92 300 7654321",
        email: "korangi@school.com",
      },
  
    ],
  },
  {
    city: "Lahore",
    branches: [
      {
        name: "Main Lahore Branch",
        address: "10 Mall Road, Lahore",
        phone: "+92 300 9876543",
        email: "lahoremain@school.com",
      },
      {
        name: "Gulberg Branch",
        address: "50 Gulberg, Lahore",
        phone: "+92 300 5678901",
        email: "gulberg@school.com",
      },
    ],
  },
  {
    city: "Islamabad",
    branches: [
      {
        name: "Blue Area Branch",
        address: "5 Blue Area, Islamabad",
        phone: "+92 300 1122334",
        email: "bluearea@school.com",
      },
    ],
  },
];
  return (
    <section className="branches-section py-5" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container">
        <h2 className="text-center fw-bold mb-5">Our Branches Across Pakistan</h2>

        {pakistanBranches.map((cityData, cityIndex) => (
          <div key={cityIndex} className="mb-5">
            {/* City Title */}
            <h3 className="fw-bold mb-4">{cityData.city}</h3>

            <div className="row g-4">
              {cityData.branches.map((branch, branchIndex) => (
                <div className="col-sm-6 col-md-4" key={branchIndex}>
                  <div className="card h-100 shadow-sm p-3">
                    <div className="card-body text-center">
                      <h5 className="card-title fw-bold">{branch.name}</h5>
                      <p className="card-text mb-1">
                        <i className="bi bi-geo-alt-fill me-2"></i>{branch.address}
                      </p>
                      <p className="card-text mb-1">
                        <i className="bi bi-telephone-fill me-2"></i>{branch.phone}
                      </p>
                      <p className="card-text">
                        <i className="bi bi-envelope-fill me-2"></i>{branch.email}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}