import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "https://silas-7.onrender.com";

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
      const response = await fetch(`${API_URL}/students`);

      if (response.ok) {
        const data = await response.json();
        
        // Match MongoDB IDs safely from the backend list payload
        const formattedStudents = data.map((student) => ({
          ...student,
          id: student.id || (student._id && typeof student._id === "object" ? student._id.$oid || String(student._id) : String(student._id))
        }));

        setStudents(formattedStudents);
      }
    } catch (error) {
      console.log("Error fetching students:", error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // MATCHES BACKEND SCHEMAS EXACTLY (with float fallback handling)
    const newStudent = {
      student_name: studentName,
      student_email: studentEmail,
      student_phone_no: studentPhoneNo,
      student_level: parseInt(studentLevel) || 0,
      student_gpa: parseFloat(studentGPA) || 0.0,  
      student_cgpa: parseFloat(studentCGPA) || 0.0,
    };

    try {
      const response = await fetch(`${API_URL}/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudent),
      });

      if (response.ok) {
        setMessage("✅ Student added successfully!");
        clearForm();
        
        // Pull down the clean list from database right away
        await fetchStudents(); 

        setTimeout(() => {
          setMessage("");
        }, 3000);
      } else {
        const errData = await response.json();
        console.log("Backend validation error details:", errData);
      }
    } catch (error) {
      console.log("Network error sending data to backend:", error);
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

  const filteredStudents = Array.isArray(students) 
    ? students.filter((student) => {
        const name = student.student_name || student.name || "";
        const email = student.student_email || student.email || "";
        return (
          name.toLowerCase().includes(search.toLowerCase()) ||
          email.toLowerCase().includes(search.toLowerCase())
        );
      })
    : [];

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
                  required
                />
              </div>

              <div className="input-group">
                <label>Level</label>
                <input
                  type="number"
                  placeholder="400"
                  value={studentLevel}
                  onChange={(e) => setStudentLevel(e.target.value)}
                  required
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
                  required
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
                  required
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
                    <tr key={student.id || student._id}>
                      <td>{student.student_name || student.name || "N/A"}</td>
                      <td>{student.student_email || student.email || "N/A"}</td>
                      <td>{student.student_phone_no || student.phone_no || "N/A"}</td>
                      <td>{student.student_level || student.level || "N/A"}</td>
                      <td>{student.student_gpa !== undefined ? student.student_gpa : (student.gpa ?? "0.00")}</td>
                      <td>{student.student_cgpa !== undefined ? student.student_cgpa : (student.cgpa ?? "0.00")}</td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => deleteStudent(student.id || student._id)}
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