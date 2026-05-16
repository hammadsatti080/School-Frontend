/*
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const FeeChallan = () => {
  const courses = [
    { id: 1, name: "Web Development", price: 15000 },
    { id: 2, name: "Programming Fundamentals", price: 12000 },
    { id: 3, name: "App Development", price: 18000 },
    { id: 4, name: "Database & SQL", price: 10000 },
    { id: 5, name: "AI & Machine Learning", price: 22000 },
    { id: 6, name: "Cybersecurity Basics", price: 14000 },
  ];

  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [form, setForm] = useState({
    studentName: "",
    fatherName: "",
    contact: "",
  });

  const handleAddCourse = (id) => {
    const course = courses.find((c) => c.id === Number(id));
    if (!course) return;
    if (!selectedCourses.find((c) => c.id === course.id)) {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  const removeCourse = (id) => {
    setSelectedCourses(selectedCourses.filter((c) => c.id !== id));
  };

  const total = selectedCourses.reduce((sum, c) => sum + c.price, 0);

  useEffect(() => {
    const now = new Date();
    setDateTime(`${now.toLocaleDateString()} ${now.toLocaleTimeString()}`);
  }, []);

  const handleSave = async () => {
    if (!form.studentName || !form.fatherName || !form.contact || selectedCourses.length === 0) {
      alert("Please fill all fields and select at least one course");
      return;
    }
    const payload = { ...form, courses: selectedCourses, total };
    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      alert(data.message);
      setForm({ studentName: "", fatherName: "", contact: "" });
      setSelectedCourses([]);
      setSelectedCourseId("");
    } catch (err) {
      console.error(err);
      alert("Error saving data");
    }
  };

  const navigate = useNavigate();
  const handlePrint = () => {
    navigate("/ViewList");
  };


  
  return (
    <div className="container my-4 p-4 bg-white rounded shadow-sm">
      <h2 className="text-center mb-4">Fee Challan</h2>

      <div className="row g-3 mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Student Name"
            value={form.studentName}
            onChange={(e) => setForm({ ...form, studentName: e.target.value })}
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Father Name"
            value={form.fatherName}
            onChange={(e) => setForm({ ...form, fatherName: e.target.value })}
          />
        </div>
        <div className="col-md-4">
          <input
  type="tel"
  className="form-control"
  placeholder="Contact"
  value={form.contact}
  onChange={(e) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // only numbers
    setForm({ ...form, contact: value });
  }}
/>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Date & Time</label>
        <input className="form-control" value={dateTime} readOnly />
      </div>

      <div className="mb-3 d-print-none">
        <select
          className="form-select"
          value={selectedCourseId}
          onChange={(e) => {
            setSelectedCourseId(e.target.value);
            handleAddCourse(e.target.value);
          }}
        >
          <option value="">-- Select Course --</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} - Rs {c.price}
            </option>
          ))}
        </select>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-primary">
            <tr>
              <th>Course</th>
              <th>Fee</th>
              <th className="d-print-none">Action</th>
            </tr>
          </thead>
          <tbody>
            {selectedCourses.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>Rs {c.price}</td>
                <td className="d-print-none">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeCourse(c.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="text-end fw-bold">Total</td>
              <td colSpan="2" className="fw-bold">
                Rs {total}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="mt-3 d-flex gap-2 d-print-none">
        <button className="btn btn-success" onClick={handleSave}>
          Add
        </button>
        <button className="btn btn-primary" onClick={handlePrint}>
          View List
        </button>
      </div>

      <div className="text-end mt-4 fw-bold">Signature: __________________</div>
    </div>
  );
};

export default FeeChallan;

*/

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const FeeChallan = () => {
  const courses = [
    { id: 1, name: "Web Development", price: 15000 },
    { id: 2, name: "Programming Fundamentals", price: 12000 },
    { id: 3, name: "App Development", price: 18000 },
    { id: 4, name: "Database & SQL", price: 10000 },
    { id: 5, name: "AI & Machine Learning", price: 22000 },
    { id: 6, name: "Cybersecurity Basics", price: 14000 },
  ];

  const location = useLocation();
  const navigate = useNavigate();

  const editingStudent = location.state?.student || null;

  const [studentId, setStudentId] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [form, setForm] = useState({
    studentName: "",
    fatherName: "",
    contact: "",
  });

  // Populate form if editing
  useEffect(() => {
    if (editingStudent) {
      setForm({
        studentName: editingStudent.studentName,
        fatherName: editingStudent.fatherName,
        contact: editingStudent.contact,
      });
      setSelectedCourses(editingStudent.courses);
      setStudentId(editingStudent._id);
    }
  }, [editingStudent]);

  useEffect(() => {
    const now = new Date();
    setDateTime(`${now.toLocaleDateString()} ${now.toLocaleTimeString()}`);
  }, []);

  const handleAddCourse = (id) => {
    const course = courses.find((c) => c.id === Number(id));
    if (!course) return;
    if (!selectedCourses.find((c) => c.id === course.id)) {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  const removeCourse = (id) => {
    setSelectedCourses(selectedCourses.filter((c) => c.id !== id));
  };

  const total = selectedCourses.reduce((sum, c) => sum + c.price, 0);

  const handleSave = async () => {
    if (!form.studentName || !form.fatherName || !form.contact || selectedCourses.length === 0) {
      alert("Please fill all fields and select at least one course");
      return;
    }

    const payload = { ...form, courses: selectedCourses, total };

    try {
      let res;
      if (studentId) {
        // Edit existing
        res = await fetch(`https://school-backend-blond.vercel.app/api/register/${studentId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // Add new
        res = await fetch("https://school-backend-blond.vercel.app/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      alert(data.message);

      // Reset form
      setForm({ studentName: "", fatherName: "", contact: "" });
      setSelectedCourses([]);
      setSelectedCourseId("");
      setStudentId("");

      navigate("/ViewList"); // Go back to list
    } catch (err) {
      console.error(err);
      alert("Error saving data");
    }
  };

  const handlePrint = () => {
    navigate("/ViewList");
  };

  return (
    <div className="container my-4 p-4 bg-white rounded shadow-sm">
      <h2 className="text-center mb-4">{studentId ? "Edit Fee Challan" : "Fee Challan"}</h2>

      <div className="row g-3 mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Student Name"
            value={form.studentName}
            onChange={(e) => setForm({ ...form, studentName: e.target.value })}
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Father Name"
            value={form.fatherName}
            onChange={(e) => setForm({ ...form, fatherName: e.target.value })}
          />
        </div>
        <div className="col-md-4">
          <input
            type="tel"
            className="form-control"
            placeholder="Contact"
            value={form.contact}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, "");
              setForm({ ...form, contact: value });
            }}
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Date & Time</label>
        <input className="form-control" value={dateTime} readOnly />
      </div>

      <div className="mb-3 d-print-none">
        <select
          className="form-select"
          value={selectedCourseId}
          onChange={(e) => {
            setSelectedCourseId(e.target.value);
            handleAddCourse(e.target.value);
          }}
        >
          <option value="">-- Select Course --</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} - Rs {c.price}
            </option>
          ))}
        </select>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-primary">
            <tr>
              <th>Course</th>
              <th>Fee</th>
              <th className="d-print-none">Action</th>
            </tr>
          </thead>
          <tbody>
            {selectedCourses.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>Rs {c.price}</td>
                <td className="d-print-none">
                  <button className="btn btn-danger btn-sm" onClick={() => removeCourse(c.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="text-end fw-bold">Total</td>
              <td colSpan="2" className="fw-bold">
                Rs {total}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="mt-3 d-flex gap-2 d-print-none">
        <button className="btn btn-success" onClick={handleSave}>
          {studentId ? "Update" : "Add"}
        </button>
        <button className="btn btn-primary" onClick={handlePrint}>
          View List
        </button>
      </div>

      <div className="text-end mt-4 fw-bold">Signature: __________________</div>
    </div>
  );
};

export default FeeChallan;