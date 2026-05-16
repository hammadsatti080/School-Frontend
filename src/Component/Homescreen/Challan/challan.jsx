
import React, { useState, useEffect } from "react";

const StudentEnrollment = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    studentClass: "",
    fatherName: "",
    phone: "",
    address: "",
    cnic: "",
  });
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  // Fetch all students once
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

  useEffect(() => {
    fetchStudents();
  }, []);

  // Filter table by class
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
    if (!formData.name) newErrors.name = "Name required";
    if (!formData.dob) newErrors.dob = "DOB required";
    if (!formData.gender) newErrors.gender = "Gender required";
    if (!formData.fatherName) newErrors.fatherName = "Father name required";
    if (!formData.phone) newErrors.phone = "Phone required";
    else if (!/^\d{10,15}$/.test(formData.phone))
      newErrors.phone = "Phone must be 10-15 digits";
    if (!formData.address) newErrors.address = "Address required";
    if (!formData.cnic) newErrors.cnic = "CNIC required";
    else if (!/^\d{13}$/.test(formData.cnic))
      newErrors.cnic = "CNIC must be 13 digits";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await fetch("https://school-backend-blond.vercel.app/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setSuccessMsg(data.message);
      setModalOpen(false);
      fetchStudents(); // refresh all students
      setFormData({
        name: "",
        dob: "",
        gender: "",
        studentClass: "",
        fatherName: "",
        phone: "",
        address: "",
        cnic: "",
      });
    } catch (err) {
      console.error("Error adding student:", err);
    }
  };

  return (
    <div className="container mt-4">
      {/* Filter by Class */}
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

      {/* Student Table */}
      <div className="table-responsive" style={{ maxHeight: "400px", overflowY: "auto" }}>
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
        <th>Actions</th>
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
                onClick={() => {
                  setModalOpen(true);
                  setFormData({ ...stu });
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

      {/* Modal Form */}
      {modalOpen && (
        <div className="modal show d-block">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Student / Enrollment</h5>
                <button
                  className="btn-close"
                  onClick={() => setModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <label>Name</label>
                      <input
                        type="text"
                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">{errors.name}</div>
                    </div>
                    <div className="col-md-4">
                      <label>DOB</label>
                      <input
                        type="date"
                        className={`form-control ${errors.dob ? "is-invalid" : ""}`}
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">{errors.dob}</div>
                    </div>
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
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-4">
                      <label>Father Name</label>
                      <input
                        type="text"
                        className={`form-control ${errors.fatherName ? "is-invalid" : ""}`}
                        name="fatherName"
                        value={formData.fatherName}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">{errors.fatherName}</div>
                    </div>
                    <div className="col-md-4">
                      <label>Phone</label>
                      <input
                        type="text"
                        className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">{errors.phone}</div>
                    </div>
                    <div className="col-md-4">
                      <label>CNIC</label>
                      <input
                        type="text"
                        className={`form-control ${errors.cnic ? "is-invalid" : ""}`}
                        name="cnic"
                        value={formData.cnic}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">{errors.cnic}</div>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label>Address</label>
                      <input
                        type="text"
                        className={`form-control ${errors.address ? "is-invalid" : ""}`}
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">{errors.address}</div>
                    </div>
                    <div className="col-md-6">
                      <label>Class</label>
                      <input
                        type="number"
                        className="form-control"
                        name="studentClass"
                        value={formData.studentClass}
                        readOnly
                      />
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
