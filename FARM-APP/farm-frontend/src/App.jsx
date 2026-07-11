import { useEffect, useMemo, useState } from "react";
import "./App.css";

const API_URL = "https://silas-8.onrender.com";

function App() {
  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(""); // "admin" or "student"
  const [currentUser, setCurrentUser] = useState({});
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [loginRole, setLoginRole] = useState("admin"); // Toggle between admin/student
  
  // View state
  const [activeView, setActiveView] = useState("home");

  // Student addition/registration state
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPhoneNo, setStudentPhoneNo] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [studentLevel, setStudentLevel] = useState("");
  const [studentGPA, setStudentGPA] = useState("");
  const [studentCGPA, setStudentCGPA] = useState("");
  const [duplicateError, setDuplicateError] = useState("");
  const [blinkingField, setBlinkingField] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);

  // Student list and search state
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [message, setMessage] = useState("");
  
  // Student preview modal state
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    if (isLoggedIn && userRole === "admin") {
      fetchAllStudents();
    }
  }, [isLoggedIn, userRole]);

  async function fetchAllStudents() {
    try {
      const response = await fetch(`${API_URL}/students`);
      if (response.ok) {
        const data = await response.json();
        const formattedStudents = data.map((student) => ({
          ...student,
          id: student.id || (student._id && typeof student._id === "object" ? student._id.$oid || String(student._id) : String(student._id)),
        }));
        setStudents(formattedStudents);
      }
    } catch (error) {
      console.log("Error fetching students:", error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setDuplicateError("");
    setBlinkingField("");

    if (!studentPassword.trim()) {
      setDuplicateError("Please create a password for the student");
      return;
    }

    if (!passwordValid) {
      setDuplicateError("Password is too weak. Must contain letters and numbers");
      return;
    }

    const emailExists = students.some(s => s.student_email === studentEmail);
    if (emailExists) {
      setBlinkingField("email");
      setDuplicateError("Email already exists!");
      setTimeout(() => setBlinkingField(""), 1500);
      return;
    }

    const phoneExists = students.some(s => s.student_phone_no === studentPhoneNo);
    if (phoneExists) {
      setBlinkingField("phone");
      setDuplicateError("Phone number already exists!");
      setTimeout(() => setBlinkingField(""), 1500);
      return;
    }

    const newStudent = {
      student_name: studentName,
      student_email: studentEmail,
      student_phone_no: studentPhoneNo,
      student_password: studentPassword,
      student_level: parseInt(studentLevel) || 0,
      student_gpa: parseFloat(studentGPA) || 0.0,
      student_cgpa: parseFloat(studentCGPA) || 0.0,
      admin_id: currentUser.id || null,
    };

    try {
      const response = await fetch(`${API_URL}/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudent),
      });

      if (response.ok) {
        setMessage("Student account processed successfully.");
        clearForm();
        if (userRole === "admin") await fetchAllStudents();
        setTimeout(() => setMessage(""), 2500);
      } else {
        const errData = await response.json();
        setDuplicateError(errData.detail || "Error adding student");
      }
    } catch (error) {
      console.log("Network error sending data:", error);
      setDuplicateError("Network error. Please try again.");
    }
  }

  function checkPasswordStrength(password) {
    if (!password) {
      setPasswordStrength("");
      setPasswordValid(false);
      return;
    }
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    if (hasLetters && hasNumbers && password.length >= 6) {
      setPasswordStrength("strong");
      setPasswordValid(true);
    } else {
      setPasswordStrength("weak");
      setPasswordValid(false);
    }
  }

  function handlePasswordChange(value) {
    setStudentPassword(value);
    checkPasswordStrength(value);
  }

  function clearForm() {
    setStudentName("");
    setStudentEmail("");
    setStudentPhoneNo("");
    setStudentPassword("");
    setStudentLevel("");
    setStudentGPA("");
    setStudentCGPA("");
    setDuplicateError("");
    setPasswordStrength("");
    setPasswordValid(false);
  }

  async function deleteStudent(id) {
    if (!window.confirm("Delete this student?")) return;
    try {
      const response = await fetch(`${API_URL}/students/${id}`, { method: "DELETE" });
      if (response.ok) {
        setStudents((prev) => prev.filter((student) => student.id !== id));
      }
    } catch (error) {
      console.log("Error deleting student:", error);
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    setAuthError("");

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setAuthError("Please fill in email and password.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
          role: loginRole,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(true);
        setUserRole(data.role);
        setCurrentUser(data);
        setActiveView("home");
        setLoginEmail("");
        setLoginPassword("");
      } else {
        const errData = await response.json();
        setAuthError(errData.detail || "Login failed");
      }
    } catch (error) {
      setAuthError("Network error. Please try again.");
    }
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setUserRole("");
    setCurrentUser({});
    setActiveView("home");
  }

  const filteredStudents = useMemo(() => {
    const list = Array.isArray(students) ? students : [];
    return list
      .filter((student) => {
        const name = student.student_name || student.name || "";
        const email = student.student_email || student.email || "";
        const query = search.toLowerCase();
        return name.toLowerCase().includes(query) || email.toLowerCase().includes(query);
      })
      .sort((a, b) => String(b.id).localeCompare(String(a.id)));
  }, [search, students]);

  if (!isLoggedIn) {
    return (
      <div className="auth-shell">
        <div className="auth-card" style={{ maxWidth: '480px', boxSizing: 'border-box', width: '100%' }}>
          <div className="auth-badge">Farm Portal</div>
          <h1>Welcome back</h1>
          <p>Sign in to your account</p>
          
          <div className="role-selector">
            <button className={`role-btn ${loginRole === "admin" ? "active" : ""}`} onClick={() => setLoginRole("admin")}>
              Admin Login
            </button>
            <button className={`role-btn ${loginRole === "student" ? "active" : ""}`} onClick={() => setLoginRole("student")}>
              Student Login
            </button>
          </div>

          <form onSubmit={handleLogin} className="student-form">
            <div className="input-group">
              <label>{loginRole === "admin" ? "Admin Email" : "Student Email"}</label>
              <input 
                type="email" 
                placeholder={loginRole === "admin" ? "sonjaxsilas@proton.me" : "student@email.com"} 
                value={loginEmail} 
                onChange={(e) => setLoginEmail(e.target.value)} 
              />
            </div>
            <div className="input-group">
              <label>{loginRole === "admin" ? "Admin Password" : "Student Password"}</label>
              <input 
                type="password" 
                placeholder="Enter password" 
                value={loginPassword} 
                onChange={(e) => setLoginPassword(e.target.value)} 
              />
            </div>
            {loginRole === "admin" && <small className="help-text">Demo: sonjaxsilas@proton.me / 1q2w3e4r</small>}
            {authError ? <div className="error-message" style={{ color: 'red', marginTop: '8px' }}>{authError}</div> : null}
            <button className="submit-btn" type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }

  const navItems = userRole === "admin" ? [
    { id: "home", label: "Home" },
    { id: "students", label: "Student Details" },
    { id: "search", label: "Search & Filter" },
    { id: "profile", label: "My Students" },
    { id: "settings", label: "Settings" },
  ] : [
    { id: "home", label: "Home" },
    { id: "profile", label: "My Profile" },
    { id: "settings", label: "Settings" },
  ];

  function renderContent() {
    if (userRole === "student") {
      if (activeView === "profile") {
        return (
          <div className="panel profile-panel">
            <h2>My Profile</h2>
            <div className="profile-card student-profile">
              <div className="avatar">{(currentUser.student_name || currentUser.name)?.charAt(0).toUpperCase()}</div>
              <div className="profile-info">
                <h3>{currentUser.student_name || currentUser.name}</h3>
                <p>{currentUser.student_email || currentUser.email}</p>
                <div className="profile-details">
                  <div className="detail-row">
                    <span className="label">Level:</span>
                    <span className="value">{currentUser.student_level}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">GPA:</span>
                    <span className="value">{(currentUser.student_gpa)?.toFixed(2)}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">CGPA:</span>
                    <span className="value">{(currentUser.student_cgpa)?.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      if (activeView === "settings") {
        return (
          <div className="panel">
            <h2>Settings</h2>
            <p className="muted">Student account settings and preferences</p>
          </div>
        );
      }

      return (
        <div className="content-grid">
          <div className="panel hero-card">
            <div>
              <p className="eyebrow">Welcome back</p>
              <h2>Hello, {currentUser.student_name || currentUser.name || "Student"}</h2>
              <p className="muted">View your academic performance and dashboard.</p>
            </div>
            <div className="hero-pill">Student Account</div>
          </div>
          <div className="panel stat-card">
            <p className="eyebrow">Current Level</p>
            <h3>Level {currentUser.student_level}</h3>
          </div>
          <div className="panel stat-card">
            <p className="eyebrow">GPA</p>
            <h3>{(currentUser.student_gpa)?.toFixed(2)}</h3>
          </div>
          <div className="panel stat-card">
            <p className="eyebrow">CGPA</p>
            <h3>{(currentUser.student_cgpa)?.toFixed(2)}</h3>
          </div>
        </div>
      );
    }

    // ADMIN VIEW
    if (activeView === "students") {
      return (
        <div className="content-grid two-col">
          <div className="panel">
            <h2>Add Student</h2>
            <form onSubmit={handleSubmit} className="student-form">
              <div className="input-group">
                <label>Student Name</label>
                <input type="text" placeholder="Enter student name" value={studentName} onChange={(e) => setStudentName(e.target.value)} required />
              </div>
              <div className={`input-group ${blinkingField === "email" ? "blink" : ""}`}>
                <label>Email</label>
                <input type="email" placeholder="student@email.com" value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} required />
              </div>
              <div className={`input-group ${blinkingField === "phone" ? "blink" : ""}`}>
                <label>Phone Number</label>
                <input type="text" placeholder="08012345678" value={studentPhoneNo} onChange={(e) => setStudentPhoneNo(e.target.value)} required />
              </div>

              {/* CLEAN FIXED METRIC ROW FOR CARD ALIGNMENT */}
              <div style={{ display: 'flex', gap: '10px', width: '100%', boxSizing: 'border-box' }}>
                <div className="input-group" style={{ flex: 1, minWidth: 0 }}>
                  <label>Level</label>
                  <input style={{ width: '100%', boxSizing: 'border-box' }} type="number" placeholder="400" value={studentLevel} onChange={(e) => setStudentLevel(e.target.value)} required />
                </div>
                <div className="input-group" style={{ flex: 1, minWidth: 0 }}>
                  <label>GPA</label>
                  <input style={{ width: '100%', boxSizing: 'border-box' }} type="number" step="0.01" placeholder="4.20" value={studentGPA} onChange={(e) => setStudentGPA(e.target.value)} required />
                </div>
                <div className="input-group" style={{ flex: 1, minWidth: 0 }}>
                  <label>CGPA</label>
                  <input style={{ width: '100%', boxSizing: 'border-box' }} type="number" step="0.01" placeholder="4.60" value={studentCGPA} onChange={(e) => setStudentCGPA(e.target.value)} required />
                </div>
              </div>

              {studentName && studentEmail && studentPhoneNo && studentLevel && studentGPA && studentCGPA && (
                <div className="password-section">
                  <h3>Create Password for Student</h3>
                  <div className="input-group">
                    <input type="password" placeholder="Create strong password" value={studentPassword} onChange={(e) => handlePasswordChange(e.target.value)} required />
                    {studentPassword && <small style={{ color: passwordValid ? 'green' : 'orange' }}>{passwordStrength === 'strong' ? '✓ Strong' : '✗ Weak (need letters + numbers, min 6 characters)'}</small>}
                  </div>
                </div>
              )}

              <button className="submit-btn" type="submit" disabled={!passwordValid && studentPassword}>Add Student</button>
            </form>
            {message ? <div className="success-message">{message}</div> : null}
            {duplicateError ? <div className="error-message">{duplicateError}</div> : null}
          </div>

          <div className="panel">
            <div className="panel-top">
              <h2>Student Records</h2>
              <span className="pill">{students.length} enrolled</span>
            </div>
            <div className="student-list">
              {filteredStudents.length === 0 ? (
                <div className="empty-state">No students found yet.</div>
              ) : (
                filteredStudents.map((student) => (
                  <div className="student-card clickable" key={student.id} onClick={() => setSelectedStudent(student)}>
                    <div>
                      <h3>{student.student_name || "Unknown"}</h3>
                      <p>{student.student_email || "No email"}</p>
                    </div>
                    <div className="card-meta">
                      <span className="level-badge">Level {student.student_level || "N/A"}</span>
                      <button className="delete-btn" onClick={(e) => { e.stopPropagation(); deleteStudent(student.id); }}>✕</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="panel">
        <h2>System Dashboard</h2>
        <p>Manage system roles and data tables directly.</p>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h2>Farm Portal</h2>
        {navItems.map((item) => (
          <button key={item.id} className={`nav-btn ${activeView === item.id ? "active" : ""}`} onClick={() => setActiveView(item.id)}>
            {item.label}
          </button>
        ))}
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </aside>
      <main className="dashboard-main">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;