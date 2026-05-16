/*
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const ViewList = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/register")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        const allCourses = data.flatMap((d) => d.courses || []);
        const uniqueCourses = [...new Set(allCourses.map((c) => c.name))];
        setCourses(uniqueCourses);
      });
  }, []);

  const filteredData = filter
    ? data.filter((d) => (d.courses || []).some((c) => c.name === filter))
    : data;

  const handlePrint = (student) => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
      <head>
        <title>Fee Challan - ${student.studentName}</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; }
          .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
          .logo { font-weight: bold; font-size: 24px; color: #007bff; }
          h2 { text-align: center; margin-bottom: 20px; }
          .student-info p { margin: 4px 0; font-size: 16px; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          th, td { border: 1px solid #000; padding: 10px; text-align: left; }
          th { background-color: #007bff; color: white; font-weight: 600; }
          tfoot td { font-weight: bold; }
          .signature { margin-top: 40px; text-align: right; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">My App</div>
          <div>${new Date().toLocaleDateString()}</div>
        </div>
        <h2>Fee Challan</h2>
        <div class="student-info">
          <p><strong>Name:</strong> ${student.studentName}</p>
          <p><strong>Father:</strong> ${student.fatherName}</p>
          <p><strong>Contact:</strong> ${student.contact}</p>
        </div>
        <table>
          <thead>
            <tr >
              <th ><strong >Course</strong></th>
              <th><strong>Fee</strong></th>
            </tr>
          </thead>
          <tbody>
            ${(student.courses || []).map(
              (c) => `<tr><td>${c.name}</td><td>Rs ${c.price}</td></tr>`
            ).join("")}
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td>Rs ${student.total}</td>
            </tr>
          </tfoot>
        </table>
        <div class="signature">Signature: __________________</div>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };
const navigate = useNavigate();
  const handleEdit = (student) => {
  navigate("/", { state: { student } });
};

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Registered Students</h2>

      
      <div className="mb-3 d-flex align-items-center gap-2">
        <label className="form-label mb-0">Filter by Course:</label>
        <select
          className="form-select w-auto"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All Courses</option>
          {courses.map((c, i) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

  
      <div className="table-responsive" style={{ maxHeight: "400px", overflowY: "auto" }}>
        <table className="table table-bordered table-striped table-hover">
          <thead className="table-primary position-sticky top-0">
            <tr>
              <th>Name</th>
              <th>Father</th>
              <th>Contact</th>
              <th>Courses</th>
              <th>Total</th>
              <th className="text-end">Action</th>
            
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((d, i) => (
                <tr key={i}>
                  <td>{d.studentName}</td>
                  <td>{d.fatherName}</td>
                  <td>{d.contact}</td>
                  <td>{(d.courses || []).map((c) => c.name).join(", ")}</td>
                  <td>Rs {d.total}</td>
                  <td className="text-end">
                      <div className="d-flex justify-content-end gap-2">
                      <button
                    className="btn btn-sm btn-warning"
                     onClick={() => handleEdit(d)}
                     >
                    Edit
                    </button>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handlePrint(d)}
                    >
                      Print
                    </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewList;
*/
import React, { useEffect, useState } from "react";

