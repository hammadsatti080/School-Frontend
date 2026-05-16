import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UpperNavbar() {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  const admin = {
    email: "myapp@gmail.com",
    phone: "03001234567",
    Address: "xyzz",
  };

  const handleLogout = () => navigate("/");

  return (
    <div className="container-fluid">
      {/* Single flex container for navbar */}
      <div className="d-flex justify-content-between align-items-center py-2">

        {/* App Name */}
      <div className="d-flex align-items-center">
  <img
    src="./Homescreen/school3.jpg"
    alt="School Logo"
    style={{
      width: "60px", 
      marginLeft:"20px",      // adjust size as needed
      height: "50px",
      objectFit: "cover", // keeps aspect ratio
      borderRadius: "5px" // optional, rounded corners
    }}
  />
</div>

        {/* Admin Dropdown */}
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle btn-sm"
            type="button"
            data-bs-toggle="dropdown"
          >
            Admin
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <button
                className="dropdown-item"
                onClick={() => setShowProfile(!showProfile)}
              >
                Profile
              </button>
            </li>
            <li>
              <button
                className="dropdown-item text-danger"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Profile Card */}
      {showProfile && (
        <div
          className="card mt-2 p-3 shadow"
          style={{
            width: "90%",      // responsive width
            maxWidth: "250px", // don't exceed desktop size
            marginLeft: "auto", // align right
          }}
        >
          <h6 className="mb-2">Admin Profile</h6>
          <p className="mb-1"><strong>Email:</strong> {admin.email}</p>
          <p className="mb-1"><strong>Phone:</strong> {admin.phone}</p>
          <p className="mb-0"><strong>Address:</strong> {admin.Address}</p>
        </div>
      )}
    </div>
  );
}