import React, { useState, useEffect } from "react";
import PrintStudent from "./PrintStudent";

const Student = () => {
  const [students, setStudents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
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
  const [filterCNIC, setFilterCNIC] = useState("");
  const [filterClass, setFilterClass] = useState("");

  // Fetch students
  const fetchStudents = async () => {
    try {
      const res = await fetch("https://school-backend-blond.vercel.app/api/students");
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error("Failed to fetch students:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Validate form
  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name required";
    if (!formData.dob) newErrors.dob = "DOB required";
    if (!formData.gender) newErrors.gender = "Gender required";
    if (!formData.studentClass) newErrors.studentClass = "Class required";
    if (!formData.fatherName) newErrors.fatherName = "Father name required";
    if (!formData.phone) newErrors.phone = "Phone required";
    else if (!/^\d{10,15}$/.test(formData.phone))
      newErrors.phone = "Phone must be 10-15 digits";
    if (!formData.address) newErrors.address = "Address required";
    if (!formData.cnic) newErrors.cnic = "CNIC required";
    else if (!/^\d{13}$/.test(formData.cnic))
      newErrors.cnic = "CNIC must be 13 digits";
     const cnicExists = students.some(
    (stu) => stu.cnic === formData.cnic && (!editingStudent || stu._id !== editingStudent._id)
  );
  if (cnicExists) newErrors.cnic = "CNIC already registered";
    return newErrors;
  };

  const handleAdd = () => {
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
    setEditingStudent(null);
    setModalOpen(true);
    setSuccessMsg("");
  };

  const handleEdit = (student) => {
    setFormData(student);
    setEditingStudent(student);
    setModalOpen(true);
    setSuccessMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (editingStudent) {
        await fetch(`https://school-backend-blond.vercel.app/api/students/${editingStudent._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        setSuccessMsg("Student updated successfully!");
      } else {
        await fetch("https://school-backend-blond.vercel.app/api/students", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        setSuccessMsg("Student added successfully!");
      }
      fetchStudents();
      setModalOpen(false);
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await fetch(`https://school-backend-blond.vercel.app/api/students/${id}`, { method: "DELETE" });
      setSuccessMsg("Student deleted successfully!");
      fetchStudents();
    } catch (err) {
      console.error("Failed to delete student:", err);
    }
  };

  const filteredStudents = students.filter(
    (stu) =>
      stu.cnic.toString().includes(filterCNIC) &&
      (filterClass === "" || stu.studentClass.toString() === filterClass)
  );

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between gap-2 mb-3">
        <button className="btn btn-primary" onClick={handleAdd}>
          Add Student
        </button>
        <PrintStudent students={filteredStudents} />
        <input
          type="text"
          className="form-control w-md-25"
          placeholder="Filter by CNIC"
          value={filterCNIC}
          onChange={(e) => setFilterCNIC(e.target.value)}
        />
        <select
          className="form-select w-md-25"
          value={filterClass}
          onChange={(e) => setFilterClass(e.target.value)}
        >
          <option value="">All Classes</option>
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      {/* Success */}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      {/* Desktop Table */}
      <div className="d-none d-md-block">
        <div style={{ height: "70vh", overflowY: "auto", border: "1px solid #ddd" }}>
          <table className="table table-bordered mb-0">
            <thead className="table-light" style={{ position: "sticky", top: 0 }}>
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
              {filteredStudents.map((stu) => (
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
                      className="btn btn-sm btn-info me-2"
                      onClick={() => handleEdit(stu)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(stu._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="d-md-none">
        <div className="row g-3">
          {filteredStudents.map((stu) => (
            <div className="col-12" key={stu._id}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h6 className="fw-bold">{stu.name}</h6>
                  <p className="mb-1"><strong>DOB:</strong> {stu.dob}</p>
                  <p className="mb-1"><strong>Gender:</strong> {stu.gender}</p>
                  <p className="mb-1"><strong>Class:</strong> {stu.studentClass}</p>
                  <p className="mb-1"><strong>Father:</strong> {stu.fatherName}</p>
                  <p className="mb-1"><strong>Phone:</strong> {stu.phone}</p>
                  <p className="mb-2"><strong>CNIC:</strong> {stu.cnic}</p>

                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-info flex-fill"
                      onClick={() => handleEdit(stu)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger flex-fill"
                      onClick={() => handleDelete(stu._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filteredStudents.length === 0 && (
            <div className="col-12 text-center">No students found</div>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="modal show d-block">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingStudent ? "Edit Student" : "Add Student"}
                </h5>
                <button className="btn-close" onClick={() => setModalOpen(false)}></button>
              </div>

              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <label>Name<strong style={{color:"red"}}>*</strong></label>
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
                      <label>DOB<strong style={{color:"red"}}>*</strong></label>
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
                      <label>Gender<strong style={{color:"red"}}>*</strong></label>
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
                      <label>Class<strong style={{color:"red"}}>*</strong></label>
                      <select
                        className={`form-select ${errors.studentClass ? "is-invalid" : ""}`}
                        name="studentClass"
                        value={formData.studentClass}
                        onChange={handleChange}
                      >
                        <option value="">Select Class</option>
                        {[...Array(10)].map((_, i) => (
                          <option key={i+1} value={i+1}>{i+1}</option>
                        ))}
                      </select>
                      <div className="invalid-feedback">{errors.studentClass}</div>
                    </div>

                    <div className="col-md-4">
                      <label>Father Name<strong style={{color:"red"}}>*</strong></label>
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
                      <label>Phone<strong style={{color:"red"}}>*</strong></label>
                      <input
                        type="text"
                        className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">{errors.phone}</div>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label>Address<strong style={{color:"red"}}>*</strong></label>
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
                      <label>CNIC<strong style={{color:"red"}}>*</strong></label>
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

                  <button type="submit" className="btn btn-primary">
                    {editingStudent ? "Update" : "Add"}
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

export default Student;