const ViewList = () => {
  const [students, setStudents] = useState([]);
  const [filter] = useState("");
  const [ setCourses] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null); // student being edited

  // Form state
  const [form, setForm] = useState({
    studentName: "",
    fatherName: "",
    contact: "",
  });
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");

  const coursesList = [
    { id: 1, name: "Web Development", price: 15000 },
    { id: 2, name: "Programming Fundamentals", price: 12000 },
    { id: 3, name: "App Development", price: 18000 },
    { id: 4, name: "Database & SQL", price: 10000 },
    { id: 5, name: "AI & Machine Learning", price: 22000 },
    { id: 6, name: "Cybersecurity Basics", price: 14000 },
  ];

  const fetchStudents = () => {
    fetch("https://school-backend-blond.vercel.app/api/register")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        const allCourses = data.flatMap((d) => d.courses || []);
        setCourses([...new Set(allCourses.map((c) => c.name))]);
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const total = selectedCourses.reduce((sum, c) => sum + c.price, 0);

  const handleAddCourse = (id) => {
    const course = coursesList.find((c) => c.id === Number(id));
    if (!course) return;
    if (!selectedCourses.find((c) => c.id === course.id)) {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  const removeCourse = (id) => {
    setSelectedCourses(selectedCourses.filter((c) => c.id !== id));
  };

  // Edit button clicked
  const handleEdit = (student) => {
    setEditingStudent(student);
    setForm({
      studentName: student.studentName,
      fatherName: student.fatherName,
      contact: student.contact,
    });
    setSelectedCourses(student.courses || []);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Save updates
  const handleSave = async () => {
    if (!form.studentName || !form.fatherName || !form.contact || selectedCourses.length === 0) {
      alert("Fill all fields and select at least one course");
      return;
    }

    const payload = { ...form, courses: selectedCourses, total };
    try {
      const res = await fetch(`https://school-backend-blond.vercel.app/api/register/${editingStudent._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      alert(data.message);

      setForm({ studentName: "", fatherName: "", contact: "" });
      setSelectedCourses([]);
      setSelectedCourseId("");
      setEditingStudent(null);
      fetchStudents();
    } catch (err) {
      console.error(err);
      alert("Error updating data");
    }
  };

  const filteredData = filter
    ? students.filter((s) => (s.courses || []).some((c) => c.name === filter))
    : students;

  // Print function
  const handlePrint = (student) => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
      <head>
        <title>Fee Challan - ${student.studentName}</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; }
          .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
          .logo { font-weight: bold; font-size: 24px; color: #007bff; }
          h2 { text-align: center; margin-bottom: 20px; }
          .student-info p { margin: 4px 0; font-size: 16px; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          th, td { border: 1px solid #000; padding: 10px; text-align: left; }
          th { background-color: #007bff; color: white; font-weight: 600; }
          tfoot td { font-weight: bold; }
          .signature { margin-top: 40px; text-align: right; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">My App</div>
          <div>${new Date().toLocaleDateString()}</div>
        </div>
        <h2>Fee Challan</h2>
        <div class="student-info">
          <p><strong>Name:</strong> ${student.studentName}</p>
          <p><strong>Father:</strong> ${student.fatherName}</p>
          <p><strong>Contact:</strong> ${student.contact}</p>
        </div>
        <table>
          <thead>
            <tr>
              <th>Course</th>
              <th>Fee</th>
            </tr>
          </thead>
          <tbody>
            ${(student.courses || []).map((c) => `<tr><td>${c.name}</td><td>Rs ${c.price}</td></tr>`).join("")}
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td>Rs ${student.total}</td>
            </tr>
          </tfoot>
        </table>
        <div class="signature">Signature: __________________</div>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="container my-4">
      {/* ONLY SHOW FORM WHEN EDITING */}
      {editingStudent && (
        <div className="p-4 bg-white rounded shadow-sm mb-4">
          <h3>Edit Student</h3>
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
                onChange={(e) =>
                  setForm({ ...form, contact: e.target.value.replace(/[^0-9]/g, "") })
                }
              />
            </div>
          </div>

          <div className="mb-3">
            <select
              className="form-select"
              value={selectedCourseId}
              onChange={(e) => {
                setSelectedCourseId(e.target.value);
                handleAddCourse(e.target.value);
              }}
            >
              <option value="">-- Select Course --</option>
              {coursesList.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} - Rs {c.price}
                </option>
              ))}
            </select>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Fee</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedCourses.map((c) => (
                  <tr key={c.id}>
                    <td>{c.name}</td>
                    <td>Rs {c.price}</td>
                    <td>
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
            </table>
          </div>

          <button className="btn btn-success mt-3" onClick={handleSave}>
            Update
          </button>
        </div>
      )}

      {/* STUDENT TABLE */}
      <h3>Registered Students</h3>
      <div className="table-responsive" style={{ maxHeight: "400px", overflowY: "auto" }}>
        <table className="table table-bordered table-striped">
          <thead className="table-primary position-sticky top-0">
            <tr>
              <th>Name</th>
              <th>Father</th>
              <th>Contact</th>
              <th>Courses</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((s) => (
              <tr key={s._id}>
                <td>{s.studentName}</td>
                <td>{s.fatherName}</td>
                <td>{s.contact}</td>
                <td>{(s.courses || []).map((c) => c.name).join(", ")}</td>
                <td>Rs {s.total}</td>
                <td className="d-flex gap-2">
                  <button className="btn btn-warning btn-sm" onClick={() => handleEdit(s)}>
                    Edit
                  </button>
                  <button className="btn btn-primary btn-sm" onClick={() => handlePrint(s)}>
                    Print
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewList;