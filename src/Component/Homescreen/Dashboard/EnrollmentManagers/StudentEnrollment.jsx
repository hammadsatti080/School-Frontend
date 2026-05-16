import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const StudentEnrollment = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    studentName: "",
    fatherName: "",
    studentClass: "",
    gender: "",
    cnic: "",
    contactNo: "",
    bloodGroup: "",
    religion: "",
  });
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [enrollments, setEnrollments] = useState([]);
  const [editingEnrollmentId, setEditingEnrollmentId] = useState(null);

  const navigate = useNavigate();

  // Fetch students
  const fetchStudents = async () => {
    try {
      const res = await fetch("https://school-backend-blond.vercel.app/api/students");
      const data = await res.json();
      setStudents(data);
      setFilteredStudents(data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  // Fetch enrollments
  const fetchEnrollments = async () => {
    try {
      const res = await fetch("https://school-backend-blond.vercel.app/api/enrollments");
      const data = await res.json();
      setEnrollments(data);
    } catch (err) {
      console.error("Error fetching enrollments:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchEnrollments();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      setFilteredStudents(
        students.filter((stu) => Number(stu.studentClass) === Number(selectedClass))
      );
    } else {
      setFilteredStudents(students);
    }
  }, [selectedClass, students]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Validate form
  const validate = () => {
    const newErrors = {};
    if (!formData.gender) newErrors.gender = "Gender required";
    if (!formData.contactNo) newErrors.contactNo = "Contact No required";
    else if (!/^\d{10,15}$/.test(formData.contactNo))
      newErrors.contactNo = "Contact must be 10-15 digits";
    if (!formData.bloodGroup) newErrors.bloodGroup = "Blood Group required";
    return newErrors;
  };

  // Submit form (Add or Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Check if student already enrolled in the same class
    const duplicate = enrollments.find(
      (enroll) =>
        enroll.studentName === formData.studentName &&
        Number(enroll.studentClass) === Number(formData.studentClass) &&
        enroll._id !== editingEnrollmentId
    );
    if (duplicate) {
      alert("This student is already enrolled in this class!");
      return;
    }

    try {
      let res;
      if (editingEnrollmentId) {
        // Edit enrollment
        res = await fetch(`https://school-backend-blond.vercel.app/api/enrollments/${editingEnrollmentId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        // Add new enrollment
        res = await fetch("https://school-backend-blond.vercel.app/api/enrollments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }
      const data = await res.json();
      setSuccessMsg(data.message || (editingEnrollmentId ? "Enrollment updated!" : "Enrollment added!"));
      setModalOpen(false);
      setEditingEnrollmentId(null);
      fetchEnrollments();
      setFormData({
        studentName: "",
        fatherName: "",
        studentClass: "",
        gender: "",
        cnic: "",
        contactNo: "",
        bloodGroup: "",
        religion: "",
      });
    } catch (err) {
      console.error("Error saving enrollment:", err);
    }
  };

  const handleEnrollmentList = () => {
    navigate("/StudentEnrollmentBackup");
  };

  // Open modal for new enrollment
  const openEnrollmentModal = (stu) => {
    setModalOpen(true);
    setEditingEnrollmentId(null);
    setFormData({
      studentName: stu.name,
      fatherName: stu.fatherName,
      studentClass: stu.studentClass,
      gender: "",
      cnic: stu.cnic,
      contactNo: "",
      bloodGroup: "",
      religion: "",
    });
  };

  return (
    <div className="container mt-4">
      {/* Filters */}
      <div className="d-flex gap-3 mb-3 flex-wrap">
        <select
          className="form-select w-25"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">All Classes</option>
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              Class {i + 1}
            </option>
          ))}
        </select>
        <button
          onClick={handleEnrollmentList}
          className="btn btn-sm btn-primary mb-2"
        >
          Enrollment List
        </button>
      </div>

      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      {/* Desktop Table */}
      <div className="table-responsive d-none d-md-block" style={{ maxHeight: "400px", overflowY: "auto" }}>
        <table className="table table-bordered table-striped">
          <thead className="table-light" style={{ position: "sticky", top: 0, zIndex: 1 }}>
            <tr>
              <th>Name</th>
              <th>DOB</th>
              <th>Gender</th>
              <th>Class</th>
              <th>Father</th>
              <th>Phone</th>
              <th>CNIC</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((stu) => (
                <tr key={stu._id}>
                  <td>{stu.name}</td>
                  <td>{stu.dob}</td>
                  <td>{stu.gender}</td>
                  <td>{stu.studentClass}</td>
                  <td>{stu.fatherName}</td>
                  <td>{stu.phone}</td>
                  <td>{stu.cnic}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => openEnrollmentModal(stu)}
                    >
                      Add Enrollment
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="row d-block d-md-none">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((stu) => (
            <div key={stu._id} className="col-12 mb-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{stu.name}</h5>
                  <p className="card-text mb-1"><strong>Class:</strong> {stu.studentClass}</p>
                  <p className="card-text mb-1"><strong>Father:</strong> {stu.fatherName}</p>
                  <p className="card-text mb-1"><strong>DOB:</strong> {stu.dob}</p>
                  <p className="card-text mb-1"><strong>Gender:</strong> {stu.gender}</p>
                  <p className="card-text mb-1"><strong>Phone:</strong> {stu.phone}</p>
                  <p className="card-text mb-1"><strong>CNIC:</strong> {stu.cnic}</p>
                  <button
                    className="btn btn-sm btn-success mt-2"
                    onClick={() => openEnrollmentModal(stu)}
                  >
                    Add Enrollment
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">No students found</div>
        )}
      </div>

      {/* Enrollment Modal */}
      {modalOpen && (
        <div className="modal show d-block">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Enrollment</h5>
                <button className="btn-close" onClick={() => setModalOpen(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <label>Student Name</label>
                      <input type="text" className="form-control" value={formData.studentName} readOnly />
                    </div>
                    <div className="col-md-4">
                      <label>Father Name</label>
                      <input type="text" className="form-control" value={formData.fatherName} readOnly />
                    </div>
                    <div className="col-md-4">
                      <label>Class</label>
                      <input type="text" className="form-control" value={formData.studentClass} readOnly />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-4">
                      <label>Gender</label>
                      <select
                        className={`form-select ${errors.gender ? "is-invalid" : ""}`}
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                      <div className="invalid-feedback">{errors.gender}</div>
                    </div>
                    <div className="col-md-4">
                      <label>Contact No</label>
                      <input
                        type="text"
                        className={`form-control ${errors.contactNo ? "is-invalid" : ""}`}
                        name="contactNo"
                        value={formData.contactNo}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">{errors.contactNo}</div>
                    </div>
                    <div className="col-md-4">
                      <label>Blood Group</label>
                      <input
                        type="text"
                        className={`form-control ${errors.bloodGroup ? "is-invalid" : ""}`}
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">{errors.bloodGroup}</div>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-4">
                      <label>Religion</label>
                      <input
                        type="text"
                        className="form-control"
                        name="religion"
                        value={formData.religion}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label>CNIC</label>
                      <input type="text" className="form-control" value={formData.cnic} readOnly />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentEnrollment;