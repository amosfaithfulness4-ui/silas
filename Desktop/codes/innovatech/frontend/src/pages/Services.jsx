import React, { useEffect, useState } from 'react';
import { getServices } from '../api';
import ServiceCard from '../components/ServiceCard';

const fallbackServices = [
  { id: 1, title: 'Computer Repair & Maintenance', description: 'Diagnostic checks, component replacement, upgrades, and performance tune-ups for desktops and laptops.', icon_name: 'Repair' },
  { id: 2, title: 'Computer Sales & Procurement', description: 'Professional computer and laptop sales with curated configurations for business, education, and gaming.', icon_name: 'Sales' },
  { id: 3, title: 'Custom PC Builds', description: 'Builds for gaming, business, education, and home office use with quality parts and expert assembly.', icon_name: 'Build' },
  { id: 4, title: 'Cyber Café Internet Access', description: 'High-speed Wi-Fi, desktop stations, and secure browsing for students, remote workers, and travelers.', icon_name: 'Internet' },
  { id: 5, title: 'Printing, Scanning & Typing', description: 'Document printing, scanning, photocopying, and typing services for school projects, business forms, and reports.', icon_name: 'Print' },
  { id: 6, title: 'Software Installation & Troubleshooting', description: 'Installation, updates, virus cleanup, and software configuration across Windows and common productivity tools.', icon_name: 'Software' },
  { id: 7, title: 'Network Setup & Security', description: 'Router setup, Wi-Fi optimization, firewall configuration, and secure local network support for homes and small offices.', icon_name: 'Network' },
];

export default function Services() {
  const [services, setServices] = useState(fallbackServices);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServices()
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setServices(res.data);
        }
      })
      .catch((err) => console.error('Error fetching services:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={styles.container}>
      <h2>Our Services</h2>
      <p>At Inovatech we offer the full range of computer shop and cyber café services designed to help individuals, students, businesses, and managers stay productive.</p>
      {loading ? (
        <p>Loading services...</p>
      ) : (
        <div style={styles.grid}>
          {services.map((item) => (
            <ServiceCard 
              key={item.id} 
              title={item.title} 
              description={item.description} 
              iconName={item.icon_name || item.iconName}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: '2rem', maxWidth: '1000px', margin: '0 auto' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }
};