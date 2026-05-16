import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function FeeChallan() {
  const [students, setStudents] = useState([]);
  const [filterCnic, setFilterCnic] = useState("");

  useEffect(() => {
    fetch("https://school-backend-blond.vercel.app/api/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.log(err));
  }, []);

  const student = students.find((s) =>
    s.cnic.toLowerCase().includes(filterCnic.toLowerCase())
  );

  const feeStructure = {
    1: { classFee: 1000, paperFee: 200, admissionFee: 500, otherFee: 100 },
    2: { classFee: 1100, paperFee: 200, admissionFee: 500, otherFee: 150 },
    3: { classFee: 1200, paperFee: 250, admissionFee: 500, otherFee: 150 },
    4: { classFee: 1300, paperFee: 250, admissionFee: 500, otherFee: 200 },
    5: { classFee: 1500, paperFee: 300, admissionFee: 500, otherFee: 200 },
    6: { classFee: 1800, paperFee: 350, admissionFee: 500, otherFee: 250 },
    7: { classFee: 2000, paperFee: 400, admissionFee: 500, otherFee: 250 },
    8: { classFee: 2200, paperFee: 450, admissionFee: 500, otherFee: 300 },
    9: { classFee: 2500, paperFee: 500, admissionFee: 500, otherFee: 300 },
    10: { classFee: 3000, paperFee: 600, admissionFee: 500, otherFee: 350 },
    11: { classFee: 3500, paperFee: 700, admissionFee: 500, otherFee: 400 },
    12: { classFee: 4000, paperFee: 800, admissionFee: 500, otherFee: 400 },
  };

  const fee = student ? feeStructure[student.studentClass] : null;
  const totalFee = fee
    ? fee.classFee + fee.paperFee + fee.admissionFee + fee.otherFee
    : 0;
  const fine = 100;

  const handlePrint = () => {
    if (!student) return alert("Please enter a valid CNIC!");

    const printContent = `
      <html>
        <head>
          <title>Fee Challan - ${student.cnic}</title>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
          <style>
            body { padding: 20px; }
            h1,h2,h3 { text-align:center; color:#1e3a8a; margin:5px 0; }
          </style>
        </head>
        <body>
          <h1>ABC Public School</h1>
          <p class="text-center">123 Main Street, Rawalpindi | Contact: 0300-0000000</p>

          <div class="mb-4">
            <h3>Student Information</h3>
            <div class="row">
              <div class="col-12 col-md-6"><strong>Name:</strong> ${student.name}</div>
              <div class="col-12 col-md-6"><strong>Father Name:</strong> ${student.fatherName}</div>
              <div class="col-12 col-md-6"><strong>Class:</strong> ${student.studentClass}</div>
              <div class="col-12 col-md-6"><strong>CNIC / Username:</strong> ${student.cnic}</div>
              <div class="col-12 col-md-6"><strong>Phone:</strong> ${student.phone}</div>
              <div class="col-12 col-md-6"><strong>Address:</strong> ${student.address}</div>
            </div>
          </div>

          <div class="mb-4">
            <h3>Fee Details</h3>
            <table class="table table-bordered table-striped">
              <thead class="table-primary">
                <tr>
                  <th>Fee Type</th>
                  <th>Amount (Rs)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Class Fee</td><td>${fee.classFee}</td></tr>
                <tr><td>Paper Fee</td><td>${fee.paperFee}</td></tr>
                <tr><td>Admission Fee</td><td>${fee.admissionFee}</td></tr>
                <tr><td>Other Fee</td><td>${fee.otherFee}</td></tr>
                <tr class="fw-bold table-secondary"><td>Total Fee</td><td>${totalFee}</td></tr>
                <tr class="fw-bold table-warning"><td>After Due Date (+100 Rs)</td><td>${totalFee + fine}</td></tr>
              </tbody>
            </table>
          </div>
        </body>
      </html>
    `;

    const newWin = window.open("", "_blank");
    newWin.document.write(printContent);
    newWin.document.close();
    newWin.focus();
    newWin.onload = () => newWin.print();
  };

  return (
    <div className="container my-4">
      <h2 className="text-center text-primary mb-4">Student Fee Challan</h2>

      <div className="row mb-3 justify-content-center g-2">
        <div className="col-12 col-md-6">
          <input
            type="text"
            value={filterCnic}
            onChange={(e) => setFilterCnic(e.target.value)}
            placeholder="Enter CNIC"
            className="form-control"
          />
        </div>
        <div className="col-auto">
          <button className="btn btn-primary" onClick={handlePrint}>
            Print Full Challan
          </button>
        </div>
      </div>

      {student ? (
        <div className="card shadow-sm p-3 mb-3">
          <h5 className="text-center mb-3 text-secondary"><strong>Preview</strong></h5>
          <div className="row mb-2">
            <div className="col-12 col-md-6"><strong>Name:</strong> {student.name}</div>
            <div className="col-12 col-md-6"><strong>Father Name:</strong> {student.fatherName}</div>
            <div className="col-12 col-md-6"><strong>Class:</strong> {student.studentClass}</div>
            <div className="col-12 col-md-6"><strong>CNIC / Username:</strong> {student.cnic}</div>
            <div className="col-12 col-md-6"><strong>Phone:</strong> {student.phone}</div>
            <div className="col-12 col-md-6"><strong>Address:</strong> {student.address}</div>
          </div>

          <h5 className="text-center mt-4 mb-3 text-secondary"><strong>Fee Details</strong></h5>
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="table-primary">
                <tr>
                  <th>Fee Type</th>
                  <th>Amount (Rs)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Class Fee</td><td>{fee.classFee}</td></tr>
                <tr><td>Paper Fee</td><td>{fee.paperFee}</td></tr>
                <tr><td>Admission Fee</td><td>{fee.admissionFee}</td></tr>
                <tr><td>Other Fee</td><td>{fee.otherFee}</td></tr>
                <tr className="fw-bold table-secondary"><td>Total Fee</td><td>{totalFee}</td></tr>
                <tr className="fw-bold table-warning"><td>After Due Date (+100 Rs)</td><td>{totalFee + fine}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : filterCnic ? (
        <p className="text-danger text-center">No student found</p>
      ) : null}
    </div>
  );
}