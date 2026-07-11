import React, { useState } from 'react';
// 1. IMPORT YOUR EXISTING DASHBOARD HERE
// (Make sure the path pointing to your Dashboard file is correct, e.g., './Dashboard')
import Dashboard from './Dashboard'; 

const StudentAuthPortal = () => {
  // Tab states: 'register' for creating a student, 'login' for student login
  const [activeTab, setActiveTab] = useState('register');

  // NEW: State to track if the student successfully logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // State fields for Creating a New Student
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    level: '',
    gpa: '',
    cgpa: '',
    password: ''
  });

  // State fields for Student Login
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Handlers for input changes
  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (activeTab === 'register') {
      console.log("Submitting Register Data to Backend:", registerData);
      alert(`🎉 Profile Created Successfully for ${registerData.name}! Please log in.`);
      setActiveTab('login');
      
    } else {
      console.log("Submitting Login Data to Backend:", loginData);
      alert(`🔐 Login successful! Loading your dashboard...`);
      
      // 2. SWITCH TO DASHBOARD VIEW INSTEAD OF BLANK LINK
      setIsLoggedIn(true); 
    }
  };

  // 3. IF LOGGED IN, RENDER YOUR ORIGINAL DASHBOARD COMPONENT
  if (isLoggedIn) {
    return <Dashboard studentEmail={loginData.email} onLogout={() => setIsLoggedIn(false)} />;
  }

  // Otherwise, render the Auth Portal Form
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <span style={styles.badge}>Farm Portal</span>
        <h2 style={styles.title}>
          {activeTab === 'register' ? "Get Started" : "Welcome back"}
        </h2>
        <p style={styles.subtitle}>
          {activeTab === 'register' ? "Create a new student profile" : "Sign in to your student account"}
        </p>

        {/* Auth Tabs */}
        <div style={styles.tabContainer}>
          <button
            type="button"
            style={{ ...styles.tab, ...(activeTab === 'register' ? styles.activeTab : styles.inactiveTab) }}
            onClick={() => setActiveTab('register')}
          >
            Create Student
          </button>
          <button
            type="button"
            style={{ ...styles.tab, ...(activeTab === 'login' ? styles.activeTab : styles.inactiveTab) }}
            onClick={() => setActiveTab('login')}
          >
            Student Login
          </button>
        </div>

        {/* Dynamic Form Content */}
        <form onSubmit={handleSubmit} style={styles.form}>
          {activeTab === 'register' ? (
            /* CREATE STUDENT FIELDS */
            <>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Student Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="student@example.com"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  value={registerData.phone}
                  onChange={handleRegisterChange}
                  style={styles.input}
                  required
                />
              </div>

              {/* Flex metrics row for Level, GPA, CGPA */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ ...styles.inputGroup, flex: 1, minWidth: 0 }}>
                  <label style={styles.label}>Level</label>
                  <input
                    type="text"
                    name="level"
                    placeholder="e.g. 400"
                    value={registerData.level}
                    onChange={handleRegisterChange}
                    style={styles.input}
                    required
                  />
                </div>
                <div style={{ ...styles.inputGroup, flex: 1, minWidth: 0 }}>
                  <label style={styles.label}>GPA</label>
                  <input
                    type="number"
                    step="0.01"
                    name="gpa"
                    placeholder="0.00"
                    value={registerData.gpa}
                    onChange={handleRegisterChange}
                    style={styles.input}
                    required
                  />
                </div>
                <div style={{ ...styles.inputGroup, flex: 1, minWidth: 0 }}>
                  <label style={styles.label}>CGPA</label>
                  <input
                    type="number"
                    step="0.01"
                    name="cgpa"
                    placeholder="0.00"
                    value={registerData.cgpa}
                    onChange={handleRegisterChange}
                    style={styles.input}
                    required
                  />
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Create a strong password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  style={styles.input}
                  required
                />
              </div>
            </>
          ) : (
            /* STUDENT LOGIN FIELDS */
            <>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Student Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your student email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  style={styles.input}
                  required
                />
              </div>
            </>
          )}

          <button type="submit" style={styles.submitBtn}>
            {activeTab === 'register' ? "Create Account" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#137333',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    fontFamily: 'sans-serif',
    boxSizing: 'border-box'
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '32px',
    width: '100%',
    maxWidth: '480px',
    boxShadow: '0 4px 25px rgba(0,0,0,0.15)',
    boxSizing: 'border-box'
  },
  badge: {
    backgroundColor: '#E6F4EA',
    color: '#137333',
    padding: '6px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold'
  },
  title: {
    color: '#0f5227',
    fontSize: '28px',
    margin: '16px 0 4px 0',
    fontWeight: 'bold'
  },
  subtitle: {
    color: '#666',
    fontSize: '14px',
    margin: '0 0 24px 0'
  },
  tabContainer: {
    display: 'flex',
    gap: '12px',
    marginBottom: '24px'
  },
  tab: {
    flex: 1,
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.2s ease-in-out'
  },
  activeTab: {
    backgroundColor: '#E6F4EA',
    borderColor: '#137333',
    color: '#137333',
    fontWeight: 'bold'
  },
  inactiveTab: {
    backgroundColor: '#fff',
    borderColor: '#e0e0e0',
    color: '#666'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  label: {
    fontSize: '13px',
    fontWeight: 'bold',
    color: '#333'
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    backgroundColor: '#f9f9f9',
    fontSize: '14px',
    outline: 'none'
  },
  submitBtn: {
    backgroundColor: '#109648',
    color: '#fff',
    padding: '14px',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.2s'
  }
};

export default StudentAuthPortal;