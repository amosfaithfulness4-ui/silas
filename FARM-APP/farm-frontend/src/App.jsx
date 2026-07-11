import { useEffect, useMemo, useState } from "react";
import "./App.css";

// Updated to point directly to your live backend service on Render
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

  // Student addition state
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPhoneNo, setStudentPhoneNo] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [studentLevel, setStudentLevel] = useState("");
  const [studentGPA, setStudentGPA] = useState("");
  const [studentCGPA, setStudentCGPA] = useState("");
  const [duplicateError, setDuplicateError] = useState("");
  const [blinkingField, setBlinkingField] = useState("");
  const [showPasswordField, setShowPasswordField] = useState(false);
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
    } else if (isLoggedIn && userRole === "student") {
      // Students don't need to fetch - they see their own profile
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

    // Check if password is provided and valid
    if (!studentPassword.trim()) {
      setDuplicateError("Please create a password for the student");
      return;
    }

    if (!passwordValid) {
      setDuplicateError("Password is too weak. Must contain letters and numbers");
      return;
    }

    // Check for duplicate email in current list
    const emailExists = students.some(s => s.student_email === studentEmail);
    if (emailExists) {
      setBlinkingField("email");
      setDuplicateError("Email already exists!");
      setTimeout(() => setBlinkingField(""), 1500);
      return;
    }

    // Check for duplicate phone in current list
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
      admin_id: currentUser.id, // Link to admin who created it
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
        setMessage("Student added successfully.");
        clearForm();
        await fetchAllStudents();
        setTimeout(() => setMessage(""), 2500);
      } else {
        const errData = await response.json();
        if (errData.detail && errData.detail.includes("already exists")) {
          const field = errData.detail.includes("Email") ? "email" : "phone";
          setBlinkingField(field);
          setDuplicateError(errData.detail);
          setTimeout(() => setBlinkingField(""), 1500);
        } else {
          setDuplicateError(errData.detail || "Error adding student");
        }
      }
    } catch (error) {
      console.log("Network error sending data to backend:", error);
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
    const length = password.length;

    if (hasLetters && hasNumbers && length >= 6) {
      setPasswordStrength("strong");
      setPasswordValid(true);
    } else if ((hasLetters || hasNumbers) && length >= 5) {
      setPasswordStrength("medium");
      setPasswordValid(false);
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

  // FIXED: Handles empty, bad gateway, and non-JSON string responses cleanly
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
          role: loginRole,
        }),
      });

      // Step 1: Read raw server response as plain text
      const responseText = await response.text();
      
      // Step 2: Try parsing it safely
      let data;
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch (jsonError) {
        console.log("Raw Server Response error:", responseText);
        setAuthError(`Server error (${response.status}): Web service is waking up or temporarily unavailable.`);
        return;
      }

      if (response.ok) {
        setIsLoggedIn(true);
        setUserRole(data.role);
        setCurrentUser(data);
        setActiveView("home");
        setLoginEmail("");
        setLoginPassword("");
      } else {
        setAuthError(data.detail || "Login failed");
      }
    } catch (error) {
      console.log("Login network error:", error);
      setAuthError("Network error. Please make sure the server is online.");
    }
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setUserRole("");
    setCurrentUser({});
    setActiveView("home");
    setLoginEmail("");
    setLoginPassword("");
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
      .sort((a, b) => {
        const createdA = a.created_at || a.createdAt || a.id || "";
        const createdB = b.created_at || b.createdAt || b.id || "";
        if (sortBy === "oldest") {
          return String(createdA).localeCompare(String(createdB));
        }
        return String(createdB).localeCompare(String(createdA));
      });
  }, [search, sortBy, students]);

  if (!isLoggedIn) {
    return (
      <div className="auth-shell">
        <div className="auth-card">
          <div className="auth-badge">Farm Portal</div>
          <h1>Welcome back</h1>
          <p>Sign in to your account</p>
          
          {/* Role Selection */}
          <div className="role-selector">
            <button 
              className={`role-btn ${loginRole === "admin" ? "active" : ""}`}
              onClick={() => setLoginRole("admin")}
            >
              Admin Login
            </button>
            <button 
              className={`role-btn ${loginRole === "student" ? "active" : ""}`}
              onClick={() => setLoginRole("student")}
            >
              Student Login
            </button>
          </div>

          <form onSubmit={handleLogin} className="student-form">
            {loginRole === "admin" ? (
              <>
                <div className="input-group">
                  <label>Admin Email</label>
                  <input 
                    type="email" 
                    placeholder="sonjaxsilas@proton.me" 
                    value={loginEmail} 
                    onChange={(e) => setLoginEmail(e.target.value)} 
                  />
                </div>
                <div className="input-group">
                  <label>Admin Password</label>
                  <input 
                    type="password" 
                    placeholder="Enter password" 
                    value={loginPassword} 
                    onChange={(e) => setLoginPassword(e.target.value)} 
                  />
                </div>
                <small className="help-text">Demo: sonjaxsilas@proton.me / 1q2w3e4r</small>
              </>
            ) : (
              <>
                <div className="input-group">
                  <label>Student Email</label>
                  <input 
                    type="email" 
                    placeholder="student@email.com" 
                    value={loginEmail} 
                    onChange={(e) => setLoginEmail(e.target.value)} 
                  />
                </div>
                <div className="input-group">
                  <label>Student Password</label>
                  <input 
                    type="password" 
                    placeholder="Enter password" 
                    value={loginPassword} 
                    onChange={(e) => setLoginPassword(e.target.value)} 
                  />
                </div>
              </>
            )}
            {authError ? <div className="error-message">{authError}</div> : null}
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
      // STUDENT VIEW
      if (activeView === "profile") {
        return (
          <div className="panel profile-panel">
            <h2>My Profile</h2>
            <div className="profile-card student-profile">
              <div className="avatar">{currentUser.name?.charAt(0).toUpperCase()}</div>
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
                    <span className="value">{currentUser.student_gpa?.toFixed(2)}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">CGPA:</span>
                    <span className="value">{currentUser.student_cgpa?.toFixed(2)}</span>
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
            <ul className="feature-list">
              <li>View your academic progress</li>
              <li>Update profile information</li>
              <li>Manage notifications</li>
            </ul>
          </div>
        );
      }

      // Student home view
      return (
        <div className="content-grid">
          <div className="panel hero-card">
            <div>
              <p className="eyebrow">Welcome back</p>
              <h2>Hello, {currentUser.name || "Student"}</h2>
              <p className="muted">View your academic performance and dashboard.</p>
            </div>
            <div className="hero-pill">Student Account</div>
          </div>

          <div className="panel stat-card">
            <p className="eyebrow">Current Level</p>
            <h3>Level {currentUser.student_level}</h3>
            <p className="muted">Academic year progress</p>
          </div>

          <div className="panel stat-card">
            <p className="eyebrow">GPA</p>
            <h3>{currentUser.student_gpa?.toFixed(2)}</h3>
            <p className="muted">Current Grade Point Average</p>
          </div>

          <div className="panel stat-card">
            <p className="eyebrow">CGPA</p>
            <h3>{currentUser.student_cgpa?.toFixed(2)}</h3>
            <p className="muted">Cumulative GPA</p>
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
                <input 
                  type="text" 
                  placeholder="Enter student name" 
                  value={studentName} 
                  onChange={(e) => setStudentName(e.target.value)} 
                  required 
                />
              </div>
              <div className={`input-group ${blinkingField === "email" ? "blink" : ""}`}>
                <label>Email</label>
                <input 
                  type="email" 
                  placeholder="student@email.com" 
                  value={studentEmail} 
                  onChange={(e) => setStudentEmail(e.target.value)} 
                  required 
                />
              </div>
              <div className={`input-group ${blinkingField === "phone" ? "blink" : ""}`}>
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

              {/* Password Section - Shows when basic info is filled */}
              {studentName && studentEmail && studentPhoneNo && studentLevel && studentGPA && studentCGPA && (
                <div className="password-section">
                  <h3>Create Password for Student</h3>
                  <p className="section-hint">The student will use this password to log in</p>
                  
                  <div className="input-group">
                    <label>Student Password</label>
                    <input 
                      type="password" 
                      placeholder="Create a strong password" 
                      value={studentPassword} 
                      onChange={(e) => handlePasswordChange(e.target.value)} 
                      required 
                    />
                    
                    {/* Password Strength Indicator */}
                    {studentPassword && (
                      <div className="password-strength">
                        <div className="strength-bar">
                          <div className={`strength-fill strength-${passwordStrength}`}></div>
                        </div>
                        <div className={`strength-text strength-${passwordStrength}`}>
                          {passwordStrength === "strong" && "✓ Strong password - Ready!"}
                          {passwordStrength === "medium" && "⚠ Medium password - Add numbers and letters"}
                          {passwordStrength === "weak" && "✗ Weak password - Must include letters and numbers"}
                        </div>
                        <small className="password-requirements">
                          Password must contain:
                          <br />
                          • Letters (a-z, A-Z) and Numbers (0-9)
                          <br />
                          • At least 6 characters
                        </small>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <button className="submit-btn" type="submit" disabled={!passwordValid && studentPassword}>
                Add Student
              </button>
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
                  <div 
                    className="student-card clickable" 
                    key={student.id || student._id}
                    onClick={() => setSelectedStudent(student)}
                  >
                    <div>
                      <h3>{student.student_name || student.name || "Unknown"}</h3>
                      <p>{student.student_email || student.email || "No email"}</p>
                    </div>
                    <div className="card-meta">
                      <span className="level-badge">Level {student.student_level || student.level || "N/A"}</span>
                      <button 
                        className="delete-btn" 
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteStudent(student.id || student._id);
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      );
    }

    if (activeView === "search") {
      return (
        <div className="panel">
          <div className="panel-top">
            <h2>Search & Filter</h2>
            <div className="toolbar">
              <input 
                type="text" 
                placeholder="Search by name or email" 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
              />
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
            </div>
          </div>
          <div className="student-list">
            {filteredStudents.length === 0 ? (
              <div className="empty-state">No matching students.</div>
            ) : (
              filteredStudents.map((student) => (
                <div 
                  className="student-card clickable" 
                  key={student.id || student._id}
                  onClick={() => setSelectedStudent(student)}
                >
                  <div>
                    <h3>{student.student_name || student.name || "Unknown"}</h3>
                    <p>{student.student_email || student.email || "No email"}</p>
                  </div>
                  <div className="card-meta">
                    <span className="gpa-badge">GPA {student.student_gpa ?? student.gpa ?? "0.00"}</span>
                    <span className="cgpa-badge">CGPA {student.student_cgpa ?? student.cgpa ?? "0.00"}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      );
    }

    if (activeView === "profile") {
      return (
        <div className="panel">
          <h2>My Students</h2>
          <p className="muted">Students I have added to the system</p>
          <div className="student-list">
            {students.length === 0 ? (
              <div className="empty-state">You haven't added any students yet.</div>
            ) : (
              students.map((student) => (
                <div 
                  className="student-card clickable" 
                  key={student.id || student._id}
                  onClick={() => setSelectedStudent(student)}
                >
                  <div>
                    <h3>{student.student_name || student.name || "Unknown"}</h3>
                    <p>{student.student_email || student.email || "No email"}</p>
                  </div>
                  <div className="card-meta">
                    <span className="level-badge">Level {student.student_level || student.level || "N/A"}</span>
                    <span className="gpa-badge">GPA {student.student_gpa ?? "0.00"}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      );
    }

    if (activeView === "settings") {
      return (
        <div className="content-grid two-col">
          <div className="panel">
            <h2>System Settings</h2>
            <p className="muted">Manage student records, notifications, and dashboard preferences.</p>
            <ul className="feature-list">
              <li>Daily performance alerts</li>
              <li>Secure access control</li>
              <li>Quick export of student data</li>
            </ul>
          </div>
          <div className="panel">
            <h2>Profile Overview</h2>
            <p className="muted">Your admin account details.</p>
            <div className="profile-box">
              <strong>{currentUser.name}</strong>
              <span>{currentUser.email}</span>
            </div>
          </div>
        </div>
      );
    }

    // Admin home view
    return (
      <div className="content-grid">
        <div className="panel hero-card">
          <div>
            <p className="eyebrow">Welcome back</p>
            <h2>Hello, {currentUser.name || "Admin"}</h2>
            <p className="muted">Your academic dashboard is ready. Track student performance and keep records organized.</p>
          </div>
          <div className="hero-pill">Admin Portal</div>
        </div>

        <div className="panel stat-card">
          <p className="eyebrow">Total Students</p>
          <h3>{students.length}</h3>
          <p className="muted">Students managed in the system.</p>
        </div>

        <div className="panel stat-card">
          <p className="eyebrow">Quick Access</p>
          <h3>Add Students</h3>
          <p className="muted">Go to Student Details to add new students.</p>
        </div>

        <div className="panel stat-card">
          <p className="eyebrow">Search & Filter</p>
          <h3>Advanced Tools</h3>
          <p className="muted">Use search to quickly find and review students.</p>
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
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">{userRole === "admin" ? "Student Management" : "Student Account"}</p>
            <h1>{userRole === "admin" ? "Professional dashboard" : "Your Profile"}</h1>
          </div>
          <div className="header-pill">Signed in as {currentUser.name || "User"}</div>
        </header>
        {renderContent()}
      </main>

      {/* Student Profile Preview Modal */}
      {selectedStudent && (
        <div className="modal-overlay" onClick={() => setSelectedStudent(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedStudent(null)}>×</button>
            <div className="modal-header">
              <div className="avatar-large">{selectedStudent.student_name?.charAt(0).toUpperCase()}</div>
              <div>
                <h2>{selectedStudent.student_name}</h2>
                <p className="muted">{selectedStudent.student_email}</p>
              </div>
            </div>
            <div className="modal-body">
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Phone Number</span>
                  <span className="value">{selectedStudent.student_phone_no}</span>
                </div>
                <div className="info-item">
                  <span className="label">Level</span>
                  <span className="value">{selectedStudent.student_level}</span>
                </div>
                <div className="info-item">
                  <span className="label">GPA</span>
                  <span className="value">{selectedStudent.student_gpa?.toFixed(2)}</span>
                </div>
                <div className="info-item">
                  <span className="label">CGPA</span>
                  <span className="value">{selectedStudent.student_cgpa?.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setSelectedStudent(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;