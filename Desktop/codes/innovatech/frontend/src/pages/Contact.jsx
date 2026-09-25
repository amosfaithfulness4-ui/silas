import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    lookingFor: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for reaching out to Innovatech!');
  };

  return (
    <div style={styles.page}>
      {/* Top Banner Section */}
      <section style={styles.heroSection}>
        <h1 style={styles.heroTitle}>Got a question?</h1>
        <p style={styles.heroSubtitle}>We'd like to talk more about what you need</p>
      </section>

      {/* Floating Info Cards Container */}
      <div style={styles.cardContainer}>
        <div style={styles.floatingCard}>
          <div style={styles.cardCol}>
            <div style={styles.iconBox}>📍</div>
            <h4 style={styles.cardHeader}>Address</h4>
            <p style={styles.cardText}>Plot 1 Over Head Tank, Bogoro, Bauchi State, Nigeria</p>
          </div>

          <div style={styles.divider}></div>

          <div style={styles.cardCol}>
            <div style={styles.iconBox}>✉️</div>
            <h4 style={styles.cardHeader}>Email</h4>
            <p style={styles.cardText}>values@innovatechnigeria.com</p>
          </div>

          <div style={styles.divider}></div>

          <div style={styles.cardCol}>
            <div style={styles.iconBox}>📞</div>
            <h4 style={styles.cardHeader}>Phone</h4>
            <p style={styles.cardText}>+234 806 390 7478</p>
          </div>

          <div style={styles.divider}></div>

          <div style={styles.cardCol}>
            <div style={styles.iconBox}>🎛️</div>
            <h4 style={styles.cardHeader}>Contact</h4>
            <p style={styles.cardText}>Business Support</p>
          </div>
        </div>
      </div>

      {/* Form & Info Split Section */}
      <section style={styles.splitSection}>
        {/* Left Side: Contact Form */}
        <div style={styles.formSide}>
          <h2 style={styles.formHeading}>Say Hi!</h2>
          <p style={styles.formSubheading}>We'd like to talk with you.</p>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>My name is</label>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>I'm looking for</label>
              <input
                type="text"
                name="lookingFor"
                placeholder="What you love"
                value={formData.lookingFor}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Your message</label>
              <textarea
                name="message"
                placeholder="I want to say that..."
                value={formData.message}
                onChange={handleChange}
                rows="4"
                style={styles.textarea}
                required
              />
            </div>

            <button type="submit" style={styles.sendButton}>
              SEND MESSAGE
            </button>
          </form>
        </div>

        {/* Right Side: Innovatech Side Panel */}
        <div style={styles.infoSide}>
          <h2 style={styles.infoHeading}>Contact Information</h2>
          <p style={styles.infoSubtext}>
            Fill up the form and our Team will get back to you within 24 hours.
          </p>

          <div style={styles.infoList}>
            <div style={styles.infoItem}>
              <span>📞</span>
              <span>+234 806 390 7478</span>
            </div>
            <div style={styles.infoItem}>
              <span>✉️</span>
              <span>values@innovatechnigeria.com</span>
            </div>
            <div style={styles.infoItem}>
              <span>📍</span>
              <span>Plot 1 Over Head Tank, Bogoro, Bauchi State, Nigeria</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: 'sans-serif',
    backgroundColor: '#fff',
  },
  heroSection: {
    backgroundColor: '#5d6878',
    color: '#fff',
    textAlign: 'center',
    padding: '4rem 1rem 6rem 1rem',
  },
  heroTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
  },
  heroSubtitle: {
    fontSize: '1.1rem',
    color: '#e2e8f0',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '-3rem',
    padding: '0 5%',
  },
  floatingCard: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    maxWidth: '1000px',
    padding: '1.5rem',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  cardCol: {
    flex: '1',
    minWidth: '180px',
    textAlign: 'center',
    padding: '0.5rem',
  },
  divider: {
    width: '1px',
    height: '60px',
    backgroundColor: '#e2e8f0',
  },
  iconBox: {
    backgroundColor: '#003366',
    color: '#fff',
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 0.5rem auto',
    fontSize: '1.2rem',
  },
  cardHeader: {
    fontSize: '1rem',
    color: '#003366',
    fontWeight: '700',
    margin: '0.2rem 0',
  },
  cardText: {
    fontSize: '0.85rem',
    color: '#64748b',
    margin: 0,
  },
  splitSection: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '1200px',
    margin: '3rem auto 0 auto',
    flexWrap: 'wrap',
  },
  formSide: {
    flex: '1',
    minWidth: '320px',
    padding: '2rem 4rem',
  },
  formHeading: {
    fontSize: '2rem',
    color: '#003366',
    fontWeight: '800',
    marginBottom: '0.3rem',
  },
  formSubheading: {
    color: '#64748b',
    marginBottom: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '0.85rem',
    color: '#64748b',
    marginBottom: '0.3rem',
  },
  input: {
    border: 'none',
    borderBottom: '1px solid #cbd5e1',
    padding: '0.6rem 0',
    outline: 'none',
    fontSize: '1rem',
  },
  textarea: {
    border: 'none',
    borderBottom: '1px solid #cbd5e1',
    padding: '0.6rem 0',
    outline: 'none',
    fontSize: '1rem',
    fontFamily: 'sans-serif',
    resize: 'vertical',
  },
  sendButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#eab308',
    color: '#003366',
    border: 'none',
    padding: '0.8rem 2rem',
    borderRadius: '8px',
    fontWeight: '800',
    cursor: 'pointer',
    marginTop: '1rem',
  },
  infoSide: {
    flex: '1',
    minWidth: '320px',
    backgroundColor: '#003366',
    color: '#fff',
    padding: '3rem 3rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  infoHeading: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '1rem',
  },
  infoSubtext: {
    color: '#cbd5e1',
    fontSize: '0.95rem',
    marginBottom: '2.5rem',
    lineHeight: '1.5',
  },
  infoList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    fontSize: '0.95rem',
  },
};