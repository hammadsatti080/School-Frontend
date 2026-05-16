/*import React, { useEffect, useState } from "react";

export default function Result() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [totalSubjects, setTotalSubjects] = useState("");
  const [subjectTotals, setSubjectTotals] = useState([]); // Full marks
  const [subjects, setSubjects] = useState([]); // Obtained marks, name, code

  const marksOptions = [50, 60, 70, 80, 90, 100]; // dropdown options

  // Fetch students
  useEffect(() => {
    fetch("http://localhost:5000/api/enrollments")
      .then(res => res.json())
      .then(data => setStudents(data));
  }, []);

  // Step 1: Total Subjects
  const handleTotalSubjects = (value) => {
    const total = Number(value);
    setTotalSubjects(total);

    // Create independent objects for each subject
    setSubjects(Array.from({ length: total }, () => ({ name: "", obtain: "", code: "" })));

    // Initialize subject total marks (default 50)
    setSubjectTotals(Array.from({ length: total }, () => 50));
  };

  // Step 2: Change total marks (dropdown)
  const handleSubjectTotalChange = (index, value) => {
    const updated = [...subjectTotals];
    updated[index] = Number(value);
    setSubjectTotals(updated);
  };

  // Step 2b: Increase / Decrease marks
  const incrementMarks = (index) => {
    const updated = [...subjectTotals];
    const current = updated[index];
    const next = marksOptions.find(m => m > current);
    if (next) updated[index] = next;
    setSubjectTotals(updated);
  };
  const decrementMarks = (index) => {
    const updated = [...subjectTotals];
    const current = updated[index];
    const prev = [...marksOptions].reverse().find(m => m < current);
    if (prev) updated[index] = prev;
    setSubjectTotals(updated);
  };

  // Step 3: Enter obtained marks
  const handleSubjectChange = (index, field, value) => {
    const updated = [...subjects];
    updated[index][field] = value;
    setSubjects(updated);
  };

  // Calculations
  const totalMarks = subjectTotals.reduce((sum, n) => sum + Number(n || 0), 0);
  const obtainMarks = subjects.reduce((sum, s) => sum + Number(s.obtain || 0), 0);
  const percentage = totalMarks > 0 ? ((obtainMarks * 100) / totalMarks).toFixed(2) : 0;
  const status = percentage >= 40 ? "Pass" : "Fail";

  // Save Result
  const saveResult = async () => {
    if (subjects.length !== Number(totalSubjects)) {
      alert("Please fill all subjects");
      return;
    }

    await fetch("http://localhost:5000/api/results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentId: selectedStudent._id,
        studentName: selectedStudent.studentName,
        class: selectedStudent.studentClass,
        subjects: subjects.map((s, i) => ({ ...s, total: subjectTotals[i] })),
        totalMarks,
        obtainMarks,
        percentage,
        status
      })
    });

    setModalOpen(false);
    setSubjects([]);
    setSubjectTotals([]);
    setTotalSubjects("");
  };

  return (
    <div className="container mt-4">
      <h4>Students</h4>

      {students.map((stu) => (
        <div key={stu._id} className="card mb-2">
          <div className="card-body d-flex justify-content-between">
            <div>{stu.studentName} - Class {stu.studentClass}</div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => { setSelectedStudent(stu); setModalOpen(true); }}
            >
              Add Result
            </button>
          </div>
        </div>
      ))}

     {modalOpen && (
  <div className="modal show d-block">
    <div className="modal-dialog modal-lg">
      <div className="modal-content">

    
        <div className="modal-header d-flex justify-content-between align-items-center">
          <h5 className="modal-title">Result - {selectedStudent?.studentName}</h5>
          <button 
            type="button" 
            className="btn-close" 
            aria-label="Close"
            onClick={() => setModalOpen(false)}
          ></button>
        </div>

        <div className="modal-body">

          
          <div className="mb-3">
            <label>Total Subjects</label>
            <input
              type="number"
              min="1"
              className="form-control"
              value={totalSubjects ? totalSubjects : ""}
              placeholder="Enter total subjects"
              onChange={(e) => handleTotalSubjects(e.target.value)}
            />
          </div>

        
          {subjectTotals.map((total, index) => (
            <div key={index} className="d-flex mb-2 align-items-center gap-2">
              <label>Subject {index + 1} Total Marks:</label>
              <button className="btn btn-sm btn-secondary" onClick={() => decrementMarks(index)}>-</button>
              <select
                className="form-select w-auto"
                value={total}
                onChange={(e) => handleSubjectTotalChange(index, e.target.value)}
              >
                {marksOptions.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              <button className="btn btn-sm btn-secondary" onClick={() => incrementMarks(index)}>+</button>
            </div>
          ))}

          {subjects.map((sub, index) => (
            <div key={index} className="border p-2 mb-2">
              <div className="row g-2">
                <div className="col-md-4">
                  <input
                    placeholder="Subject Name"
                    className="form-control"
                    value={sub.name}
                    onChange={(e) => handleSubjectChange(index, "name", e.target.value)}
                  />
                </div>

                <div className="col-md-3">
                  <input
                    placeholder="Obtain Marks"
                    type="number"
                    className="form-control"
                    value={sub.obtain}
                    onChange={(e) => handleSubjectChange(index, "obtain", e.target.value)}
                  />
                </div>

                <div className="col-md-3">
                  <input
                    placeholder="Code"
                    className="form-control"
                    value={sub.code}
                    onChange={(e) => handleSubjectChange(index, "code", e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}

          <hr />
          <h6>Total Marks: {totalMarks}</h6>
          <h6>Obtained Marks: {obtainMarks}</h6>
          <h6>Percentage: {percentage}%</h6>
          <h6>Status: {status}</h6>

        </div>

        <div className="modal-footer">
          <button className="btn btn-primary" onClick={saveResult}>Save Result</button>
        </div>

      </div>
    </div>
  </div>
)}
    </div>
  );
}
  */

