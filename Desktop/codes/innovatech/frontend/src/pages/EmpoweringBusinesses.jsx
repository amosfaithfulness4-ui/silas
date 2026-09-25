import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function EmpoweringBusinesses() {
  const [formData, setFormData] = useState({ name: '', email: '', role: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for reaching out! We will contact you soon.');
  };

  return (
    <div style={styles.page}>
      {/* 1. Blue Hero Banner */}
      <section style={styles.heroSection}>
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContent}>
          <div style={styles.heroLeft}>
            <div style={styles.storeCard}>
              <div style={styles.storeTopBar}></div>
              <div style={styles.storeBody}>
                <span style={styles.userIcon}>👤</span>
                <div style={styles.storeBoxes}>
                  <div style={styles.box}></div>
                  <div style={styles.box}></div>
                </div>
              </div>
            </div>
          </div>
          <div style={styles.heroRight}>
            <h1 style={styles.heroTitle}>
              We are Committed to driving Creativity, & Innovations
            </h1>
            <p style={styles.heroSubtitle}>
              Digital inclusion is the key to unlocking business growth and fostering diverse communities
            </p>
          </div>
        </div>
      </section>

      {/* 2. Collaboration Section */}
      <section style={styles.collabSection}>
        <div style={styles.collabContainer}>
          <div style={styles.collabLeft}>
            <h2 style={styles.collabTitle}>
              Collaboration <span style={styles.pinkText}>TOWARDS</span> Sustainable Growth
            </h2>
            <p style={styles.collabText}>
              We operate open door policy for Partners and Collaborators gearing towards positive impacts <strong>INITIATIVEs & PROJECTs</strong> around the 17 Sustainable Development Goals in Nigeria. Our networks and communities can support you across the 36 states and FCT in Nigeria
            </p>
            <Link to="/contact" style={styles.pinkBtn}>CONTACT US</Link>
            
            <div style={styles.partnersGrid}>
              <span style={styles.partnerTag}>AfriLabs</span>
              <span style={styles.partnerTag}>aws</span>
              <span style={styles.partnerTag}>Google</span>
              <span style={styles.partnerTag}>coursera</span>
            </div>
          </div>
          <div style={styles.collabRight}>
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
              alt="Team Collaboration" 
              style={styles.collabImg}
            />
          </div>
        </div>
      </section>

      {/* 3. Three Columns Section */}
      <section style={styles.cardsSection}>
        <div style={styles.cardsContainer}>
          {/* Card 1 */}
          <div style={styles.lightCard}>
            <span style={styles.cardCategory}>BUSINESS DEVELOPMENT</span>
            <h3 style={styles.cardHeading}>StartUp Clinic for Sustainable Development</h3>
            <p style={styles.cardDesc}>
              We specialize in empowering early-stage ventures with expert guidance, mentorship, and resources. From business planning to market entry strategies, our tailored programs help startups thrive. Join us and take your entrepreneurial journey to new heights
            </p>
          </div>

          {/* Card 2 - Highlighted */}
          <div style={styles.darkCard}>
            <span style={styles.darkCardCategory}>DIGITAL TOOLS</span>
            <h3 style={styles.darkCardHeading}>Leveraging ICT for Micro, Small and Medium Enterprises</h3>
            <p style={styles.darkCardDesc}>
              Specialize in unlocking the potential of technology to propel your business forward. From digital transformation strategies to tailored solutions, let us help you thrive in the digital age.
            </p>
          </div>

          {/* Card 3 */}
          <div style={styles.lightCard}>
            <span style={styles.cardCategory}>LEVERAGING ICT</span>
            <h3 style={styles.cardHeading}>Performance Optimization for Agro-Business</h3>
            <p style={styles.cardDesc}>
              Our expertise in leveraging technology equips agripreneurs with tailored solutions for increased efficiency and productivity. Join us to harness the power of digital innovation and elevate your agricultural enterprise to new heights
            </p>
          </div>
        </div>
      </section>

      {/* 4. Contact Form Section */}
      <section style={styles.formSection}>
        <h2 style={styles.formTitle}>Want to work with us?</h2>
        <p style={styles.formSubtitle}>
          Ready to harness the power of our comprehensive consultancy services to drive innovation and success? Contact us today to learn more about our offerings and how we can help you achieve your goals
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <input 
              type="text" 
              name="name" 
              placeholder="Your name" 
              value={formData.name} 
              onChange={handleChange} 
              style={styles.input} 
              required 
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Your Email" 
              value={formData.email} 
              onChange={handleChange} 
              style={styles.input} 
              required 
            />
            <input 
              type="text" 
              name="role" 
              placeholder="I'm a Freelancer" 
              value={formData.role} 
              onChange={handleChange} 
              style={styles.input} 
            />
          </div>
          <button type="submit" style={styles.submitBtn}>LET'S TALK</button>
        </form>
      </section>

      {/* 5. Bottom Dark Banner */}
      <section style={styles.bottomBanner}>
        <div style={styles.bottomBannerContainer}>
          <h3 style={styles.bottomBannerText}>
            Your Business not depend solely on Softwares or Internet, we can help you serve those <u style={styles.underlineText}>CLIENTS</u> that do
          </h3>
          <div style={styles.bottomBannerButtons}>
            <Link to="/contact" style={styles.bannerPinkBtn}>CONTACT US</Link>
            <Link to="/our-story" style={styles.bannerWhiteBtn}>OUR STORY</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: 'sans-serif',
    color: '#334155',
    backgroundColor: '#fff',
  },
  /* Hero */
  heroSection: {
    position: 'relative',
    backgroundColor: '#3b82f6',
    backgroundImage: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
    padding: '5rem 5%',
    color: '#fff',
  },
  heroContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    gap: '3rem',
    flexWrap: 'wrap',
  },
  heroLeft: {
    flex: '1',
    minWidth: '300px',
    display: 'flex',
    justifyContent: 'center',
  },
  storeCard: {
    width: '280px',
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '1.5rem',
    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)',
  },
  storeTopBar: {
    height: '12px',
    backgroundColor: '#3b82f6',
    borderRadius: '6px',
    marginBottom: '1rem',
  },
  storeBody: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
  userIcon: {
    fontSize: '3rem',
  },
  storeBoxes: {
    display: 'flex',
    gap: '0.5rem',
  },
  box: {
    width: '50px',
    height: '40px',
    backgroundColor: '#e2e8f0',
    borderRadius: '4px',
  },
  heroRight: {
    flex: '1.5',
    minWidth: '300px',
  },
  heroTitle: {
    fontSize: '3rem',
    fontWeight: '800',
    lineHeight: '1.2',
    marginBottom: '1rem',
  },
  heroSubtitle: {
    fontSize: '1.2rem',
    color: '#e0f2fe',
    lineHeight: '1.6',
  },

  /* Collaboration Section */
  collabSection: {
    padding: '5rem 5%',
    backgroundColor: '#f8fafc',
  },
  collabContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    gap: '3rem',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  collabLeft: {
    flex: '1',
    minWidth: '320px',
  },
  collabTitle: {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: '1.5rem',
  },
  pinkText: {
    color: '#ec4899',
  },
  collabText: {
    fontSize: '1.05rem',
    lineHeight: '1.7',
    color: '#475569',
    marginBottom: '2rem',
  },
  pinkBtn: {
    display: 'inline-block',
    backgroundColor: '#e11d48',
    color: '#fff',
    padding: '0.8rem 2rem',
    borderRadius: '8px',
    fontWeight: '700',
    textDecoration: 'none',
    marginBottom: '2.5rem',
  },
  partnersGrid: {
    display: 'flex',
    gap: '1.5rem',
    flexWrap: 'wrap',
    color: '#64748b',
    fontWeight: '700',
  },
  partnerTag: {
    fontSize: '1.1rem',
  },
  collabRight: {
    flex: '1',
    minWidth: '320px',
  },
  collabImg: {
    width: '100%',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
  },

  /* 3 Cards Section */
  cardsSection: {
    padding: '5rem 5%',
    backgroundColor: '#94a3b8',
  },
  cardsContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    gap: '2rem',
    flexWrap: 'wrap',
  },
  lightCard: {
    flex: '1',
    minWidth: '280px',
    backgroundColor: '#e2e8f0',
    borderRadius: '12px',
    padding: '2.5rem 2rem',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardCategory: {
    fontSize: '0.75rem',
    fontWeight: '800',
    color: '#64748b',
    letterSpacing: '0.05em',
    marginBottom: '1rem',
  },
  cardHeading: {
    fontSize: '1.5rem',
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: '1.5rem',
    lineHeight: '1.3',
  },
  cardDesc: {
    fontSize: '0.95rem',
    color: '#475569',
    lineHeight: '1.6',
  },
  darkCard: {
    flex: '1',
    minWidth: '280px',
    backgroundColor: '#334155',
    color: '#fff',
    borderRadius: '12px',
    padding: '2.5rem 2rem',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  darkCardCategory: {
    fontSize: '0.75rem',
    fontWeight: '800',
    color: '#94a3b8',
    letterSpacing: '0.05em',
    marginBottom: '1rem',
  },
  darkCardHeading: {
    fontSize: '1.5rem',
    fontWeight: '800',
    color: '#fff',
    marginBottom: '1.5rem',
    lineHeight: '1.3',
  },
  darkCardDesc: {
    fontSize: '0.95rem',
    color: '#cbd5e1',
    lineHeight: '1.6',
  },

  /* Contact Form Section */
  formSection: {
    padding: '5rem 5%',
    textAlign: 'center',
    maxWidth: '850px',
    margin: '0 auto',
  },
  formTitle: {
    fontSize: '2.8rem',
    fontWeight: '800',
    color: '#e11d48',
    marginBottom: '1rem',
  },
  formSubtitle: {
    fontSize: '1.1rem',
    color: '#475569',
    lineHeight: '1.6',
    marginBottom: '3rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2.5rem',
  },
  inputGroup: {
    display: 'flex',
    gap: '1.5rem',
    width: '100%',
    flexWrap: 'wrap',
  },
  input: {
    flex: '1',
    minWidth: '200px',
    border: 'none',
    borderBottom: '1px solid #cbd5e1',
    padding: '0.8rem 0',
    outline: 'none',
    fontSize: '1rem',
  },
  submitBtn: {
    backgroundColor: '#e11d48',
    color: '#fff',
    border: 'none',
    padding: '0.9rem 2.5rem',
    borderRadius: '25px',
    fontWeight: '700',
    fontSize: '0.9rem',
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(225, 29, 72, 0.4)',
  },

  /* Bottom Dark Banner */
  bottomBanner: {
    backgroundColor: '#1e242b',
    backgroundImage: `radial-gradient(circle at 50% 50%, #2a313a 1px, transparent 1px)`,
    backgroundSize: '24px 24px',
    padding: '3.5rem 5%',
    color: '#fff',
  },
  bottomBannerContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '2rem',
    flexWrap: 'wrap',
  },
  bottomBannerText: {
    fontSize: '1.35rem',
    fontWeight: '700',
    maxWidth: '650px',
    lineHeight: '1.4',
    margin: 0,
  },
  underlineText: {
    textDecoration: 'underline',
    textUnderlineOffset: '4px',
  },
  bottomBannerButtons: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  bannerPinkBtn: {
    backgroundColor: '#e11d48',
    color: '#fff',
    padding: '0.8rem 1.8rem',
    borderRadius: '6px',
    fontWeight: '700',
    textDecoration: 'none',
    fontSize: '0.85rem',
    letterSpacing: '0.05em',
  },
  bannerWhiteBtn: {
    backgroundColor: '#ffffff',
    color: '#0f172a',
    padding: '0.8rem 1.8rem',
    borderRadius: '6px',
    fontWeight: '700',
    textDecoration: 'none',
    fontSize: '0.85rem',
    letterSpacing: '0.05em',
  },
};