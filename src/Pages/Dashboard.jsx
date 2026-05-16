import React, { useState } from 'react';
import UpperNavbar from '../Component/Homescreen/Dashboard/UpperNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Topsec from '../Component/Homescreen/Dashboard/Rightpages/Dashboardmain';
import Student from '../Component/Homescreen/Dashboard/Students/Student';
import Teacher from '../Component/Homescreen/Dashboard/Teachers/Teacher';
import Course from '../Component/Homescreen/Dashboard/Courses/Course';


import StudentEnrollment from '../Component/Homescreen/Dashboard/EnrollmentManagers/StudentEnrollment';
import Result from '../Component/Homescreen/Dashboard/Resultdata/Result';
import ResultList from '../Component/Homescreen/Dashboard/Resultdata/ResultList';
import ITCourses from '../Component/Homescreen/Dashboard/Courses/ITCourses';
import Expense from '../Component/Homescreen/Expenses/Expense';

export default function Dashboard() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [activePage, setActivePage] = useState('dashboard'); // track which page is active

  // Sidebar links
  const links = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'students', label: 'Students' },
    { id: 'teachers', label: 'Teachers' },
      { id: 'Course', label: 'Course' },
       { id: 'Enrollement', label: 'Enrollement' },
    { id: 'Result', label: 'Result' },
     { id: 'ResultList', label: 'ResultList' },
      { id: 'ITCourses', label: 'ITCourses' },
       { id: 'Expense', label: 'Expense' },
  ];

  return (
    <div className="d-flex flex-column vh-100">

      {/* Top Navbar */}
      <div className="bg-white text-black p-3 shadow d-flex justify-content-between align-items-center">
        <UpperNavbar />

        {/* Mobile toggle button for sidebar */}
        <button
          className="btn btn-primary d-md-none"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          ☰
        </button>
      </div>

      {/* Collapsible sidebar for mobile */}
      {showSidebar && (
        <div className="bg-light border-bottom d-md-none p-3">
          <ul className="list-unstyled mb-0">
            {links.map(link => (
              <li key={link.id} className="mb-2">
                <button
  className="btn w-100 text-start"
  onClick={() => {
    setActivePage(link.id);
    setShowSidebar(false);
  }}
  style={{
    borderRadius: "8px",
    padding: "8px 12px",
    transition: "all 0.25s ease",
    background:
      activePage === link.id
        ? "linear-gradient(90deg, #0d6efd, #0b5ed7)"
        : "transparent",
    color: activePage === link.id ? "white" : "#212529",
    fontWeight: activePage === link.id ? "600" : "500",
    boxShadow:
      activePage === link.id
        ? "0 4px 10px rgba(13,110,253,0.2)"
        : "none",
  }}
  onMouseEnter={(e) => {
    if (activePage !== link.id) {
      e.target.style.background = "#f1f6ff";
      e.target.style.color = "#0d6efd";
      e.target.style.transform = "translateX(5px)";
    }
  }}
  onMouseLeave={(e) => {
    if (activePage !== link.id) {
      e.target.style.background = "transparent";
      e.target.style.color = "#212529";
      e.target.style.transform = "translateX(0px)";
    }
  }}
>
  {link.label}
</button>
    </li>
      ))}
   </ul>
  </div>
      )}

      {/* Desktop layout */}
      <div className="d-flex flex-grow-1">

  {/* Sidebar */}
  <div
    className="bg-white border-end shadow-sm p-3 d-none d-md-block"
    style={{ width: "220px", minWidth: "220px" }}
  >
   
    <ul className="nav flex-column gap-1">
      {links.map(link => (
        <li key={link.id} className="nav-item">
        <button
  className={`nav-link w-100 text-start px-3 py-2`}
  onClick={() => setActivePage(link.id)}
  style={{
    borderRadius: "8px",
    transition: "all 0.25s ease",
    background:
      activePage === link.id
        ? "linear-gradient(90deg, #0d6efd, #0b5ed7)"
        : "transparent",
    color: activePage === link.id ? "white" : "#212529",
    fontWeight: activePage === link.id ? "600" : "500",
    boxShadow:
      activePage === link.id
        ? "0 4px 10px rgba(13,110,253,0.2)"
        : "none",
  }}
  onMouseEnter={(e) => {
    if (activePage !== link.id) {
      e.target.style.background = "#f1f6ff";
      e.target.style.color = "#0d6efd";
      e.target.style.transform = "translateX(5px)";
    }
  }}
  onMouseLeave={(e) => {
    if (activePage !== link.id) {
      e.target.style.background = "transparent";
      e.target.style.color = "#212529";
      e.target.style.transform = "translateX(0px)";
    }
  }}
>
  {link.label}
</button>       
        </li>
      ))}
    </ul>
  </div>

        {/* Main content */}
        <div className="flex-grow-1 p-4" style={{ backgroundColor: '#f8f9fa' }}>
          {activePage === 'dashboard' && (
         <Topsec />
          )}
          {activePage === 'students' && (
        
            <Student />
          )}
          {activePage === 'teachers' && (
            <div>
                  <Teacher />
            </div>
          )}
           {activePage === 'Course' && (
            <div>
                   <Course />
            </div>
          )}
           {activePage === 'Enrollement' && (
            <div>
                <StudentEnrollment />
            </div>
          )}
           {activePage === 'Result' && (
            <div>
                <Result />
            </div>
          )}
          {activePage === 'ResultList' && (
            <div>
                   <ResultList />
            </div>
          )}
          {activePage === 'ITCourses' && (
            <div>
                   <ITCourses />
            </div>
          )}
           {activePage === 'Expense' && (
            <div>
                   <Expense />
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}