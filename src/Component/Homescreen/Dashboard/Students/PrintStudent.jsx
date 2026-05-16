import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const PrintStudent = ({ students }) => {

  const handlePrint = () => {
    const doc = new jsPDF();

    doc.text("Students List", 14, 10);

    const tableColumn = [
      "Name",
      "DOB",
      "Gender",
      "Class",
      "Father",
      "Phone",
      "CNIC"
    ];

    const tableRows = [];

    students.forEach((s) => {
      tableRows.push([
        s.name,
        s.dob,
        s.gender,
        s.studentClass,
        s.fatherName,
        s.phone,
        s.cnic
      ]);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 8 }
    });

    doc.save("students_list.pdf");
  };

  return (
    <button className="btn btn-success" onClick={handlePrint}>
      Print Students
    </button>
  );
};

export default PrintStudent;