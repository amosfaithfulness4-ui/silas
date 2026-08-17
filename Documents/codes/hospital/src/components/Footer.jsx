import React from 'react';

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Sarah Care Medical Hub. All rights reserved.</p>
      <p>123 Healthcare Ave, Medical District | Emergency Hotline: 1-800-555-7272</p>
    </footer>
  );
}

const styles = {
  footer: { textAlign: 'center', padding: '2rem', backgroundColor: '#134e4a', color: '#ffffff', marginTop: 'auto' }
};