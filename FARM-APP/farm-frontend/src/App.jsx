import { useMemo, useState } from "react";
import "./App.css";

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

  // Student creation form states
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

  // Local Self-Contained Database Store
  const [students, setStudents] = useState([
    {
      id: "student_1",
      student_name: "Faith Silas",
      student_email: "student@email.com",
      student_phone_no: "08012345678",
      student_password: "password123",
      student_level: 300,
      student_gpa: 4.50,
      student_cgpa: 4.65
    }
  ]);
  
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Administrative static credential mapping
  const ADMIN_CREDENTIALS = {
    email: "sonjaxsilas@proton.me",
    password: "1q2w3e4r",
    name: "Silas Admin",
    id: "admin_root"
  };

  // Form submission for adding a student locally
  function handleSubmit(e) {
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

    const emailExists = students.some(s => s.student_email.toLowerCase() === studentEmail.toLowerCase());
    if (emailExists) {
      setBlinkingField("email");
      setDuplicateError("Email already exists!");
      return;
    }

    const phoneExists = students.some(s => s.student_phone_no === studentPhoneNo);
    if (phoneExists) {
      setBlinkingField("phone");
      setDuplicateError("Phone number already exists!");
      return;
    }

    const newStudent = {
      id: `student_${Date.now()}`,
      student_name: studentName,
      student_email: studentEmail,
      student_phone_no: studentPhoneNo,
      student_password: studentPassword,
      student_level: parseInt(studentLevel) || 0,
      student_gpa: parseFloat(studentGPA) || 0.0,
      student_cgpa: parseFloat(studentCGPA) || 0.0,
    };

    setStudents((prev) => [newStudent, ...prev]);
    setMessage("Student profile added successfully!");
    clearForm();
    setTimeout(() => setMessage(""), 2500);
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

  function deleteStudent(id) {
    if (!window.confirm("Delete this student profile permanently?")) return;
    setStudents((prev) => prev.filter((student) => student.id !== id));
  }

  // Local authentication processing loop (Zero network latency)
  function handleLogin(e) {
    e.preventDefault();
    setAuthError("");

    const emailClean = loginEmail.trim().toLowerCase();

    if (loginRole === "admin") {
      if (emailClean === ADMIN_CREDENTIALS.email && loginPassword === ADMIN_CREDENTIALS.password) {
        setIsLoggedIn(true);
        setUserRole("admin");
        setCurrentUser({
          id: ADMIN_CREDENTIALS.id,
          name: ADMIN_CREDENTIALS.name,
          email: ADMIN_CREDENTIALS.email,
          role: "admin"
        });
        setActiveView("home");
        setLoginEmail("");
        setLoginPassword("");
      } else {
        setAuthError("Invalid admin email or password.");
      }
    } else {
      const matchedStudent = students.find(
        (s) => s.student_email.toLowerCase() === emailClean && s.student_password === loginPassword
      );

      if (matchedStudent) {
        setIsLoggedIn(true);
        setUserRole("student");
        setCurrentUser({
          id: matchedStudent.id,
          name: matchedStudent.student_name,
          email: matchedStudent.student_email,
          student_name: matchedStudent.student_name,
          student_email: matchedStudent.student_email,
          student_level: matchedStudent.student_level,
          student_gpa: matchedStudent.student_gpa,
          student_cgpa: matchedStudent.student_cgpa,
          student_phone_no: matchedStudent.student_phone_no,
          role: "student"
        });
        setActiveView("home");
        setLoginEmail("");
        setLoginPassword("");
      } else {
        setAuthError("Invalid student credentials.");
      }
    }
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setUserRole("");
    setCurrentUser({});
    setActiveView("home");
  }

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const name = student.student_name || "";
      const email = student.student_email || "";
      const query = search.toLowerCase();
      return name.toLowerCase().includes(query) || email.toLowerCase().includes(query);
    });
  }, [search, students]);

  if (!isLoggedIn) {
    return (
      <div className="auth-shell">
        <div className="auth-card" style={{ maxWidth: '420px', boxSizing: 'border-box', width: '100%' }}>
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
                required
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input 
                type="password" 
                placeholder="Enter password" 
                value={loginPassword} 
                onChange={(e) => setLoginPassword(e.target.value)} 
                required
              />
            </div>
            {loginRole === "admin" && <small className="help-text">Demo: sonjaxsilas@proton.me / 1q2w3e4r</small>}
            {authError ? <div className="error-message" style={{ color: '#d93025', fontSize: '13px', marginTop: '8px' }}>{authError}</div> : null}
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
              <div className="avatar">{(currentUser.name)?.charAt(0).toUpperCase()}</div>
              <div className="profile-info">
                <h3>{currentUser.name}</h3>
                <p>{currentUser.email}</p>
                <div className="profile-details">
                  <div className="detail-row">
                    <span className="label">Level:</span>
                    <span className="value">{currentUser.student_level}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">GPA:</span>
                    <span className="value">{Number(currentUser.student_gpa).toFixed(2)}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">CGPA:</span>
                    <span className="value">{Number(currentUser.student_cgpa).toFixed(2)}</span>
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
            <p className="muted">Student account configuration and portal interface preferences.</p>
          </div>
        );
      }

      return (
        <div className="content-grid">
          <div className="panel hero-card">
            <div>
              <p className="eyebrow">Welcome back</p>
              <h2>Hello, {currentUser.name || "Student"}</h2>
              <p className="muted">Track your live cumulative scores and academic index cards securely.</p>
            </div>
            <div className="hero-pill">Student Account</div>
          </div>
          <div className="panel stat-card">
            <p className="eyebrow">Current Level</p>
            <h3>Level {currentUser.student_level}</h3>
          </div>
          <div className="panel stat-card">
            <p className="eyebrow">GPA Metric</p>
            <h3>{Number(currentUser.student_gpa).toFixed(2)}</h3>
          </div>
          <div className="panel stat-card">
            <p className="eyebrow">CGPA Metric</p>
            <h3>{Number(currentUser.student_cgpa).toFixed(2)}</h3>
          </div>
        </div>
      );
    }

    // ADMINISTRATIVE ACCESS PORTAL INTERFACE VIEW
    if (activeView === "students") {
      return (
        <div className="content-grid two-col">
          <div className="panel">
            <h2>Add Student</h2>
            <form onSubmit={handleSubmit} className="student-form">
              <div className="input-group">
                <label>Student Name</label>
                <input type="text" placeholder="Enter full name" value={studentName} onChange={(e) => setStudentName(e.target.value)} required />
              </div>
              <div className={`input-group ${blinkingField === "email" ? "blink" : ""}`}>
                <label>Email Address</label>
                <input type="email" placeholder="student@email.com" value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} required />
              </div>
              <div className={`input-group ${blinkingField === "phone" ? "blink" : ""}`}>
                <label>Phone Number</label>
                <input type="text" placeholder="08012345678" value={studentPhoneNo} onChange={(e) => setStudentPhoneNo(e.target.value)} required />
              </div>

              {/* HIGH ACCURACY FLEX WRAP ROW FOR PREVENTING WINDOW OVERFLOW */}
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
                  <h3>Assign Secure Password</h3>
                  <div className="input-group">
                    <input type="password" placeholder="Assign entry password" value={studentPassword} onChange={(e) => handlePasswordChange(e.target.value)} required />
                    {studentPassword && <small style={{ color: passwordValid ? '#137333' : '#b06000', fontWeight: 'bold' }}>{passwordStrength === 'strong' ? '✓ Safe Passphrase' : '✗ Password weak (Include text + numbers)'}</small>}
                  </div>
                </div>
              )}

              <button className="submit-btn" type="submit" disabled={!passwordValid && studentPassword}>Add Record</button>
            </form>
            {message ? <div className="success-message" style={{ color: '#137333', background: '#e6f4ea', padding: '10px', borderRadius: '6px', marginTop: '10px' }}>{message}</div> : null}
            {duplicateError ? <div className="error-message" style={{ color: '#d93025', background: '#fce8e6', padding: '10px', borderRadius: '6px', marginTop: '10px' }}>{duplicateError}</div> : null}
          </div>

          <div className="panel">
            <div className="panel-top">
              <h2>Student Registry</h2>
              <span className="pill" style={{ background: '#e6f4ea', color: '#137333', padding: '4px 8px', borderRadius: '10px', fontSize: '12px' }}>{students.length} enrolled</span>
            </div>
            <div className="student-list">
              {filteredStudents.length === 0 ? (
                <div className="empty-state">No matching parameters found.</div>
              ) : (
                filteredStudents.map((student) => (
                  <div className="student-card clickable" key={student.id} onClick={() => setSelectedStudent(student)}>
                    <div>
                      <h3>{student.student_name}</h3>
                      <p>{student.student_email}</p>
                    </div>
                    <div className="card-meta">
                      <span className="level-badge" style={{ fontSize: '12px', background: '#f1f3f4', padding: '2px 6px', borderRadius: '4px' }}>Lvl {student.student_level}</span>
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
      <div className="content-grid">
        <div className="panel hero-card">
          <div>
            <p className="eyebrow">System Management</p>
            <h2>Hello, {currentUser.name || "Administrator"}</h2>
            <p className="muted">Database operations are active. View total student metrics below.</p>
          </div>
          <div className="hero-pill">Admin Management</div>
        </div>
        <div className="panel stat-card">
          <p className="eyebrow">Database Matrix</p>
          <h3>{students.length} Records</h3>
        </div>
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
        <button className="logout-btn" onClick={handleLogout} style={{ marginTop: 'auto', backgroundColor: '#fce8e6', color: '#a51d24' }}>Logout</button>
      </aside>
      <main className="dashboard-main" style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
        {renderContent()}
      </main>

      {/* MODAL DETAILED VIEW FOR COMPLETE ACCURACY */}
      {selectedStudent && (
        <div className="modal-overlay" onClick={() => setSelectedStudent(null)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', width: '100%', maxWidth: '400px' }}>
            <h2>{selectedStudent.student_name}</h2>
            <p className="muted">{selectedStudent.student_email}</p>
            <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '16px 0' }} />
            <p><strong>Phone:</strong> {selectedStudent.student_phone_no}</p>
            <p><strong>Level:</strong> {selectedStudent.student_level}</p>
            <p><strong>GPA:</strong> {Number(selectedStudent.student_gpa).toFixed(2)}</p>
            <p><strong>CGPA:</strong> {Number(selectedStudent.student_cgpa).toFixed(2)}</p>
            <button className="submit-btn" onClick={() => setSelectedStudent(null)} style={{ marginTop: '16px', width: '100%' }}>Close View</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;