import React, { useEffect, useState } from "react";

export default function Result() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [totalSubjects, setTotalSubjects] = useState("");
  const [subjectTotals, setSubjectTotals] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedClass, setSelectedClass] = useState(""); // NEW

  const marksOptions = [50, 60, 70, 80, 90, 100];

  useEffect(() => {
    fetch("https://school-backend-blond.vercel.app/api/enrollments")
      .then(res => res.json())
      .then(data => setStudents(data));
  }, []);

  // Filtered students by class
  const filteredStudents = selectedClass
    ? students.filter(stu => Number(stu.studentClass) === Number(selectedClass))
    : students;

  const handleTotalSubjects = (value) => {
    const total = Number(value);
    setTotalSubjects(total);
    setSubjects(Array.from({ length: total }, () => ({ name: "", obtain: "", code: "" })));
    setSubjectTotals(Array.from({ length: total }, () => 50));
  };

  const handleSubjectTotalChange = (index, value) => {
    const updated = [...subjectTotals];
    updated[index] = Number(value);
    setSubjectTotals(updated);
  };

  const incrementMarks = (index) => {
    const updated = [...subjectTotals];
    const current = updated[index];
    const next = marksOptions.find(m => m > current);
    if (next) updated[index] = next;
    setSubjectTotals(updated);
  };
  const decrementMarks = (index) => {
    const updated = [...subjectTotals];
    const current = updated[index];
    const prev = [...marksOptions].reverse().find(m => m < current);
    if (prev) updated[index] = prev;
    setSubjectTotals(updated);
  };

  const handleSubjectChange = (index, field, value) => {
    const updated = [...subjects];
    updated[index][field] = value;
    setSubjects(updated);
  };

  const totalMarks = subjectTotals.reduce((sum, n) => sum + Number(n || 0), 0);
  const obtainMarks = subjects.reduce((sum, s) => sum + Number(s.obtain || 0), 0);
  const percentage = totalMarks > 0 ? ((obtainMarks * 100) / totalMarks).toFixed(2) : 0;
  const status = percentage >= 40 ? "Pass" : "Fail";

  const saveResult = async () => {
    if (subjects.length !== Number(totalSubjects)) {
      alert("Please fill all subjects");
      return;
    }

    await fetch("https://school-backend-blond.vercel.app/api/results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentId: selectedStudent._id,
        studentName: selectedStudent.studentName,
        class: selectedStudent.studentClass,
        subjects: subjects.map((s, i) => ({ ...s, total: subjectTotals[i] })),
        totalMarks,
        obtainMarks,
        percentage,
        status
      })
    });

    setModalOpen(false);
    setSubjects([]);
    setSubjectTotals([]);
    setTotalSubjects("");
  };

  return (
    <div className="container mt-4">
      <h4>Students</h4>

      {/* FILTER BY CLASS */}
      <div className="mb-3">
        
        <select
          className="form-select w-auto"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">All Classes</option>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              Class {i + 1}
            </option>
          ))}
        </select>
      </div>

      {filteredStudents.map((stu) => (
        <div key={stu._id} className="card mb-2">
          <div className="card-body d-flex justify-content-between">
            <div>{stu.studentName} - Class {stu.studentClass}</div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => { setSelectedStudent(stu); setModalOpen(true); }}
            >
              Add Result
            </button>
          </div>
        </div>
      ))}

      {/* MODAL */}
      {modalOpen && selectedStudent && (
        <div className="modal show d-block">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">

              <div className="modal-header d-flex justify-content-between align-items-center">
                <h5>Result - {selectedStudent.studentName}</h5>
                <button className="btn-close" onClick={() => setModalOpen(false)}></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label>Total Subjects</label>
                  <input
                    type="number"
                    min="1"
                    className="form-control"
                    value={totalSubjects ? totalSubjects : ""}
                    onChange={(e) => handleTotalSubjects(e.target.value)}
                  />
                </div>

                {subjectTotals.map((total, index) => (
                  <div key={index} className="d-flex mb-2 align-items-center gap-2">
                    <label>Subject {index + 1} Total Marks:</label>
                    <button className="btn btn-sm btn-secondary" onClick={() => decrementMarks(index)}>-</button>
                    <select
                      className="form-select w-auto"
                      value={total}
                      onChange={(e) => handleSubjectTotalChange(index, e.target.value)}
                    >
                      {marksOptions.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <button className="btn btn-sm btn-secondary" onClick={() => incrementMarks(index)}>+</button>
                  </div>
                ))}

                {subjects.map((sub, index) => (
                  <div key={index} className="border p-2 mb-2">
                    <div className="row g-2">
                      <div className="col-md-4">
                        <input
                          placeholder="Subject Name"
                          className="form-control"
                          value={sub.name}
                          onChange={(e) => handleSubjectChange(index, "name", e.target.value)}
                        />
                      </div>
                      <div className="col-md-3">
                        <input
                          placeholder="Obtain Marks"
                          type="number"
                          className="form-control"
                          value={sub.obtain}
                          onChange={(e) => handleSubjectChange(index, "obtain", e.target.value)}
                        />
                      </div>
                      <div className="col-md-3">
                        <input
                          placeholder="Code"
                          className="form-control"
                          value={sub.code}
                          onChange={(e) => handleSubjectChange(index, "code", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <hr />
                <h6>Total Marks: {totalMarks}</h6>
                <h6>Obtained Marks: {obtainMarks}</h6>
                <h6>Percentage: {percentage}%</h6>
                <h6>Status: {status}</h6>
              </div>

              <div className="modal-footer">
                <button className="btn btn-primary" onClick={saveResult}>Save Result</button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}