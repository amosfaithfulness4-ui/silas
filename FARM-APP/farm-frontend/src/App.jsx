import React, { useState } from 'react';

const StudentAuthPortal = () => {
  const [activeTab, setActiveTab] = useState('register');
  
  // NEW: State to check if the student is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [registerData, setRegisterData] = useState({
    name: '', email: '', phone: '', level: '', gpa: '', cgpa: '', password: ''
  });

  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const handleRegisterChange = (e) => setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  const handleLoginChange = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'register') {
      alert(`🎉 Profile Created Successfully! Switch to Login.`);
      setActiveTab('login');
    } else {
      alert(`🔐 Logging in...`);
      
      // CHANGE: Instead of window.location.href, we change state locally!
      setIsLoggedIn(true); 
    }
  };

  // NEW: If logged in, show this simple dashboard instead of turning blank!
  if (isLoggedIn) {
    return (
      <div style={styles.container}>
        <div style={{...styles.card, maxWidth: '600px'}}>
          <h2 style={styles.title}>👨‍🎓 Student Dashboard</h2>
          <p style={styles.subtitle}>Welcome back, {loginData.email}!</p>
          <hr style={{borderColor: '#e0e0e0', margin: '20px 0'}} />
          <div style={{display: 'flex', gap: '20px', justifyContent: 'space-between'}}>
            <div><strong>Level:</strong> 400</div>
            <div><strong>Current GPA:</strong> 4.80</div>
            <div><strong>Cumulative CGPA:</strong> 5.00</div>
          </div>
          <button 
            onClick={() => setIsLoggedIn(false)} 
            style={{...styles.submitBtn, backgroundColor: '#d93025', marginTop: '30px'}}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  // Otherwise, render your normal login/register form
  return (
    <div style={styles.container}>
      {/* ... Your existing form code remains identical here ... */}
      <div style={styles.card}>
        <span style={styles.badge}>Farm Portal</span>
        <h2 style={styles.title}>{activeTab === 'register' ? "Get Started" : "Welcome back"}</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
           {/* Form inputs go here */}
           <button type="submit" style={styles.submitBtn}>
            {activeTab === 'register' ? "Create Account" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

// ... keep your styles object down here intact