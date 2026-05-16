/* 
import React, { useState, useEffect } from "react";

const Teacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);

  const [viewTeacher, setViewTeacher] = useState(null);
const [filterStaffId, setFilterStaffId] = useState("");
const [filterDob, setFilterDob] = useState("");
const [confirmDelete, setConfirmDelete] = useState(null); // store teacher to delete

  const initialState = {
    name: "",
    subject: "",
    dob: "",
    gender: "",
    email: "",
    address: "",
    phone: "",
    staffId: "",
    classAssigned: "",
    designation: "",
    joiningDate: "",
    qualification: ""
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const fetchTeachers = async () => {
    const res = await fetch("http://localhost:5000/api/teachers");
    const data = await res.json();
    setTeachers(data);
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

const validate = () => {
  let err = {};

  if (!formData.name) err.name = "Name required";
  if (!formData.subject) err.subject = "Subject required";
  if (!formData.dob) err.dob = "DOB required";
  if (!formData.gender) err.gender = "Gender required";

  if (!formData.email) err.email = "Email required";
  else if (!/\S+@\S+\.\S+/.test(formData.email))
    err.email = "Invalid email";
  else if (
    teachers.some(
      (t) => t.email === formData.email && t._id !== editingTeacher?._id
    )
  )
    err.email = "Email must be unique";

  if (!formData.phone) err.phone = "Phone required";
  else if (!/^\d{10,15}$/.test(formData.phone))
    err.phone = "Invalid phone";
  else if (
    teachers.some(
      (t) => t.phone === formData.phone && t._id !== editingTeacher?._id
    )
  )
    err.phone = "Phone must be unique";

  if (!formData.staffId) err.staffId = "Staff ID required";
  else if (
    teachers.some(
      (t) => t.staffId === formData.staffId && t._id !== editingTeacher?._id
    )
  )
    err.staffId = "Staff ID must be unique";

  if (!formData.classAssigned) err.classAssigned = "Class required";
  if (!formData.designation) err.designation = "Designation required";
  if (!formData.joiningDate) err.joiningDate = "Joining date required";
  if (!formData.qualification) err.qualification = "Qualification required";
  if (!formData.address) err.address = "Address required";

  return err;
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (editingTeacher) {
        await fetch(`http://localhost:5000/api/teachers/${editingTeacher._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        setSuccessMsg("Teacher updated successfully");
      } else {
        await fetch("http://localhost:5000/api/teachers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        setSuccessMsg("Teacher added successfully");
      }

      setModalOpen(false);
      setFormData(initialState);
      setEditingTeacher(null);
      fetchTeachers();

    } catch (error) {
      console.error("Error saving:", error);
    }
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/teachers/${id}`, {
      method: "DELETE",
    });
    setSuccessMsg("Teacher deleted");
    fetchTeachers();
  };

  const handleEdit = (t) => {
    setEditingTeacher(t);
    setFormData({
      name: t.name || "",
      subject: t.subject || "",
      dob: t.dob || "",
      gender: t.gender || "",
      email: t.email || "",
      address: t.address || "",
      phone: t.phone || "",
      staffId: t.staffId || "",
      classAssigned: t.classAssigned || "",
      designation: t.designation || "",
      joiningDate: t.joiningDate || "",
      qualification: t.qualification || ""
    });
    setModalOpen(true);
  };

  const filteredTeachers = teachers.filter((t) => {
  return (
    (filterStaffId === "" || t.staffId?.includes(filterStaffId)) &&
    (filterDob === "" || t.dob === filterDob)
  );
});
  return (
    <div className="container mt-3">

      <button
        className="btn btn-primary mb-3"
        onClick={() => {
          setModalOpen(true);
          setEditingTeacher(null);
          setFormData(initialState);
        }}
      >
        Add Teacher
      </button>

      {successMsg && <div className="alert alert-success">{successMsg}</div>}


      <div className="row mb-3">
  <div className="col-md-3 mb-2">
    <input
      type="text"
      placeholder="Search by Staff ID"
      className="form-control"
      value={filterStaffId}
      onChange={(e) => setFilterStaffId(e.target.value)}
    />
  </div>

  <div className="col-md-3 mb-2">
    <input
      type="date"
      className="form-control"
      value={filterDob}
      onChange={(e) => setFilterDob(e.target.value)}
    />
  </div>

  <div className="col-md-2 mb-2">
    <button
      className="btn btn-secondary w-100"
      onClick={() => {
        setFilterStaffId("");
        setFilterDob("");
      }}
    >
      Reset
    </button>
  </div>
</div>


<div className="d-none d-md-block">
  <div
    style={{
      maxHeight: "400px",   // adjust height as needed
      overflowY: "auto",
      border: "1px solid #dee2e6", // optional: matches table border
      borderRadius: "5px",
    }}
  >
    <table className="table table-bordered mb-0">
      <thead>
        <tr>
          <th>Name</th>
          <th>Subject</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Designation</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {filteredTeachers.map((t) => (
          <tr key={t._id}>
            <td>{t.name}</td>
            <td>{t.subject}</td>
            <td>{t.email}</td>
            <td>{t.phone}</td>
            <td>{t.designation}</td>
            <td>
              <button
                className="btn btn-sm btn-info me-2"
                onClick={() => handleEdit(t)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger me-2"
                onClick={() => setConfirmDelete(t)}
              >
                Delete
              </button>
              <button
                className="btn btn-sm btn-secondary me-2"
                onClick={() => setViewTeacher(t)}
              >
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
  
<div className="d-md-none">
  <div
    style={{
      maxHeight: "500px", // adjust as needed
      overflowY: "auto",
      paddingRight: "5px", // optional, to prevent scrollbar overlay
    }}
  >
    {filteredTeachers.map((t) => (
      <div className="card mb-2" key={t._id}>
        <div className="card-body">
          <h6>{t.name}</h6>
          <p className="mb-1"><b>Subject:</b> {t.subject}</p>
          <p className="mb-1"><b>Email:</b> {t.email}</p>
          <p className="mb-1"><b>Phone:</b> {t.phone}</p>
          <p className="mb-2"><b>Designation:</b> {t.designation}</p>

          <button
            className="btn btn-sm btn-info me-2"
            onClick={() => handleEdit(t)}
          >
            Edit
          </button>

          <button
            className="btn btn-sm btn-danger me-2"
            onClick={() => setConfirmDelete(t)}
          >
            Delete
          </button>

          <button
            className="btn btn-sm btn-secondary me-2"
            onClick={() => setViewTeacher(t)}
          >
            View
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

{confirmDelete && (
  <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
       style={{ background: "rgba(0,0,0,0.5)", zIndex: 1050 }}>
    <div className="card shadow-lg p-3" style={{ maxWidth: "400px", width: "90%", borderRadius: "12px" }}>
      <div className="mb-3">
        <h5 className="mb-0">Are you sure you want to delete?</h5>
      </div>
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-secondary me-2"
          onClick={() => setConfirmDelete(null)}
        >
          No
        </button>
        <button
          className="btn btn-danger"
          onClick={async () => {
            await handleDelete(confirmDelete._id);
            setConfirmDelete(null);
          }}
        >
          Yes
        </button>
      </div>
    </div>
  </div>
)}


{viewTeacher && (
  <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
       style={{ background: "rgba(0,0,0,0.5)", zIndex: 1050 }}>
    <div className="card shadow-lg p-3" style={{ maxWidth: "500px", width: "90%", borderRadius: "12px" }}>
      
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Teacher Details</h5>
        <button className="btn btn-sm btn-danger" onClick={() => setViewTeacher(null)}>X</button>
      </div>
      
      <div className="mb-2"><b>Name:</b> {viewTeacher.name}</div>
      <div className="mb-2"><b>Subject:</b> {viewTeacher.subject}</div>
      <div className="mb-2"><b>DOB:</b> {viewTeacher.dob}</div>
      <div className="mb-2"><b>Gender:</b> {viewTeacher.gender}</div>
      <div className="mb-2"><b>Email:</b> {viewTeacher.email}</div>
      <div className="mb-2"><b>Phone:</b> {viewTeacher.phone}</div>
      <div className="mb-2"><b>Staff ID:</b> {viewTeacher.staffId}</div>
      <div className="mb-2"><b>Class:</b> {viewTeacher.classAssigned}</div>
      <div className="mb-2"><b>Designation:</b> {viewTeacher.designation}</div>
      <div className="mb-2"><b>Joining Date:</b> {viewTeacher.joiningDate}</div>
      <div className="mb-2"><b>Qualification:</b> {viewTeacher.qualification}</div>
      <div className="mb-2"><b>Address:</b> {viewTeacher.address}</div>

      <div className="text-center mt-3">
        <button className="btn btn-secondary" onClick={() => setViewTeacher(null)}>Close</button>
      </div>
      
    </div>
  </div>
)}

    
      {modalOpen && (
        <div className="modal show d-block">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5>{editingTeacher ? "Edit Teacher" : "Add Teacher"}</h5>
                <button
                  className="btn-close"
                  onClick={() => setModalOpen(false)}
                ></button>
              </div>

              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="row g-2">

                    {Object.keys(initialState).map((field) => (
                      <div className="col-md-4" key={field}>
                        {field === "gender" ? (
                          <select
                            name={field}
                            className={`form-select ${errors[field] && "is-invalid"}`}
                            value={formData[field]}
                            onChange={handleChange}
                          >
                            <option value="">Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                          </select>
                        ) : (
                          <input
                            type={field.includes("Date") || field === "dob" ? "date" : "text"}
                            name={field}
                            placeholder={field}
                            className={`form-control ${errors[field] && "is-invalid"}`}
                            value={formData[field]}
                            onChange={handleChange}
                          />
                        )}
                        <div className="invalid-feedback">{errors[field]}</div>
                      </div>
                    ))}

                  </div>

                  <button className="btn btn-primary mt-3">
                    {editingTeacher ? "Update" : "Add"}
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

export default Teacher;
*/