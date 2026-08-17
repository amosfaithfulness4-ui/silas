import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    subject: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! Your message has been sent.');
    setFormData({ fullName: '', phone: '', email: '', subject: '' });
  };

  return (
    <div style={{ backgroundColor: '#f8f6f0', minHeight: '100vh', padding: '3rem 2rem', color: '#0f172a', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Main Heading */}
        <h1 style={{ textAlign: 'center', fontSize: '3rem', fontWeight: '800', color: '#0f4c81', margin: '0 0 3rem 0', letterSpacing: '-0.02em' }}>
          We're here to help
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '2rem', alignItems: 'start' }}>
          
          {/* Left Side Info Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            {/* Address */}
            <div style={{ backgroundColor: '#ffffff', padding: '1.25rem 1.5rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>
                📍
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  ADDRESS
                </span>
                <p style={{ margin: '0.2rem 0 0', fontWeight: '700', color: '#0f172a', fontSize: '0.95rem', lineHeight: 1.4 }}>
                  Opposite Overhead Tank <br />
                  <span style={{ fontWeight: '500', color: '#475569' }}>Bogoro, Bauchi State, Nigeria</span>
                </p>
              </div>
            </div>

            {/* Main Line */}
            <div style={{ backgroundColor: '#ffffff', padding: '1.25rem 1.5rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#fce7f3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>
                📞
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  MAIN LINE
                </span>
                <p style={{ margin: '0.2rem 0 0', fontWeight: '700', color: '#0f172a', fontSize: '0.95rem' }}>
                  +234 9029390701
                </p>
              </div>
            </div>

            {/* Emergency */}
            <div style={{ backgroundColor: '#ffffff', padding: '1.25rem 1.5rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>
                ⚡
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  EMERGENCY
                </span>
                <p style={{ margin: '0.2rem 0 0', fontWeight: '700', color: '#0f172a', fontSize: '0.95rem' }}>
                  1-800-SARAH-ER (24/7)
                </p>
              </div>
            </div>

            {/* Hours */}
            <div style={{ backgroundColor: '#ffffff', padding: '1.25rem 1.5rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>
                🕒
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  HOURS
                </span>
                <p style={{ margin: '0.2rem 0 0', fontWeight: '600', color: '#0f172a', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  <strong>Mon–Fri:</strong> 7am–8pm <br />
                  <strong>Sat–Sun:</strong> 8am–5pm <br />
                  <span style={{ color: '#0f4c81', fontWeight: '700' }}>ER: Always Open</span>
                </p>
              </div>
            </div>

          </div>

          {/* Right Side Form Card */}
          <div style={{ backgroundColor: '#ffffff', padding: '2.5rem', borderRadius: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0f172a', margin: '0 0 1.5rem 0' }}>
              Send us a message
            </h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* Row 1: Full Name & Phone */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#64748b', marginBottom: '0.4rem' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      backgroundColor: '#f1f5f9',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '0.9rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#64748b', marginBottom: '0.4rem' }}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+234..."
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      backgroundColor: '#f1f5f9',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '0.9rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              {/* Row 2: Email */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#64748b', marginBottom: '0.4rem' }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    backgroundColor: '#f1f5f9',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Row 3: Subject */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#64748b', marginBottom: '0.4rem' }}>
                  Subject
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    backgroundColor: '#f1f5f9',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '0.9rem',
                    color: formData.subject ? '#0f172a' : '#64748b',
                    outline: 'none',
                    boxSizing: 'border-box',
                    cursor: 'pointer'
                  }}
                >
                  <option value="" disabled>Select a topic</option>
                  <option value="general">General Inquiry</option>
                  <option value="appointments">Appointments & Scheduling</option>
                  <option value="billing">Billing & Insurance</option>
                  <option value="feedback">Patient Feedback</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                style={{
                  backgroundColor: '#0f4c81',
                  color: '#ffffff',
                  border: 'none',
                  padding: '1rem',
                  borderRadius: '9999px',
                  fontWeight: '700',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  marginTop: '1rem',
                  width: '100%',
                  transition: 'background-color 0.2s ease'
                }}
              >
                Send Message <span>✉</span>
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}