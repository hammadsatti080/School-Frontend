/*import React, { useEffect, useState } from "react";

export default function ResultList() {
  const [results, setResults] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);

  // For editing
  const [subjects, setSubjects] = useState([]);
  const [subjectTotals, setSubjectTotals] = useState([]);
  const [totalSubjects, setTotalSubjects] = useState("");

  const marksOptions = [50, 60, 70, 80, 90, 100];

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    const res = await fetch("http://localhost:5000/api/results");
    const data = await res.json();
    setResults(data);
  };

  // Edit Result
  const handleEdit = (result) => {
    setSelectedResult(result);
    setSubjects(result.subjects.map(s => ({ ...s })));
    setSubjectTotals(result.subjects.map(s => Number(s.total)));
    setTotalSubjects(result.subjects.length);
    setModalOpen(true);
  };

  // Delete Result
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this result?")) return;
    await fetch(`http://localhost:5000/api/results/${id}`, {
      method: "DELETE",
    });
    fetchResults();
  };

  // Handle subject changes
  const handleSubjectChange = (index, field, value) => {
    const updated = [...subjects];
    updated[index][field] = value;
    setSubjects(updated);
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

  const totalMarks = subjectTotals.reduce((sum, n) => sum + Number(n || 0), 0);
  const obtainMarks = subjects.reduce((sum, s) => sum + Number(s.obtain || 0), 0);
  const percentage = totalMarks > 0 ? ((obtainMarks * 100) / totalMarks).toFixed(2) : 0;
  const failedSubjects = subjects
    .filter(s => Number(s.obtain) < (Number(s.total) * 0.5))
    .map(s => s.name);
  const status = failedSubjects.length > 0 || Number(percentage) < 50 ? "Fail" : "Pass";

  const saveResult = async () => {
    if (!selectedResult) return;

    await fetch(`http://localhost:5000/api/results/${selectedResult._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentId: selectedResult.studentId,
        studentName: selectedResult.studentName,
        class: selectedResult.class,
        subjects: subjects.map((s, i) => ({ ...s, total: subjectTotals[i] })),
        totalMarks,
        obtainMarks,
        percentage,
        status
      })
    });

    setModalOpen(false);
    fetchResults();
  };

  return (
    <div className="container mt-4">

      
      <div className="d-none d-md-block">
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Class</th>
              <th>Total</th>
              <th>Obtain</th>
              <th>%</th>
              <th>Status</th>
              <th>Failed Subjects</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {results.map(r => {
              const failedSubjects = r.subjects
                .filter(s => Number(s.obtain) < (Number(s.total) * 0.5))
                .map(s => s.name);
              const hasFailSubject = failedSubjects.length > 0;
              const status = hasFailSubject || Number(r.percentage) < 50 ? "Fail" : "Pass";

              return (
                <tr key={r._id}>
                  <td>{r.studentName}</td>
                  <td>{r.class}</td>
                  <td>{r.totalMarks}</td>
                  <td>{r.obtainMarks}</td>
                  <td>{r.percentage}</td>
                  <td>
                    <span className={status === "Pass" ? "badge bg-success" : "badge bg-danger"}>
                      {status}
                    </span>
                  </td>
                  <td>{failedSubjects.length > 0 ? `(${failedSubjects.join(", ")})` : "-"}</td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(r)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(r._id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="d-md-none">
        {results.map(r => {
          const failedSubjects = r.subjects
            .filter(s => Number(s.obtain) < (Number(s.total) * 0.5))
            .map(s => s.name);
          const hasFailSubject = failedSubjects.length > 0;
          const status = hasFailSubject || Number(r.percentage) < 50 ? "Fail" : "Pass";

          return (
            <div className="card mb-2" key={r._id}>
              <div className="card-body">
                <h6>{r.studentName}</h6>
                <p>Class: {r.class}</p>
                <p>Total: {r.totalMarks}</p>
                <p>Obtain: {r.obtainMarks}</p>
                <p>%: {r.percentage}</p>
                <p>Status:
                  <span className={status === "Pass" ? "badge bg-success ms-2" : "badge bg-danger ms-2"}>
                    {status}
                  </span>
                </p>
                <p>Failed Subjects: {failedSubjects.length > 0 ? `(${failedSubjects.join(", ")})` : "-"}</p>
                <div className="mt-2">
                  <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(r)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(r._id)}>Delete</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>


      {modalOpen && selectedResult && (
        <div className="modal show d-block">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Edit Result - {selectedResult.studentName}</h5>
                <button className="btn-close" onClick={() => setModalOpen(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label>Total Subjects</label>
                  <input
                    type="number"
                    className="form-control"
                    value={totalSubjects}
                    onChange={e => {
                      const val = Number(e.target.value);
                      setTotalSubjects(val);
                      setSubjects(Array.from({ length: val }, () => ({ name: "", obtain: "", code: "" })));
                      setSubjectTotals(Array.from({ length: val }, () => 50));
                    }}
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
                <button className="btn btn-primary" onClick={saveResult}>Save</button>
                <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
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

export default function ResultList() {
  const [results, setResults] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);

  const [subjects, setSubjects] = useState([]);
  const [subjectTotals, setSubjectTotals] = useState([]);
  const [totalSubjects, setTotalSubjects] = useState("");
  const [selectedClass, setSelectedClass] = useState(""); // NEW: class filter

  const marksOptions = [50, 60, 70, 80, 90, 100];

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    const res = await fetch("https://school-backend-blond.vercel.app/api/results");
    const data = await res.json();
    setResults(data);
  };

  const filteredResults = selectedClass
    ? results.filter(r => Number(r.class) === Number(selectedClass))
    : results;

  const handleEdit = (result) => {
    setSelectedResult(result);
    setSubjects(result.subjects.map(s => ({ ...s })));
    setSubjectTotals(result.subjects.map(s => Number(s.total)));
    setTotalSubjects(result.subjects.length);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this result?")) return;
    await fetch(`https://school-backend-blond.vercel.app/api/results/${id}`, { method: "DELETE" });
    fetchResults();
  };

  const handleSubjectChange = (index, field, value) => {
    const updated = [...subjects];
    updated[index][field] = value;
    setSubjects(updated);
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

  const totalMarks = subjectTotals.reduce((sum, n) => sum + Number(n || 0), 0);
  const obtainMarks = subjects.reduce((sum, s) => sum + Number(s.obtain || 0), 0);
  const percentage = totalMarks > 0 ? ((obtainMarks * 100) / totalMarks).toFixed(2) : 0;
  const failedSubjects = subjects
    .filter(s => Number(s.obtain) < (Number(s.total) * 0.5))
    .map(s => s.name);
  const status = failedSubjects.length > 0 || Number(percentage) < 50 ? "Fail" : "Pass";

  const saveResult = async () => {
    if (!selectedResult) return;

    await fetch(`https://school-backend-blond.vercel.app/api/results/${selectedResult._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentId: selectedResult.studentId,
        studentName: selectedResult.studentName,
        class: selectedResult.class,
        subjects: subjects.map((s, i) => ({ ...s, total: subjectTotals[i] })),
        totalMarks,
        obtainMarks,
        percentage,
        status
      })
    });

    setModalOpen(false);
    fetchResults();
  };

  return (
    <div className="container mt-4">

      {/* CLASS FILTER */}
      <div className="mb-3">
        <label>Filter by Class</label>
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

      {/* Desktop */}
      <div className="d-none d-md-block">
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Class</th>
              <th>Total</th>
              <th>Obtain</th>
              <th>%</th>
              <th>Status</th>
              <th>Failed Subjects</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredResults.map(r => {
              const failedSubjects = r.subjects
                .filter(s => Number(s.obtain) < (Number(s.total) * 0.5))
                .map(s => s.name);
              const hasFailSubject = failedSubjects.length > 0;
              const status = hasFailSubject || Number(r.percentage) < 50 ? "Fail" : "Pass";

              return (
                <tr key={r._id}>
                  <td>{r.studentName}</td>
                  <td>{r.class}</td>
                  <td>{r.totalMarks}</td>
                  <td>{r.obtainMarks}</td>
                  <td>{r.percentage}</td>
                  <td>
                    <span className={status === "Pass" ? "badge bg-success" : "badge bg-danger"}>
                      {status}
                    </span>
                  </td>
                  <td>{failedSubjects.length > 0 ? `(${failedSubjects.join(", ")})` : "-"}</td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(r)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(r._id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="d-md-none">
        {filteredResults.map(r => {
          const failedSubjects = r.subjects
            .filter(s => Number(s.obtain) < (Number(s.total) * 0.5))
            .map(s => s.name);
          const hasFailSubject = failedSubjects.length > 0;
          const status = hasFailSubject || Number(r.percentage) < 50 ? "Fail" : "Pass";

          return (
            <div className="card mb-2" key={r._id}>
              <div className="card-body">
                <h6>{r.studentName}</h6>
                <p>Class: {r.class}</p>
                <p>Total: {r.totalMarks}</p>
                <p>Obtain: {r.obtainMarks}</p>
                <p>%: {r.percentage}</p>
                <p>Status:
                  <span className={status === "Pass" ? "badge bg-success ms-2" : "badge bg-danger ms-2"}>
                    {status}
                  </span>
                </p>
                <p>Failed Subjects: {failedSubjects.length > 0 ? `(${failedSubjects.join(", ")})` : "-"}</p>
                <div className="mt-2">
                  <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(r)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(r._id)}>Delete</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Modal */}
      {modalOpen && selectedResult && (
        <div className="modal show d-block">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Edit Result - {selectedResult.studentName}</h5>
                <button className="btn-close" onClick={() => setModalOpen(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label>Total Subjects</label>
                  <input
                    type="number"
                    className="form-control"
                    value={totalSubjects}
                    onChange={e => {
                      const val = Number(e.target.value);
                      setTotalSubjects(val);
                      setSubjects(Array.from({ length: val }, () => ({ name: "", obtain: "", code: "" })));
                      setSubjectTotals(Array.from({ length: val }, () => 50));
                    }}
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
                <button className="btn btn-primary" onClick={saveResult}>Save</button>
                <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}