
import React, { useState, useEffect } from "react";

const CoursesManager = () => {
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [searchClass] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    teacher: "",
    startDate: "",
    status: "Active",
    className: ""
  });

  const [errors, setErrors] = useState({});
  const [editingCourseId, setEditingCourseId] = useState(null);

  useEffect(() => {
    fetchTeachers();
    fetchCourses();
  }, []);

  const fetchTeachers = async () => {
    const res = await fetch("https://school-backend-blond.vercel.app/api/courses/teachers");
    const data = await res.json();
    setTeachers(data);
  };

  const fetchCourses = async () => {
    const res = await fetch("https://school-backend-blond.vercel.app/api/courses");
    const data = await res.json();
    setCourses(data);
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    setFormData({ ...formData, className: e.target.value });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Course name required";
    if (!formData.code) newErrors.code = "Course code required";
    if (!formData.teacher) newErrors.teacher = "Teacher required";
    if (!formData.className) newErrors.className = "Class required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      alert("Please fix validation errors");
      return;
    }

    const url = editingCourseId
      ? `https://school-backend-blond.vercel.app/api/courses/${editingCourseId}`
      : "https://school-backend-blond.vercel.app/api/courses";
    const method = editingCourseId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert(
        editingCourseId
          ? "Course updated successfully"
          : "Course added successfully"
      );
    } else {
      alert("Something went wrong");
    }

    setFormData({
      name: "",
      code: "",
      description: "",
      teacher: "",
      startDate: "",
      status: "Active",
      className: selectedClass
    });

    setEditingCourseId(null);
    fetchCourses();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    await fetch(`https://school-backend-blond.vercel.app/api/courses/${id}`, {
      method: "DELETE",
    });

    alert("Course deleted successfully");
    fetchCourses();
  };

  const handleEdit = (course) => {
    setFormData({
      ...course,
      teacher: course.teacher?._id || "",
      startDate: course.startDate?.split("T")[0],
    });
    setSelectedClass(course.className);
    setEditingCourseId(course._id);
  };

  // Filter by dropdown + search
  const filteredCourses = courses.filter((c) => {
    const matchDropdown = selectedClass ? c.className === selectedClass : true;
    const matchSearch = searchClass
      ? c.className.toLowerCase().includes(searchClass.toLowerCase())
      : true;
    return matchDropdown && matchSearch;
  });

  return (
    <div className="container mt-4">
      {/* CLASS DROPDOWN */}
      <div className="row mb-3">
        <div className="col-md-4">
          <select
            className="form-select"
            value={selectedClass}
            onChange={handleClassChange}
          >
            <option value="">Select Class</option>
            {[...Array(10)].map((_, i) => (
              <option key={i}>Class {i + 1}</option>
            ))}
          </select>
        </div>

  
      </div>

      <div className="row">
        {/* FORM */}
        {selectedClass && (
          <div className="col-md-4 mb-3">
            <div className="card shadow-sm p-3">
              <h5 className="mb-3">{editingCourseId ? "Edit" : "Add"} Course</h5>
              <form onSubmit={handleSubmit}>
                <input
                  className="form-control mb-1"
                  name="name"
                  placeholder="Course Name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <small className="text-danger">{errors.name}</small>

                <input
                  className="form-control mb-1"
                  name="code"
                  placeholder="Course Code"
                  value={formData.code}
                  onChange={handleChange}
                />
                <small className="text-danger">{errors.code}</small>

                <textarea
                  className="form-control mb-2"
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                />

                <select
                  className="form-select mb-1"
                  name="teacher"
                  value={formData.teacher}
                  onChange={handleChange}
                >
                  <option value="">Select Teacher</option>
                  {teachers.map((t) => (
                    <option key={t._id} value={t._id}>
                      {t.name}
                    </option>
                  ))}
                </select>
                <small className="text-danger">{errors.teacher}</small>

                <input
                  type="date"
                  className="form-control mb-2"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                />

                <select
                  className="form-select mb-2"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>

                <button className="btn btn-primary w-100">
                  {editingCourseId ? "Update" : "Add"} Course
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TABLE (DESKTOP) */}
        <div className="col-md-8">
          <div className="card shadow-sm p-3">
            <h5 className="mb-3">Courses List</h5>

            {/* Desktop Table */}
<div className="table-responsive d-none d-md-block" style={{ maxHeight: "400px", overflowY: "auto" }}>
  <table className="table table-bordered table-hover mb-0">
    <thead className="table-light">
      <tr>
        <th>Class</th>
        <th>Name</th>
        <th>Code</th>
        <th>Teacher</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {filteredCourses.map((c) => (
        <tr key={c._id}>
          <td>{c.className}</td>
          <td>{c.name}</td>
          <td>{c.code}</td>
          <td>{c.teacher?.name}</td>
          <td>
            <span
              className={`badge ${c.status === "Active" ? "bg-success" : "bg-secondary"}`}
            >
              {c.status}
            </span>
          </td>
          <td>
            <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(c)}>Edit</button>
            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(c._id)}>Delete</button>
          </td>
        </tr>
      ))}
      {filteredCourses.length === 0 && (
        <tr>
          <td colSpan="6" className="text-center">No courses found</td>
        </tr>
      )}
    </tbody>
  </table>
</div>

            {/* Mobile Cards */}
            <div className="d-block d-md-none">
              {filteredCourses.map((c) => (
                <div key={c._id} className="card mb-3 shadow-sm">
                  <div className="card-body">
                    <h6 className="fw-bold">{c.name}</h6>
                    <p className="mb-1">
                      <strong>Class:</strong> {c.className}
                    </p>
                    <p className="mb-1">
                      <strong>Code:</strong> {c.code}
                    </p>
                    <p className="mb-1">
                      <strong>Teacher:</strong> {c.teacher?.name}
                    </p>
                    <span
                      className={`badge ${
                        c.status === "Active" ? "bg-success" : "bg-secondary"
                      }`}
                    >
                      {c.status}
                    </span>
                    <div className="d-flex gap-2 mt-2">
                      <button
                        className="btn btn-warning btn-sm w-50"
                        onClick={() => handleEdit(c)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm w-50"
                        onClick={() => handleDelete(c._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {filteredCourses.length === 0 && (
                <p className="text-center">No courses found</p>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesManager;