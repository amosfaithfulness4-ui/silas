import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

export default function PatientSignIn({ onSignIn }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: 'Jennifer',
    lastName: 'Caldwell',
    dob: '1985-03-14',
    bloodType: 'O+',
    email: 'jennifer.caldwell@email.com',
    phone: '(704) 555-0182',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSignIn) {
      onSignIn(formData);
    }
    navigate('/dashboard');
  };

  const inputStyle = {
    width: '100%',
    padding: '0.85rem 1.25rem',
    borderRadius: '24px',
    border: '1px solid #EAE8E1',
    backgroundColor: '#F5F4EF',
    color: '#1E293B',
    fontSize: '0.95rem',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s ease, background-color 0.2s ease',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.825rem',
    fontWeight: '600',
    color: '#5A6B7C',
    marginBottom: '0.5rem',
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#F6F5F0',
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
          backgroundColor: '#1B4360',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          marginBottom: '1.25rem',
          boxShadow: '0 4px 12px rgba(27, 67, 96, 0.15)',
        }}
      >
        <Lock size={28} strokeWidth={2.2} />
      </div>

      {/* Header Title & Subtitle */}
      <div style={{ textAlign: 'center', maxWidth: '480px', marginBottom: '2rem' }}>
        <h1
          style={{
            fontSize: '2.25rem',
            fontWeight: '800',
            color: '#0F172A',
            margin: '0 0 0.75rem 0',
            letterSpacing: '-0.02em',
          }}
        >
          Patient Portal
        </h1>
        <p
          style={{
            color: '#64748B',
            fontSize: '0.95rem',
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          Access your health records, appointments, and test results securely.
        </p>
      </div>

      {/* Main White Form Card */}
      <div
        style={{
          maxWidth: '680px',
          width: '100%',
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '2.5rem 2rem',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
          boxSizing: 'border-box',
        }}
      >
        <form onSubmit={handleSubmit}>
          {/* 2-Column Inputs Grid */}
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
                width: '100%',
                maxWidth: '320px',
                backgroundColor: '#1B4360',
                color: '#FFFFFF',
                border: 'none',
                padding: '0.9rem 2rem',
                borderRadius: '9999px',
                fontWeight: '700',
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#14334A')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1B4360')}
            >
              Sign In to Portal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}