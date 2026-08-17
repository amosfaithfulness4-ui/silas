import React, { useState } from 'react';

export default function PatientPortal({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    bloodType: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLoginSuccess) {
      onLoginSuccess(formData);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.85rem 1.25rem',
    borderRadius: '24px',
    border: '1px solid #eae8e1',
    backgroundColor: '#f4f3ef',
    color: '#0f172a',
    fontSize: '0.95rem',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s ease',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#64748b',
    marginBottom: '0.5rem',
  };

  return (
    <div
      style={{
        backgroundColor: '#f8f6f0',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2.5rem 1rem',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Top Lock Circle Header */}
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: '#1b4d72',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.25rem',
          boxShadow: '0 4px 12px rgba(27, 77, 114, 0.15)',
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </div>

      {/* Header Info */}
      <h1
        style={{
          fontSize: '2.25rem',
          fontWeight: '800',
          color: '#0f172a',
          margin: '0 0 0.5rem 0',
          textAlign: 'center',
          letterSpacing: '-0.02em',
        }}
      >
        Patient Portal
      </h1>

      <p
        style={{
          color: '#64748b',
          fontSize: '0.95rem',
          margin: '0 0 2rem 0',
          textAlign: 'center',
          maxWidth: '480px',
          lineHeight: 1.5,
        }}
      >
        Access your health records, appointments, and test results securely.
      </p>

      {/* Main Form Card */}
      <div
        style={{
          backgroundColor: '#ffffff',
          width: '100%',
          maxWidth: '680px',
          padding: '2.5rem 2rem',
          borderRadius: '24px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
          border: '1px solid #f1f5f9',
          boxSizing: 'border-box',
        }}
      >
        <form onSubmit={handleSubmit}>
          {/* 2-Column Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.25rem 1.5rem',
            }}
          >
            {/* First Name */}
            <div>
              <label style={labelStyle}>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label style={labelStyle}>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label style={labelStyle}>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>

            {/* Blood Type */}
            <div>
              <label style={labelStyle}>Blood Type</label>
              <select
                name="bloodType"
                value={formData.bloodType}
                onChange={handleChange}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            {/* Email Address */}
            <div>
              <label style={labelStyle}>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label style={labelStyle}>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <button
              type="submit"
              style={{
                backgroundColor: '#1b4d72',
                color: '#ffffff',
                border: 'none',
                padding: '0.9rem 2.5rem',
                borderRadius: '9999px',
                fontWeight: '700',
                fontSize: '0.95rem',
                cursor: 'pointer',
                width: '100%',
                maxWidth: '320px',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#143854')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1b4d72')}
            >
              Sign In to Portal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}