import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Card({ label, value, color, icon, viewLink, addLink }) {
  const [hoverView, setHoverView] = useState(false);
  const [hoverAdd, setHoverAdd] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body d-flex flex-column gap-3">
        <div className="d-flex align-items-center gap-3">
          <div
            className="d-flex align-items-center justify-content-center rounded"
            style={{ background: color, width: "50px", height: "50px" }}
          >
            {icon}
          </div>
          <div>
            <p className="mb-1 text-muted" style={{ fontSize: "0.85rem" }}>
              {label}
            </p>
            <h5 className="m-0">{value}</h5>
          </div>
        </div>

        <hr />

        <div className="d-flex gap-2">
          <button
            className={`btn btn-outline-secondary flex-fill ${
              hoverView ? "active" : ""
            }`}
            onMouseEnter={() => setHoverView(true)}
            onMouseLeave={() => setHoverView(false)}
            onClick={() => navigate(viewLink)}
          >
            View
          </button>

          <button
            className={`btn btn-outline-dark flex-fill ${
              hoverAdd ? "active" : ""
            }`}
            onMouseEnter={() => setHoverAdd(true)}
            onMouseLeave={() => setHoverAdd(false)}
            onClick={() => navigate(addLink)}
          >
            + Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Dashboardmain() {
  const [counts, setCounts] = useState({
    students: 0,
    teachers: 0,
    courses: 0,
    enrollments: 0,
    results: 0,
    fees: 0,
    expenses: 0,
  });

  const fetchCounts = async () => {
    try {
      const [
        students,
        teachers,
        courses,
        enrollments,
        results,
        fees
      ] = await Promise.all([
        fetch("https://school-backend-blond.vercel.app/api/students"),
        fetch("https://school-backend-blond.vercel.app/api/teachers"),
        fetch("https://school-backend-blond.vercel.app/api/courses"),
        fetch("https://school-backend-blond.vercel.app/api/enrollments"),
        fetch("https://school-backend-blond.vercel.app/api/results"),
        fetch("https://school-backend-blond.vercel.app/api/classfees"),
      ]);

      const studentsData = await students.json();
      const teachersData = await teachers.json();
      const coursesData = await courses.json();
      const enrollmentsData = await enrollments.json();
      const resultsData = await results.json();
      const feesData = await fees.json();

      setCounts({
        students: studentsData.length || 0,
        teachers: teachersData.length || 0,
        courses: coursesData.length || 0,
        enrollments: enrollmentsData.length || 0,
        results: resultsData.length || 0,
        fees: feesData.length || 0,
        expenses: 0,
      });
    } catch (err) {
      console.error("Error fetching dashboard counts:", err);
    }
  };

  useEffect(() => {
    fetchCounts();
    const interval = setInterval(fetchCounts, 3000);
    return () => clearInterval(interval);
  }, []);

  const cards = [
    {
      label: "Students",
      value: counts.students,
      color: "#E6F1FB",
      viewLink: "/students",
      addLink: "/students",
      icon: <span>👨‍🎓</span>,
    },
    {
      label: "Teachers",
      value: counts.teachers,
      color: "#EAF3DE",
      viewLink: "/teachers",
      addLink: "/teachers",
      icon: <span>👩‍🏫</span>,
    },
    {
      label: "Courses",
      value: counts.courses,
      color: "#EAF3DE",
      viewLink: "/Courses",
      addLink: "/Courses",
      icon: <span>📚</span>,
    },
    {
      label: "Enrollments",
      value: counts.enrollments,
      color: "#EAF3DE",
      viewLink: "/StudentEnrollment",
      addLink: "/StudentEnrollment",
      icon: <span>📝</span>,
    },
    {
      label: "Results",
      value: counts.results,
      color: "#EAF3DE",
      viewLink: "/resultslst",
      addLink: "/results",
      icon: <span>📊</span>,
    },
    {
      label: "Fees",
      value: counts.fees,
      color: "#FAEEDA",
      viewLink: "/fees",
      addLink: "/fees/add",
      icon: <span>💰</span>,
    },
   
  ];

  return (
    <div className="container py-4">
      <h2 className="mb-4">My App Dashboard</h2>
      <div className="row g-3">
        {cards.map((card) => (
          <div key={card.label} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <Card {...card} />
          </div>
        ))}
      </div>
    </div>
  );
}