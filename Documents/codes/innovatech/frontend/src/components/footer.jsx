import React, { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [language, setLanguage] = useState('');

  const phoneNumber = '2348063907478';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    'Hello Innovatech, I would like to make an inquiry.'
  )}`;

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    setEmail('');
    setLanguage('');
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Bottom Section: Branding & Newsletter */}
        <div style={styles.bottomSection}>
          {/* Left: Branding & Contact Info */}
          <div style={styles.brandInfo}>
            <div style={styles.logoBox}>
              <span style={styles.logoTextMain}>
                Innova<span style={styles.logoTextSub}>tech</span>
              </span>
              <div style={styles.logoTitleGroup}>
                <span style={styles.logoSubTitle}>
                  Empowering Future Innovations
                </span>
              </div>
            </div>

            <p style={styles.contactItem}>
              Plot 1 Over Head Tank, Bogoro,<br />
              Bauchi State, Nigeria
            </p>

            <p style={styles.contactItem}>
              <a href="mailto:values@innovatechnigeria.com" style={styles.emailLink}>
                values@innovatechnigeria.com
              </a>
              <br />
              +234 806 390 7478
            </p>

            <p style={styles.chatNow}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.chatLink}
              >
                Chat Now
              </a>
            </p>
          </div>

          {/* Right: Newsletter Subscription Form */}
          <div style={styles.newsletterBox}>
            <h4 style={styles.newsletterTitle}>Subscribe to our Bulletin</h4>
            <p style={styles.newsletterSubtitle}>
              Latest articles & resources sent to your inbox Monthly.
            </p>

            <form onSubmit={handleSubscribe} style={styles.form}>
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                required
              />
              <input
                type="text"
                placeholder="Preferred Language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={styles.input}
              />
              <button type="submit" style={styles.subscribeBtn}>
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#151a21',
    color: '#cbd5e1',
    fontFamily: 'sans-serif',
    padding: '3rem 5%',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  bottomSection: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '3rem',
    flexWrap: 'wrap',
  },
  brandInfo: {
    flex: '1',
    minWidth: '280px',
  },
  logoBox: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1.5rem',
  },
  logoTextMain: {
    fontSize: '1.8rem',
    fontWeight: '900',
    color: '#ffffff',
    lineHeight: '1.2',
  },
  logoTextSub: {
    color: '#3b82f6',
  },
  logoTitleGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  logoSubTitle: {
    color: '#94a3b8',
    fontSize: '0.78rem',
    fontWeight: '500',
    letterSpacing: '0.02em',
  },
  contactItem: {
    fontSize: '0.9rem',
    color: '#cbd5e1',
    lineHeight: '1.6',
    marginBottom: '1.2rem',
    marginTop: 0,
  },
  emailLink: {
    color: '#cbd5e1',
    textDecoration: 'none',
  },
  chatNow: {
    marginTop: '0.5rem',
  },
  chatLink: {
    color: '#ffffff',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: '0.9rem',
    display: 'inline-block',
    cursor: 'pointer',
  },
  newsletterBox: {
    flex: '1',
    maxWidth: '450px',
    minWidth: '280px',
  },
  newsletterTitle: {
    color: '#ffffff',
    fontSize: '1.15rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
    marginTop: 0,
  },
  newsletterSubtitle: {
    fontSize: '0.88rem',
    color: '#cbd5e1',
    marginBottom: '1.5rem',
    marginTop: 0,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    backgroundColor: 'transparent',
    border: '1px solid #334155',
    borderRadius: '6px',
    padding: '0.8rem 1rem',
    color: '#ffffff',
    fontSize: '0.88rem',
    outline: 'none',
  },
  subscribeBtn: {
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    padding: '0.85rem',
    fontWeight: '700',
    fontSize: '0.85rem',
    cursor: 'pointer',
    marginTop: '0.5rem',
  },
};