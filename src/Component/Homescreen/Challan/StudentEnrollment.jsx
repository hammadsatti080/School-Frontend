/*
import React, { useState, useEffect } from "react";

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
  });
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [enrollments, setEnrollments] = useState([]);
  const [editingEnrollmentId, setEditingEnrollmentId] = useState(null);

  // Fetch students
  const fetchStudents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/students");
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
      const res = await fetch("http://localhost:5000/api/enrollments");
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

  // Filter students by class
  useEffect(() => {
    if (selectedClass) {
      const filtered = students.filter(
        (stu) => Number(stu.studentClass) === Number(selectedClass)
      );
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents(students);
    }
  }, [selectedClass, students]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.studentName) newErrors.studentName = "Student Name required";
    if (!formData.fatherName) newErrors.fatherName = "Father Name required";
    if (!formData.gender) newErrors.gender = "Gender required";
    if (!formData.cnic) newErrors.cnic = "CNIC required";
    else if (!/^\d{13}$/.test(formData.cnic))
      newErrors.cnic = "CNIC must be 13 digits";
    if (!formData.contactNo) newErrors.contactNo = "Contact No required";
    else if (!/^\d{10,15}$/.test(formData.contactNo))
      newErrors.contactNo = "Contact must be 10-15 digits";
    if (!formData.bloodGroup) newErrors.bloodGroup = "Blood Group required";
    return newErrors;
  };

  // Add / Edit enrollment
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      let res;
      if (editingEnrollmentId) {
        // EDIT
        res = await fetch(`http://localhost:5000/api/enrollments/${editingEnrollmentId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        // ADD NEW
        res = await fetch("http://localhost:5000/api/enrollments", {
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
      });
    } catch (err) {
      console.error("Error saving enrollment:", err);
    }
  };

  // Delete enrollment
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this enrollment?")) return;
    try {
      await fetch(`http://localhost:5000/api/enrollments/${id}`, { method: "DELETE" });
      fetchEnrollments();
    } catch (err) {
      console.error("Error deleting enrollment:", err);
    }
  };

  // Open modal for editing
  const handleEdit = (enroll) => {
    setEditingEnrollmentId(enroll._id);
    setFormData({ ...enroll });
    setModalOpen(true);
  };

  return (
    <div className="container mt-4">
  
      <div className="d-flex gap-3 mb-3">
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
      </div>

      {successMsg && <div className="alert alert-success">{successMsg}</div>}

   
      <div className="table-responsive" style={{ maxHeight: "300px", overflowY: "auto" }}>
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
                      className="btn btn-sm btn-primary"
                      onClick={() => {
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
                        });
                      }}
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

      
      <h5 className="mt-4">Enrollment List</h5>
      <div
        className="table-responsive"
        style={{ maxHeight: "400px", overflowY: "scroll" }}
      >
        <table className="table table-bordered table-striped">
          <thead className="table-light" style={{ position: "sticky", top: 0, zIndex: 1 }}>
            <tr>
              <th>Student Name</th>
              <th>Father Name</th>
              <th>Class</th>
              <th>Gender</th>
              <th>CNIC</th>
              <th>Contact No</th>
              <th>Blood Group</th>
               <th>Religion</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.length > 0 ? (
              enrollments.map((enroll) => (
                <tr key={enroll._id}>
                  <td>{enroll.studentName}</td>
                  <td>{enroll.fatherName}</td>
                  <td>{enroll.studentClass}</td>
                  <td>{enroll.gender}</td>
                  <td>{enroll.cnic}</td>
                  <td>{enroll.contactNo}</td>
                  <td>{enroll.bloodGroup}</td>
                    <td>{enroll.religion}</td>
                  
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(enroll)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(enroll._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No enrollments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    
      {modalOpen && (
        <div className="modal show d-block">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingEnrollmentId ? "Edit Enrollment" : "Add Enrollment"}
                </h5>
                <button className="btn-close" onClick={() => setModalOpen(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <label>Student Name</label>
                      <input
                        type="text"
                        className={`form-control ${errors.studentName ? "is-invalid" : ""}`}
                        name="studentName"
                        value={formData.studentName}
                         readOnly
                      />
                      <div className="invalid-feedback">{errors.studentName}</div>
                    </div>
                    <div className="col-md-4">
                      <label>Father Name</label>
                      <input
                        type="text"
                        className={`form-control ${errors.fatherName ? "is-invalid" : ""}`}
                        name="fatherName"
                        value={formData.fatherName}
                   readOnly
                      />
                      <div className="invalid-feedback">{errors.fatherName}</div>
                    </div>
                    <div className="col-md-4">
                      <label>Class</label>
                      <input
                        type="text"
                        className="form-control"
                        name="studentClass"
                        value={formData.studentClass}
                        readOnly
                      />
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
                      <label>CNIC</label>
                      <input
                        type="text"
                        className={`form-control ${errors.cnic ? "is-invalid" : ""}`}
                        name="cnic"
                        value={formData.cnic}
                       readOnly
                      />
                      <div className="invalid-feedback">{errors.cnic}</div>
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
                  </div>

                 <div className="row mb-3">
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
                    <div className="col-md-4">
                      <label>Religion</label>
                      <input
                        type="text"
                        className={`form-control ${errors.religion ? "is-invalid" : ""}`}
                        name="religion"
                        value={formData.religion}
                   onChange = {handleChange}
                      />
                      <div className="invalid-feedback">{errors.religion}</div>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    {editingEnrollmentId ? "Update" : "Submit"}
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

export default StudentEnrollmentBackup;


..................

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

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
  });
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [enrollments, setEnrollments] = useState([]);
  const [editingEnrollmentId, setEditingEnrollmentId] = useState(null);

  // Fetch students
  const fetchStudents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/students");
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
      const res = await fetch("http://localhost:5000/api/enrollments");
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

  // Filter students by class
  useEffect(() => {
    if (selectedClass) {
      const filtered = students.filter(
        (stu) => Number(stu.studentClass) === Number(selectedClass)
      );
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents(students);
    }
  }, [selectedClass, students]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.studentName) newErrors.studentName = "Student Name required";
    if (!formData.fatherName) newErrors.fatherName = "Father Name required";
    if (!formData.gender) newErrors.gender = "Gender required";
    if (!formData.cnic) newErrors.cnic = "CNIC required";
    else if (!/^\d{13}$/.test(formData.cnic))
      newErrors.cnic = "CNIC must be 13 digits";
    if (!formData.contactNo) newErrors.contactNo = "Contact No required";
    else if (!/^\d{10,15}$/.test(formData.contactNo))
      newErrors.contactNo = "Contact must be 10-15 digits";
    if (!formData.bloodGroup) newErrors.bloodGroup = "Blood Group required";
    return newErrors;
  };

  // Add / Edit enrollment
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      let res;
      if (editingEnrollmentId) {
        // EDIT
        res = await fetch(`http://localhost:5000/api/enrollments/${editingEnrollmentId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        // ADD NEW
        res = await fetch("http://localhost:5000/api/enrollments", {
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
      });
    } catch (err) {
      console.error("Error saving enrollment:", err);
    }
  };

  // Delete enrollment
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this enrollment?")) return;
    try {
      await fetch(`http://localhost:5000/api/enrollments/${id}`, { method: "DELETE" });
      fetchEnrollments();
    } catch (err) {
      console.error("Error deleting enrollment:", err);
    }
  };

  // Open modal for editing
  const handleEdit = (enroll) => {
    setEditingEnrollmentId(enroll._id);
    setFormData({ ...enroll });
    setModalOpen(true);
  };

  return (
    <div className="container mt-4">
  
      <div className="d-flex gap-3 mb-3">
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
      </div>

      {successMsg && <div className="alert alert-success">{successMsg}</div>}

   
      <div className="table-responsive" style={{ maxHeight: "300px", overflowY: "auto" }}>
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
                      className="btn btn-sm btn-primary"
                      onClick={() => {
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
                        });
                      }}
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

      
      <h5 className="mt-4">Enrollment List</h5>
      <div
        className="table-responsive"
        style={{ maxHeight: "400px", overflowY: "scroll" }}
      >
        <table className="table table-bordered table-striped">
          <thead className="table-light" style={{ position: "sticky", top: 0, zIndex: 1 }}>
            <tr>
              <th>Student Name</th>
              <th>Father Name</th>
              <th>Class</th>
              <th>Gender</th>
              <th>CNIC</th>
              <th>Contact No</th>
              <th>Blood Group</th>
               <th>Religion</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.length > 0 ? (
              enrollments.map((enroll) => (
                <tr key={enroll._id}>
                  <td>{enroll.studentName}</td>
                  <td>{enroll.fatherName}</td>
                  <td>{enroll.studentClass}</td>
                  <td>{enroll.gender}</td>
                  <td>{enroll.cnic}</td>
                  <td>{enroll.contactNo}</td>
                  <td>{enroll.bloodGroup}</td>
                    <td>{enroll.religion}</td>
                  
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(enroll)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(enroll._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No enrollments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>



    
      {modalOpen && (
        <div className="modal show d-block">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingEnrollmentId ? "Edit Enrollment" : "Add Enrollment"}
                </h5>
                <button className="btn-close" onClick={() => setModalOpen(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <label>Student Name</label>
                      <input
                        type="text"
                        className={`form-control ${errors.studentName ? "is-invalid" : ""}`}
                        name="studentName"
                        value={formData.studentName}
                         readOnly
                      />
                      <div className="invalid-feedback">{errors.studentName}</div>
                    </div>
                    <div className="col-md-4">
                      <label>Father Name</label>
                      <input
                        type="text"
                        className={`form-control ${errors.fatherName ? "is-invalid" : ""}`}
                        name="fatherName"
                        value={formData.fatherName}
                   readOnly
                      />
                      <div className="invalid-feedback">{errors.fatherName}</div>
                    </div>
                    <div className="col-md-4">
                      <label>Class</label>
                      <input
                        type="text"
                        className="form-control"
                        name="studentClass"
                        value={formData.studentClass}
                        readOnly
                      />
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
                      <label>CNIC</label>
                      <input
                        type="text"
                        className={`form-control ${errors.cnic ? "is-invalid" : ""}`}
                        name="cnic"
                        value={formData.cnic}
                       readOnly
                      />
                      <div className="invalid-feedback">{errors.cnic}</div>
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
                  </div>

                 <div className="row mb-3">
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
                    <div className="col-md-4">
                      <label>Religion</label>
                      <input
                        type="text"
                        className={`form-control ${errors.religion ? "is-invalid" : ""}`}
                        name="religion"
                        value={formData.religion}
                   onChange = {handleChange}
                      />
                      <div className="invalid-feedback">{errors.religion}</div>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    {editingEnrollmentId ? "Update" : "Submit"}
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
*/