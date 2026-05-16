import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const PrintTeachers = ({ teachers }) => {

  const handlePrint = () => {
    const doc = new jsPDF();

    doc.text("Teachers List", 14, 10);

    const tableColumn = [
      "Name",
      "Subject",
      "Email",
      "Phone",
      "Staff ID",
      "Designation"
    ];

    const tableRows = [];

    teachers.forEach((t) => {
      tableRows.push([
        t.name,
        t.subject,
        t.email,
        t.phone,
        t.staffId,
        t.designation
      ]);
    });

    // ✅ FIXED LINE
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("teachers_list.pdf");
  };

  return (
    <button className="btn btn-success ms-2" onClick={handlePrint}>
      Print
    </button>
  );
};

export default PrintTeachers;