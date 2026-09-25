import React from 'react';

export default function OurStory() {
  const coreValues = [
    { title: 'Openness', desc: 'We are committed to a culture of teamwork and collaborations.', icon: '⭕' },
    { title: 'Inclusiveness', desc: 'We respect people, value diversity and are committed to equality.', icon: '👥' },
    { title: 'Quality', desc: 'We strive for excellence through continuous improvement and learning.', icon: '✔️' },
    { title: 'Participation', desc: 'We value and recognize the contribution of our communities.', icon: '🤝' },
    { title: 'Leadership', desc: 'Growth mindset equips us to be the leaders we portray.', icon: '🚀' },
    { title: 'Trusted Advisor', desc: 'We go all-out to support our partners and associates.', icon: '🏛️' },
  ];

  const team = [
    {
      name: 'Pst Silas Amos',
      role: 'Co-Founder',
      gender: 'male',
      bio: 'A visionary leader, playing a crucial role in establishing and guiding strategic direction. With a strong passion for innovation and in-depth industry knowledge, he drives our mission to deliver excellence.',
    },
    {
      name: 'Dr Sarah Amos',
      role: 'Chair Person',
      gender: 'female',
      bio: 'She brings exceptional leadership and governance. With extensive experience and a deep commitment to our values, she guides our strategic direction, ensuring we achieve our goals with integrity.',
    },
    {
      name: 'Mr Silas Babah',
      role: 'Finance Lead',
      gender: 'male',
      bio: 'An expert in financial strategy and oversight, ensuring financial health and growth. With keen attention to detail and strategic insight, he manages all financial operations to drive sustainability.',
    },
    {
      name: 'Mr Faithfulness Amos',
      role: 'Research & Development',
      gender: 'male',
      bio: 'Pioneering our innovation efforts, directing cutting-edge projects that push technological boundaries. With a robust background in software and development, he is key to our advancement.',
    },
  ];

  return (
    <div style={styles.page}>
      {/* 1. Hero Commitment Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroOverlay}>
          <h1 style={styles.heroTitle}>Our Commitment to Excellence</h1>
          <p style={styles.heroSubtitle}>
            We are driven by a steadfast commitment to excellence, integrity, and consistency. You will discover why our partners trust us as their preferred choice for quality and reliability in every endeavor.
          </p>
        </div>
      </section>

      {/* 2. Core Values, Mission & Vision Section */}
      <section style={styles.valuesMissionSection}>
        <div style={styles.valuesMissionContainer}>
          {/* Core Values Box */}
          <div style={styles.valuesBox}>
            <h2 style={styles.sectionHeading}>Core Values</h2>
            <div style={styles.valuesList}>
              {coreValues.map((val, idx) => (
                <div key={idx} style={styles.valueItem}>
                  <div style={styles.valueIcon}>{val.icon}</div>
                  <div>
                    <h4 style={styles.valueTitle}>{val.title}</h4>
                    <p style={styles.valueDesc}>{val.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mission & Vision Box */}
          <div style={styles.missionVisionBox}>
            <div style={styles.statementGroup}>
              <h3 style={styles.statementTitle}>Mission Statement</h3>
              <p style={styles.statementText}>
                To empower our clients to build, optimize, and sustain profitable businesses by providing innovative and effective information technology solutions.
              </p>
            </div>
            <div style={styles.statementGroup}>
              <h3 style={styles.pinkStatementTitle}>Vision Statement</h3>
              <p style={styles.statementText}>
                To lead the transformation of businesses and communities across Africa by driving innovation, fostering inclusivity, and creating sustainable growth through cutting-edge technology solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Executive Team Section */}
      <section style={styles.teamSection}>
        <div style={styles.teamHeader}>
          <h2 style={styles.teamTitle}>The Executive Team</h2>
          <p style={styles.teamSubtitle}>
            Our executive team comprises seasoned professionals dedicated to steering towards unparalleled success. With a wealth of experience and a commitment to excellence, our leaders are at the forefront of driving innovation and ensuring top-tier service delivery.
          </p>
        </div>

        <div style={styles.teamGrid}>
          {team.map((member, idx) => (
            <div key={idx} style={styles.teamCard}>
              <div style={styles.avatarPlaceholder}>
                <svg width="60" height="60" viewBox="0 0 24 24" fill="#94a3b8">
                  {member.gender === 'female' ? (
                    <path d="M12 2a5 5 0 0 1 5 5c0 2.11-1.31 3.92-3.15 4.63C16.42 12.8 18 15.2 18 18v1H6v-1c0-2.8 1.58-5.2 4.15-6.37C8.31 10.92 7 9.11 7 7a5 5 0 0 1 5-5z" />
                  ) : (
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  )}
                </svg>
              </div>
              <div style={styles.memberInfo}>
                <h3 style={styles.memberName}>{member.name}</h3>
                <h4 style={idx % 2 === 1 ? styles.pinkRole : styles.blueRole}>{member.role}</h4>
                <p style={styles.memberBio}>{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: 'sans-serif',
    backgroundColor: '#f8fafc',
    color: '#334155',
  },

  /* Hero */
  heroSection: {
    backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.85)), url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '6rem 5% 8rem 5%',
    textAlign: 'center',
    color: '#fff',
  },
  heroOverlay: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  heroTitle: {
    fontSize: '2.8rem',
    fontWeight: '800',
    marginBottom: '1.5rem',
  },
  heroSubtitle: {
    fontSize: '1.15rem',
    lineHeight: '1.7',
    color: '#cbd5e1',
  },

  /* Values & Mission */
  valuesMissionSection: {
    padding: '0 5% 5rem 5%',
    marginTop: '-4rem',
  },
  valuesMissionContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    gap: '2rem',
    flexWrap: 'wrap',
  },
  valuesBox: {
    flex: '1.2',
    minWidth: '320px',
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '2.5rem',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
  },
  sectionHeading: {
    fontSize: '1.8rem',
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: '2rem',
  },
  valuesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  valueItem: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'flex-start',
  },
  valueIcon: {
    fontSize: '1.5rem',
  },
  valueTitle: {
    fontSize: '1.05rem',
    fontWeight: '700',
    color: '#e11d48',
    marginBottom: '0.3rem',
  },
  valueDesc: {
    fontSize: '0.9rem',
    color: '#64748b',
    lineHeight: '1.5',
    margin: 0,
  },

  missionVisionBox: {
    flex: '1.8',
    minWidth: '320px',
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '2.5rem',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
    display: 'flex',
    gap: '2rem',
    flexWrap: 'wrap',
    alignSelf: 'flex-start',
  },
  statementGroup: {
    flex: '1',
    minWidth: '240px',
  },
  statementTitle: {
    fontSize: '1.4rem',
    fontWeight: '800',
    color: '#1e3a8a',
    marginBottom: '1rem',
  },
  pinkStatementTitle: {
    fontSize: '1.4rem',
    fontWeight: '800',
    color: '#e11d48',
    marginBottom: '1rem',
  },
  statementText: {
    fontSize: '0.95rem',
    lineHeight: '1.6',
    color: '#475569',
  },

  /* Executive Team */
  teamSection: {
    backgroundColor: '#1e242b',
    padding: '5rem 5%',
    color: '#fff',
  },
  teamHeader: {
    maxWidth: '1200px',
    margin: '0 auto 4rem auto',
    display: 'flex',
    gap: '3rem',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  teamTitle: {
    fontSize: '2.5rem',
    fontWeight: '800',
    flex: '1',
    minWidth: '250px',
  },
  teamSubtitle: {
    fontSize: '1rem',
    lineHeight: '1.7',
    color: '#94a3b8',
    flex: '2',
    minWidth: '300px',
  },
  teamGrid: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
  },
  teamCard: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '2rem',
    color: '#334155',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    display: 'flex',
    gap: '1.2rem',
    alignItems: 'flex-start',
  },
  avatarPlaceholder: {
    width: '70px',
    height: '70px',
    backgroundColor: '#e2e8f0',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  memberInfo: {
    flex: '1',
  },
  memberName: {
    fontSize: '1.2rem',
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: '0.2rem',
  },
  blueRole: {
    fontSize: '0.95rem',
    fontWeight: '700',
    color: '#2563eb',
    marginBottom: '0.8rem',
  },
  pinkRole: {
    fontSize: '0.95rem',
    fontWeight: '700',
    color: '#e11d48',
    marginBottom: '0.8rem',
  },
  memberBio: {
    fontSize: '0.85rem',
    lineHeight: '1.5',
    color: '#64748b',
    margin: 0,
  },
};