import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:8000";

function App() {
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPhoneNo, setStudentPhoneNo] = useState("");
  const [studentLevel, setStudentLevel] = useState("");
  const [studentGPA, setStudentGPA] = useState("");
  const [studentCGPA, setStudentCGPA] = useState("");

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {
    try {
      const response = await fetch(`${API_URL}/students/`);

      if (response.ok) {
        const data = await response.json();
        
        // FIX: Ensure MongoDB's _id object wrapper is cleanly mapped to a string ID
        const formattedStudents = data.map((student) => ({
          ...student,
          id: student._id && typeof student._id === "object" ? student._id.$oid || String(student._id) : student._id || student.id
        }));

        setStudents(formattedStudents);
      }
    } catch (error) {
      console.log("Error fetching students:", error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Cleaned payload structure matching backend schema
    const newStudent = {
      student_name: studentName,
      student_email: studentEmail,
      student_phone_no: studentPhoneNo,
      student_level: Number(studentLevel),
      gpa: Number(studentGPA),
      cgpa: Number(studentCGPA),
    };

    try {
      const response = await fetch(`${API_URL}/students/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudent),
      });

      if (response.ok) {
        // Force React to pull the official clean list straight from MongoDB
        await fetchStudents(); 

        setMessage("✅ Student added successfully!");

        setTimeout(() => {
          setMessage("");
        }, 3000);

        clearForm();
      }
    } catch (error) {
      console.log("Error adding student:", error);
    }
  }

  function clearForm() {
    setStudentName("");
    setStudentEmail("");
    setStudentPhoneNo("");
    setStudentLevel("");
    setStudentGPA("");
    setStudentCGPA("");
  }

  async function deleteStudent(id) {
    if (!window.confirm("Delete this student?")) return;

    try {
      const response = await fetch(`${API_URL}/students/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setStudents((prev) => prev.filter((student) => student.id !== id));
      }
    } catch (error) {
      console.log("Error deleting student:", error);
    }
  }

  const filteredStudents = students.filter((student) => {
    const name = student.student_name || student.full_name || "";
    const email = student.student_email || student.email || "";

    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      email.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="app-container">
      {/* ================= HEADER ================= */}
      <header className="app-header">
        <div>
          <h1>🌿 Student Farm App</h1>
          <p>React + FastAPI + MongoDB Dashboard</p>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <div className="main-content">
        {/* LEFT SIDE */}
        <div className="left-section">
          {/* FORM */}
          <div className="panel form-panel">
            <h2>Add Student</h2>
            <form onSubmit={handleSubmit} className="student-form">
              <div className="input-group">
                <label>Student Name</label>
                <input
                  type="text"
                  placeholder="Enter student name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="student@email.com"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  placeholder="08012345678"
                  value={studentPhoneNo}
                  onChange={(e) => setStudentPhoneNo(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>Level</label>
                <input
                  type="number"
                  placeholder="400"
                  value={studentLevel}
                  onChange={(e) => setStudentLevel(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>GPA</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="4.20"
                  value={studentGPA}
                  onChange={(e) => setStudentGPA(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>CGPA</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="4.60"
                  value={studentCGPA}
                  onChange={(e) => setStudentCGPA(e.target.value)}
                />
              </div>

              <button className="submit-btn" type="submit">
                Add Student
              </button>
            </form>

            {message && <div className="success-message">{message}</div>}
          </div>

          {/* LIVE PREVIEW */}
          <div className="panel preview-panel">
            <h2>Live Preview</h2>
            <div className="preview-content">
              <p><strong>Name:</strong> {studentName || "________"}</p>
              <p><strong>Email:</strong> {studentEmail || "________"}</p>
              <p><strong>Phone:</strong> {studentPhoneNo || "________"}</p>
              <p><strong>Level:</strong> {studentLevel || "________"}</p>
              <p><strong>GPA:</strong> {studentGPA || "________"}</p>
              <p><strong>CGPA:</strong> {studentCGPA || "________"}</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="panel table-panel">
          <div className="table-header">
            <h2>Student Database Records</h2>
            <input
              type="text"
              placeholder="Search student..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Level</th>
                  <th>GPA</th>
                  <th>CGPA</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="no-data">
                      No Student Records Found
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td>{student.student_name || student.full_name}</td>
                      <td>{student.student_email || student.email}</td>
                      <td>{student.student_phone_no || student.phone}</td>
                      <td>{student.student_level}</td>
                      <td>{student.gpa}</td>
                      <td>{student.cgpa}</td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => deleteStudent(student.id)}
                        >
                          🗑
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;