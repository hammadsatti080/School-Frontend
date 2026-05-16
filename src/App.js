import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./Component/Homescreen/Navbar.jsx";
import Homescreen from "./Pages/Homescreen.jsx";
import AboutSection from "./Component/Homescreen/About/AboutSection.jsx";
import FAQS from "./Component/Homescreen/FAQ/FAQS.jsx";
import Contact from "./Component/Homescreen/Contacts/Contact.jsx";
import Branch from "./Component/Homescreen/Branches/Branch.jsx";
import Footer from "./Component/Homescreen/Footer.jsx";
import ServicesSection from "./Component/Homescreen/Services/ServicesSection.jsx";
import FeaturesSection from "./Component/Homescreen/Features/FeaturesSection.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Dashboards from "./Component/Homescreen/Dashboard/Dashboards.jsx";
import Student from "./Component/Homescreen/Dashboard/Students/Student.jsx";
import Teacher from "./Component/Homescreen/Dashboard/Teachers/Teacher.jsx";
import StudentEnrollmentBackup from "./Component/Homescreen/Dashboard/EnrollmentManagers/StudentEnrollmentBackup.jsx";
 
import "bootstrap/dist/css/bootstrap.min.css";
import CoursesManager from "./Component/Homescreen/Dashboard/Courses/Course.jsx";
import StudentEnrollment from "./Component/Homescreen/Dashboard/EnrollmentManagers/StudentEnrollment.jsx";
import Result from "./Component/Homescreen/Dashboard/Resultdata/Result.jsx";
import ResultList from "./Component/Homescreen/Dashboard/Resultdata/ResultList.jsx";
import Toper from "./Component/Homescreen/Services/Toper.jsx";
import ComputerCoding from "./Component/Homescreen/Services/Subrecord/ComputerCoding.jsx";
import FeeChallan from "./Component/Homescreen/Services/Subrecord/FeeChallan.jsx";
import ViewList from "./Component/Homescreen/Services/Subrecord/ViewList.jsx";
function App() {
  return (
    <Router>
        <Navbar/>
      <Routes>
          <Route path="/" element={<Homescreen />} />
        <Route path="/Login" element={<Login />} />
         <Route path="/about" element={<AboutSection />} />
         <Route path="/faq" element={<FAQS />} />
         <Route path="/Contact" element={<Contact />} />
         <Route path="/Branch" element={<Branch/>} />
               <Route path="/Service" element={<ServicesSection/>} />
              <Route path="/Feature" element={<FeaturesSection/>} />
              <Route path="/Dashboard" element={<Dashboard/>} />
             <Route path="/Dashboards" element={<Dashboards/>} />
             <Route path="/students" element={<Student/>} />
           <Route path="/teachers" element={<Teacher/>} />
         <Route path="/Courses" element={<CoursesManager/>} />
            <Route path="/StudentEnrollment" element={<StudentEnrollment/>} />
                <Route path="/results" element={<Result/>} />
                        <Route path="/resultslst" element={<ResultList/>} />
                           <Route path="/Toper" element={<Toper/>} />
                                <Route path="/Computercodng" element={<ComputerCoding/>} />
                                       <Route path="/FeeChallan" element={<FeeChallan/>} />
                                           <Route path="/ViewList" element={<ViewList/>} />
                                       
                     <Route path="/StudentEnrollmentBackup" element={<StudentEnrollmentBackup/>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;