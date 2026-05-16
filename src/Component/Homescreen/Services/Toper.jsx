import React, { useState, useEffect } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css'; // Make sure Bootstrap Icons are imported

  const allStudents = {
    "1": [
      { name: "Ali", marks: 98 },
      { name: "Sara", marks: 95 },
      { name: "Hassan", marks: 93 },
      { name: "Zara", marks: 90 },
      { name: "Ahmed", marks: 89 },
      { name: "Aisha", marks: 88 },
    ],
    "2": [
      { name: "Bilal", marks: 97 },
      { name: "Sania", marks: 94 },
      { name: "Usman", marks: 91 },
      { name: "Maryam", marks: 89 },
      { name: "Tariq", marks: 88 },
      { name: "Fatima", marks: 87 },
    ],
    "3": [
      { name: "Hamza", marks: 96 },
      { name: "Hina", marks: 94 },
      { name: "Omar", marks: 92 },
      { name: "Sadia", marks: 91 },
      { name: "Adil", marks: 90 },
      { name: "Nida", marks: 88 },
    ],
    "4": [
      { name: "Fahad", marks: 97 },
      { name: "Laraib", marks: 95 },
      { name: "Aliya", marks: 92 },
      { name: "Rehan", marks: 91 },
      { name: "Zain", marks: 90 },
      { name: "Mary", marks: 88 },
    ],
    "5": [
      { name: "Areeba", marks: 96 },
      { name: "Saad", marks: 94 },
      { name: "Nashit", marks: 92 },
      { name: "Huma", marks: 91 },
      { name: "Imran", marks: 90 },
      { name: "Ayesha", marks: 89 },
    ],
    "6": [
      { name: "Shahzaib", marks: 98 },
      { name: "Hira", marks: 95 },
      { name: "Taimoor", marks: 93 },
      { name: "Sara", marks: 91 },
      { name: "Hamid", marks: 90 },
      { name: "Zoya", marks: 88 },
    ],
    "7": [
      { name: "Faizan", marks: 97 },
      { name: "Haniya", marks: 94 },
      { name: "Ali", marks: 92 },
      { name: "Maham", marks: 91 },
      { name: "Umer", marks: 90 },
      { name: "Ayesha", marks: 88 },
    ],
    "8": [
      { name: "Owais", marks: 96 },
      { name: "Sana", marks: 95 },
      { name: "Arslan", marks: 92 },
      { name: "Maria", marks: 91 },
      { name: "Faraz", marks: 90 },
      { name: "Hina", marks: 88 },
    ],
    "9": [
      { name: "Shahid", marks: 97 },
      { name: "Nida", marks: 94 },
      { name: "Ali", marks: 92 },
      { name: "Sara", marks: 91 },
      { name: "Zain", marks: 90 },
      { name: "Huma", marks: 88 },
    ],
    "10": [
      { name: "Bilal", marks: 98 },
      { name: "Hira", marks: 95 },
      { name: "Tariq", marks: 93 },
      { name: "Laraib", marks: 91 },
      { name: "Adil", marks: 90 },
      { name: "Maryam", marks: 88 },
    ],
    "11": [
      { name: "Saad", marks: 97 },
      { name: "Areeba", marks: 94 },
      { name: "Hamza", marks: 92 },
      { name: "Hina", marks: 91 },
      { name: "Rehan", marks: 90 },
      { name: "Zoya", marks: 88 },
    ],
    "12": [
      { name: "Omar", marks: 98 },
      { name: "Sania", marks: 95 },
      { name: "Usman", marks: 93 },
      { name: "Sara", marks: 91 },
      { name: "Ali", marks: 90 },
      { name: "Mary", marks: 88 },
    ],
  };
export default function Toper() {
  const [selectedClass, setSelectedClass] = useState("1");
  const [topStudents, setTopStudents] = useState([]);

 

  useEffect(() => {
    const students = allStudents[selectedClass] || [];
    setTopStudents(students.slice(0, 6));
  }, [selectedClass]);

  const classes = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

  return (
    <div className="container py-4">
      <h2 className="mb-4">Class Toppers</h2>

      {/* Class Dropdown */}
      <div className="mb-3">
        <select
          className="form-select w-25"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          {classes.map((cls) => (
            <option key={cls} value={cls}>
              Class {cls}
            </option>
          ))}
        </select>
      </div>

      {/* Topper Cards */}
      <div className="row g-3">
        {topStudents.map((student, index) => (
          <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-2">
            <div className="card shadow-sm h-100 text-center p-2">
              <div className="card-body d-flex flex-column align-items-center justify-content-center">
                
                {/* Bootstrap Person Icon */}
                <i className="bi bi-person-circle display-4 text-primary mb-2"></i>
                
                <h5 className="card-title">{student.name}</h5>
                <p className="card-text">Marks: {student.marks}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}