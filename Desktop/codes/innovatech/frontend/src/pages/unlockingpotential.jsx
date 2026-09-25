import React from 'react';

export default function UnlockingPotentials() {
  return (
    <div style={styles.page}>
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroContainer}>
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>
              Embrace <br />
              <span style={styles.accentText}>Perpetual Learning</span>
            </h1>
            <p style={styles.heroDescription}>
              Enhance your skills and knowledge through our educational programs, workshops, and training sessions at Innovatech.
            </p>
          </div>
          <div style={styles.heroImageContainer}>
            <img 
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80" 
              alt="Innovatech Learning" 
              style={styles.heroImage} 
            />
          </div>
        </div>
      </section>

      {/* Centered Middle Section */}
      <section style={styles.middleSection}>
        <h2 style={styles.middleTitle}>Inclusive Skills Development</h2>
        <p style={styles.middleDescription}>
          Equip your team and targeted participants with the skills they need to succeed and create sustainable businesses & community.
        </p>
      </section>

      {/* Coding Feature Section */}
      <section style={styles.codingSection}>
        <div style={styles.codingContainer}>
          {/* Left Text */}
          <div style={styles.codingTextContent}>
            <h2 style={styles.codingTitle}>
              <span style={styles.codeTag}>&lt;/&gt;</span> Coding
            </h2>
            <p style={styles.codingDescription}>
              Learn the language of the future with our coding programs and workshops. Our experienced instructors will guide you through the fundamentals of coding and help you build real-world projects.
            </p>
          </div>

          {/* Right Code Block Card */}
          <div style={styles.codeCard}>
            <pre style={styles.codeBlock}>
              <code>{`class Person:
    def __init__(self, name):
        self.name = name

    def greet(self, other_person):
        print(f"{self.name}: Hello, {other_person.name}!")


person1 = Person("Alice")
person2 = Person("Bob")
person1.greet(person2)
person2.greet(person1)`}</code>
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: '#23272f',
    color: '#fff',
    minHeight: '100vh',
    fontFamily: 'sans-serif',
  },
  heroSection: {
    padding: '5rem 5%',
    borderBottom: '1px solid #343a46',
  },
  heroContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '3rem',
    flexWrap: 'wrap',
  },
  heroContent: {
    flex: '1',
    minWidth: '300px',
  },
  heroTitle: {
    fontSize: '3rem',
    fontWeight: '800',
    lineHeight: '1.2',
    marginBottom: '1.5rem',
  },
  accentText: {
    color: '#eab308',
  },
  heroDescription: {
    fontSize: '1.1rem',
    color: '#94a3b8',
    lineHeight: '1.6',
    maxWidth: '500px',
  },
  heroImageContainer: {
    flex: '1',
    minWidth: '300px',
    maxWidth: '500px',
  },
  heroImage: {
    width: '100%',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
    objectFit: 'cover',
  },
  middleSection: {
    padding: '5rem 5%',
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto',
  },
  middleTitle: {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: '#22c55e',
    marginBottom: '1.5rem',
  },
  middleDescription: {
    fontSize: '1.2rem',
    color: '#cbd5e1',
    lineHeight: '1.6',
  },
  codingSection: {
    padding: '4rem 5% 6rem 5%',
  },
  codingContainer: {
    maxWidth: '1100px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '3rem',
    flexWrap: 'wrap',
  },
  codingTextContent: {
    flex: '1',
    minWidth: '300px',
  },
  codingTitle: {
    fontSize: '2.2rem',
    fontWeight: '800',
    color: '#e2e8f0',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
  },
  codeTag: {
    color: '#94a3b8',
    fontFamily: 'monospace',
  },
  codingDescription: {
    fontSize: '1.05rem',
    color: '#94a3b8',
    lineHeight: '1.7',
  },
  codeCard: {
    flex: '1',
    minWidth: '320px',
    backgroundColor: '#ffffff',
    color: '#1e293b',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
  },
  codeBlock: {
    margin: 0,
    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    fontSize: '0.9rem',
    lineHeight: '1.6',
    whiteSpace: 'pre-wrap',
  },
};