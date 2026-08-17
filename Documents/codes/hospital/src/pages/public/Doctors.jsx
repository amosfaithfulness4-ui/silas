import React, { useState } from 'react';

// Updated Doctors Data
const doctors = [
  {
    id: 'doc-1',
    name: 'Dr. Sarah Amos',
    title: 'Head Doctor',
    specialty: 'Chief of Medicine & Cardiology',
    experience: '21 years',
    rating: 4.9,
    reviewsCount: 310,
    availability: 'Available',
    nextSlot: 'Today 2:00 PM',
    education: 'MD, Johns Hopkins University School of Medicine',
    certifications: ['Board Certified — Cardiovascular Disease', 'Internal Medicine Master Specialist'],
    languages: 'English, Hausa',
    bio: 'Dr. Sarah leads the hospital with over two decades of clinical experience in cardiovascular health and internal medicine.',
    imageBg: '#e0f2fe',
    color: '#0284c7'
  },
  {
    id: 'doc-2',
    name: 'Dr. Gideon',
    title: 'Senior Specialist',
    specialty: 'General Surgery',
    experience: '17 years',
    rating: 4.8,
    reviewsCount: 195,
    availability: 'Available',
    nextSlot: 'Tomorrow 10:30 AM',
    education: 'MBBS, University of Ibadan College of Medicine',
    certifications: ['Board Certified — General Surgery', 'Advanced Trauma Life Support (ATLS)'],
    languages: 'English',
    bio: 'Specializing in minimally invasive surgical procedures, Dr. Gideon is dedicated to safe and efficient patient recoveries.',
    imageBg: '#f3e8ff',
    color: '#9333ea'
  },
  {
    id: 'doc-3',
    name: 'Dr. Yadat Johnas',
    title: 'Senior Specialist',
    specialty: 'Neurology',
    experience: '20 years',
    rating: 4.9,
    reviewsCount: 240,
    availability: 'Busy',
    nextSlot: 'Wed Aug 19',
    education: 'MD, Ahmadu Bello University Faculty of Medicine',
    certifications: ['Board Certified — Neurology', 'Vascular Neurology Subspecialty'],
    languages: 'English',
    bio: 'An expert in neurological disorders and stroke care, Dr. Yadat focuses on comprehensive brain and nerve health.',
    imageBg: '#dcfce7',
    color: '#16a34a'
  },
  {
    id: 'doc-4',
    name: 'Dr. Success',
    title: 'Consultant',
    specialty: 'Pediatrics',
    experience: '11 years',
    rating: 4.7,
    reviewsCount: 150,
    availability: 'Absent',
    nextSlot: 'Thu Aug 20',
    education: 'MD, University of Lagos College of Medicine',
    certifications: ['Board Certified — Pediatrics', 'Neonatal Intensive Care Certification'],
    languages: 'English',
    bio: 'Passionate about child health, Dr. Success provides compassionate care for infants, adolescents, and young adults.',
    imageBg: '#ffedd5',
    color: '#ea580c'
  },
  {
    id: 'doc-5',
    name: 'Dr. Emeka Okonkwo',
    title: 'Consultant',
    specialty: 'Orthopedics',
    experience: '14 years',
    rating: 4.8,
    reviewsCount: 180,
    availability: 'Available',
    nextSlot: 'Today 4:00 PM',
    education: 'MBBS, University of Nigeria Faculty of Medical Sciences',
    certifications: ['Board Certified — Orthopedic Surgery', 'Sports Medicine Fellowship'],
    languages: 'English, Igbo',
    bio: 'Focused on joint reconstruction and sports injury management, helping patients restore optimal mobility.',
    imageBg: '#e0f2fe',
    color: '#0284c7'
  },
  {
    id: 'doc-6',
    name: 'Dr. Folake Adebayo',
    title: 'Consultant',
    specialty: 'Obstetrics & Gynecology',
    experience: '16 years',
    rating: 4.9,
    reviewsCount: 220,
    availability: 'Busy',
    nextSlot: 'Tomorrow 9:00 AM',
    education: 'MD, Obafemi Awolowo University College of Health Sciences',
    certifications: ['Board Certified — Obstetrics & Gynecology', 'Maternal-Fetal Medicine Subspecialty'],
    languages: 'English, Yoruba',
    bio: 'Dedicated to women’s health, maternity wellness, and providing personalized prenatal care for mothers.',
    imageBg: '#f3e8ff',
    color: '#9333ea'
  },
  {
    id: 'doc-7',
    name: 'Dr. Fatima Hamsat',
    title: 'Specialist',
    specialty: 'Dermatology',
    experience: '10 years',
    rating: 4.8,
    reviewsCount: 130,
    availability: 'Available',
    nextSlot: 'Today 3:30 PM',
    education: 'MBBS, Bayero University Kano',
    certifications: ['Board Certified — Dermatology', 'Cosmetic and Clinical Dermatology Fellowship'],
    languages: 'English, Hausa',
    bio: 'Specializing in advanced clinical dermatology and therapeutic skin care solutions.',
    imageBg: '#dcfce7',
    color: '#16a34a'
  },
  {
    id: 'doc-8',
    name: 'Dr. Samuel Nkanta',
    title: 'Senior Specialist',
    specialty: 'Internal Medicine',
    experience: '15 years',
    rating: 4.9,
    reviewsCount: 205,
    availability: 'Busy',
    nextSlot: 'Tomorrow 11:00 AM',
    education: 'MD, University of Uyo Faculty of Medicine',
    certifications: ['Board Certified — Internal Medicine', 'Endocrinology Subspecialty'],
    languages: 'English',
    bio: 'Focused on diagnosing and managing complex chronic illnesses in adult patients.',
    imageBg: '#ffedd5',
    color: '#ea580c'
  },
  {
    id: 'doc-9',
    name: 'Dr. Joseph Habila',
    title: 'Consultant',
    specialty: 'Urology',
    experience: '13 years',
    rating: 4.7,
    reviewsCount: 115,
    availability: 'Absent',
    nextSlot: 'Fri Aug 21',
    education: 'MBBS, University of Jos Faculty of Medical Sciences',
    certifications: ['Board Certified — Urology', 'Minimally Invasive Urological Surgery'],
    languages: 'English',
    bio: 'Dedicated to surgical and medical treatments of urinary-tract system disorders.',
    imageBg: '#e0f2fe',
    color: '#0284c7'
  },
  {
    id: 'doc-10',
    name: 'Dr. Yohnnana Musa',
    title: 'Specialist',
    specialty: 'Ophthalmology',
    experience: '12 years',
    rating: 4.8,
    reviewsCount: 145,
    availability: 'Available',
    nextSlot: 'Today 1:00 PM',
    education: 'MD, Abubakar Tafawa Balewa University',
    certifications: ['Board Certified — Ophthalmology', 'Laser Eye Surgery Specialist'],
    languages: 'English, Hausa',
    bio: 'Expert in comprehensive eye care, vision testing, and corrective procedures.',
    imageBg: '#f3e8ff',
    color: '#9333ea'
  },
  {
    id: 'doc-11',
    name: 'Dr. David James',
    title: 'Consultant',
    specialty: 'Radiology',
    experience: '18 years',
    rating: 4.9,
    reviewsCount: 260,
    availability: 'Busy',
    nextSlot: 'Tomorrow 2:00 PM',
    education: 'MBBS, University of Calabar College of Medicine',
    certifications: ['Board Certified — Diagnostic Radiology', 'Neuroradiology Fellowship'],
    languages: 'English',
    bio: 'Specializing in diagnostic imaging techniques, ultrasound, and advanced medical scans.',
    imageBg: '#dcfce7',
    color: '#16a34a'
  }
];

// Doctor Card Component
function DoctorCard({ doctor, onViewProfile, onBookNow }) {
  const getAvailabilityStyle = (status) => {
    switch (status) {
      case 'Available':
        return { bg: '#dcfce7', color: '#16a34a' };
      case 'Busy':
        return { bg: '#fef3c7', color: '#b45309' };
      default:
        return { bg: '#fee2e2', color: '#dc2626' };
    }
  };

  const badge = getAvailabilityStyle(doctor.availability);

  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      border: '1px solid #e2e8f0',
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '100%',
      maxWidth: '320px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      boxSizing: 'border-box'
    }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            backgroundColor: doctor.imageBg,
            color: doctor.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '800',
            fontSize: '1.5rem'
          }}>
            {doctor.name.split(' ')[1] ? doctor.name.split(' ')[1][0] : 'D'}
          </div>
          <span style={{
            fontSize: '0.7rem',
            fontWeight: '700',
            color: badge.color,
            backgroundColor: badge.bg,
            padding: '0.25rem 0.6rem',
            borderRadius: '9999px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            {doctor.availability} ({doctor.nextSlot})
          </span>
        </div>

        <span style={{
          fontSize: '0.75rem',
          fontWeight: '700',
          color: doctor.color,
          backgroundColor: doctor.imageBg,
          padding: '0.25rem 0.6rem',
          borderRadius: '9999px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {doctor.specialty}
        </span>
        <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#102a43', margin: '0.5rem 0 0.25rem 0' }}>
          {doctor.name}
        </h3>
        <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0 0 0.75rem 0', fontWeight: '600' }}>{doctor.title}</p>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#334155', margin: '0.25rem 0' }}>
          <span>⭐</span> <strong>{doctor.rating}</strong> <span style={{ color: '#64748b', fontSize: '0.8rem' }}>({doctor.reviewsCount} reviews)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#334155', margin: '0.25rem 0' }}>
          <span>🕒</span> {doctor.experience} Experience
        </div>
        <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.75rem', lineHeight: '1.4' }}>
          <strong>Languages:</strong> {doctor.languages}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem' }}>
        <button
          onClick={() => onViewProfile(doctor)}
          style={{
            flex: 1,
            backgroundColor: '#f1f5f9',
            color: '#334155',
            border: 'none',
            padding: '0.6rem',
            borderRadius: '10px',
            fontSize: '0.85rem',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          View Profile
        </button>
        <button
          onClick={() => onBookNow(doctor)}
          style={{
            flex: 1,
            backgroundColor: '#1B4360',
            color: '#ffffff',
            border: 'none',
            padding: '0.6rem',
            borderRadius: '10px',
            fontSize: '0.85rem',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          Book Visit
        </button>
      </div>
    </div>
  );
}

// Doctor Profile Modal
function DoctorProfileModal({ doctor, onClose, onOpenBooking }) {
  if (!doctor) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        maxWidth: '550px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '2rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        boxSizing: 'border-box'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            backgroundColor: doctor.imageBg,
            color: doctor.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '800',
            fontSize: '1.5rem',
            flexShrink: 0
          }}>
            {doctor.name.split(' ')[1] ? doctor.name.split(' ')[1][0] : 'D'}
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: doctor.color, backgroundColor: doctor.imageBg, padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
              {doctor.specialty}
            </span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#102a43', margin: '0.25rem 0 0 0' }}>
              {doctor.name}
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0, fontWeight: '600' }}>{doctor.title} • {doctor.experience}</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem', fontSize: '0.9rem', color: '#334155' }}>
          <div><strong>Education:</strong> <span style={{ color: '#64748b' }}>{doctor.education}</span></div>
          <div><strong>Certifications:</strong>
            <ul style={{ margin: '0.25rem 0 0 1.2rem', padding: 0, color: '#64748b' }}>
              {doctor.certifications.map((cert, idx) => (
                <li key={idx}>{cert}</li>
              ))}
            </ul>
          </div>
          <div><strong>Languages:</strong> <span style={{ color: '#64748b' }}>{doctor.languages}</span></div>
          <div><strong>Next Available Slot:</strong> <span style={{ color: '#0284c7', fontWeight: '700' }}>{doctor.nextSlot}</span></div>
          <div><strong>Rating:</strong> ⭐ {doctor.rating} ({doctor.reviewsCount} reviews)</div>
          <div><strong>Biography:</strong> <p style={{ color: '#64748b', margin: '0.25rem 0 0 0', lineHeight: '1.5' }}>{doctor.bio}</p></div>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              backgroundColor: '#f1f5f9',
              color: '#334155',
              border: 'none',
              padding: '0.75rem',
              borderRadius: '12px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenBooking(doctor);
            }}
            style={{
              flex: 1,
              backgroundColor: '#1B4360',
              color: '#ffffff',
              border: 'none',
              padding: '0.75rem',
              borderRadius: '12px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}

// Book Appointment Modal
function BookAppointmentModal({ doctor, onClose, onSubmit, defaultPatientName }) {
  const [formData, setFormData] = useState({
    patientName: defaultPatientName || '',
    email: '',
    phone: '',
    date: '',
    timeSlot: '09:00 AM - 10:00 AM',
    notes: ''
  });

  if (!doctor) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      id: Date.now()
    });
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        maxWidth: '500px',
        width: '100%',
        padding: '2rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        boxSizing: 'border-box'
      }}>
        <div style={{ marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#1B4360', backgroundColor: '#e0f2fe', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
            Appointment Booking
          </span>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#102a43', margin: '0.25rem 0 0 0' }}>
            Book with {doctor.name}
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>{doctor.specialty} • Recommended Slot: {doctor.nextSlot}</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '0.3rem' }}>Full Name</label>
            <input
              type="text"
              required
              value={formData.patientName}
              onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
              placeholder="e.g. John Doe"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '0.3rem' }}>Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '0.3rem' }}>Phone Number</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '0.3rem' }}>Preferred Date</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '0.3rem' }}>Time Slot</label>
              <select
                value={formData.timeSlot}
                onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.9rem', backgroundColor: '#fff', boxSizing: 'border-box' }}
              >
                <option>09:00 AM - 10:00 AM</option>
                <option>10:30 AM - 11:30 AM</option>
                <option>01:00 PM - 02:00 PM</option>
                <option>03:00 PM - 04:00 PM</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '0.3rem' }}>Medical Notes / Symptoms</label>
            <textarea
              rows="3"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Briefly describe your symptoms or reason for visit..."
              style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box', resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                backgroundColor: '#f1f5f9',
                color: '#334155',
                border: 'none',
                padding: '0.75rem',
                borderRadius: '12px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                flex: 1,
                backgroundColor: '#1B4360',
                color: '#ffffff',
                border: 'none',
                padding: '0.75rem',
                borderRadius: '12px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Patient Portal Login Component
function PatientPortalLogin({ onSuccessfulLogin }) {
  const [formData, setFormData] = useState({
    firstName: 'Faithfulness',
    lastName: '',
    dob: '',
    bloodType: 'A+',
    email: 'faithfulness@example.com',
    password: 'password123',
    phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      onSuccessfulLogin({
        ...formData,
        patientId: 'SCM-2024-00847'
      });
    }
  };

  return (
    <div style={{ maxWidth: '650px', margin: '2rem auto', backgroundColor: '#ffffff', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)', padding: '2.5rem', boxSizing: 'border-box' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '900', color: '#102a43', margin: '0 0 0.5rem 0', letterSpacing: '-0.5px' }}>
          Patient Portal Sign In
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>
          Access your health records, appointments, and test results securely.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '0.4rem' }}>First Name</label>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.95rem', backgroundColor: '#f8fafc', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '0.4rem' }}>Last Name</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              placeholder="e.g. Doe"
              style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.95rem', backgroundColor: '#f8fafc', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '0.4rem' }}>Email Address</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.95rem', backgroundColor: '#f8fafc', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '0.4rem' }}>Secure Password</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.95rem', backgroundColor: '#f8fafc', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            backgroundColor: '#1B4360',
            color: '#ffffff',
            border: 'none',
            padding: '1rem',
            borderRadius: '16px',
            fontSize: '1rem',
            fontWeight: '800',
            cursor: 'pointer',
            marginTop: '1rem',
            boxShadow: '0 4px 6px -1px rgba(27, 67, 96, 0.2)'
          }}
        >
          Sign In to Portal
        </button>
      </form>
    </div>
  );
}

// Signed-In Patient Portal Dashboard
function PatientPortalDashboard({ user, appointments, onSignOut, onOpenBookModal, initialTab = 'overview' }) {
  const [portalTab, setPortalTab] = useState(initialTab);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
      {/* Top Header */}
      <header style={{ backgroundColor: '#1B4360', color: '#ffffff', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '44px', height: '44px', backgroundColor: '#ea580c', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '1.2rem', color: '#ffffff' }}>
            {user.firstName ? user.firstName[0] : 'F'}
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', margin: 0 }}>Welcome back, {user.firstName || 'Faithfulness'}</h2>
            <p style={{ fontSize: '0.8rem', color: '#cbd5e1', margin: 0 }}>Patient ID: {user.patientId || 'SCM-2024-00847'}</p>
          </div>
        </div>
        <button
          onClick={onSignOut}
          style={{
            backgroundColor: '#ea580c',
            color: '#ffffff',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            fontWeight: '700',
            fontSize: '0.85rem',
            cursor: 'pointer'
          }}
        >
          Sign Out
        </button>
      </header>

      {/* Main Layout Container */}
      <div style={{ display: 'flex', flex: 1, maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '2rem 1rem', gap: '2rem', boxSizing: 'border-box' }}>
        {/* Left Sidebar */}
        <aside style={{ width: '240px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button
            onClick={() => setPortalTab('overview')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              backgroundColor: portalTab === 'overview' ? '#1B4360' : '#ffffff',
              color: portalTab === 'overview' ? '#ffffff' : '#334155',
              border: portalTab === 'overview' ? 'none' : '1px solid #e2e8f0',
              padding: '0.85rem 1rem',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '0.9rem',
              cursor: 'pointer',
              textAlign: 'left',
              boxShadow: portalTab === 'overview' ? '0 4px 6px -1px rgba(27, 67, 96, 0.2)' : 'none'
            }}
          >
            <span>🏠</span> Overview
          </button>
          <button
            onClick={() => setPortalTab('appointments')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              backgroundColor: portalTab === 'appointments' ? '#1B4360' : '#ffffff',
              color: portalTab === 'appointments' ? '#ffffff' : '#334155',
              border: portalTab === 'appointments' ? 'none' : '1px solid #e2e8f0',
              padding: '0.85rem 1rem',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '0.9rem',
              cursor: 'pointer',
              textAlign: 'left',
              boxShadow: portalTab === 'appointments' ? '0 4px 6px -1px rgba(27, 67, 96, 0.2)' : 'none'
            }}
          >
            <span>📅</span> Appointments ({appointments.length})
          </button>
          <button
            onClick={() => setPortalTab('profile')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              backgroundColor: portalTab === 'profile' ? '#1B4360' : '#ffffff',
              color: portalTab === 'profile' ? '#ffffff' : '#334155',
              border: portalTab === 'profile' ? 'none' : '1px solid #e2e8f0',
              padding: '0.85rem 1rem',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '0.9rem',
              cursor: 'pointer',
              textAlign: 'left',
              boxShadow: portalTab === 'profile' ? '0 4px 6px -1px rgba(27, 67, 96, 0.2)' : 'none'
            }}
          >
            <span>👤</span> My Profile
          </button>
        </aside>

        {/* Right Content View */}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {portalTab === 'overview' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.75rem', fontWeight: '900', color: '#102a43', margin: '0 0 0.25rem 0', letterSpacing: '-0.5px' }}>Health Overview</h2>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>Here is your personal health summary and active schedule.</p>
                </div>
                <button
                  onClick={onOpenBookModal}
                  style={{
                    backgroundColor: '#ea580c',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.75rem 1.25rem',
                    borderRadius: '10px',
                    fontWeight: '700',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px -1px rgba(234, 88, 12, 0.2)'
                  }}
                >
                  + Book Appointment
                </button>
              </div>

              {/* Visits Summary Card */}
              <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem' }}>Visits</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '48px', height: '48px', backgroundColor: '#e0f2fe', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>
                    📅
                  </div>
                  <div>
                    <div style={{ fontSize: '1.75rem', fontWeight: '900', color: '#102a43', lineHeight: '1' }}>{appointments.length} Scheduled</div>
                    <div style={{ fontSize: '0.85rem', color: '#0284c7', fontWeight: '700', marginTop: '0.2rem' }}>Active Schedule</div>
                  </div>
                </div>
              </div>

              {/* Next Scheduled Appointment Box */}
              <div style={{ backgroundColor: '#1B4360', borderRadius: '16px', padding: '2rem', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 10px 15px -3px rgba(27, 67, 96, 0.2)' }}>
                <div>
                  <span style={{ fontSize: '0.7rem', fontWeight: '800', backgroundColor: 'rgba(255,255,255,0.15)', padding: '0.25rem 0.6rem', borderRadius: '9999px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Next Scheduled Appointment
                  </span>
                  {appointments.length > 0 ? (
                    <div style={{ marginTop: '0.75rem' }}>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '800', margin: '0 0 0.25rem 0' }}>{appointments[0].doctorName} ({appointments[0].specialty})</h3>
                      <p style={{ fontSize: '0.9rem', color: '#cbd5e1', margin: 0 }}>Date: {appointments[0].date} | Time: {appointments[0].timeSlot}</p>
                    </div>
                  ) : (
                    <div style={{ marginTop: '0.75rem' }}>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '800', margin: '0 0 0.25rem 0' }}>No Upcoming Appointments</h3>
                      <p style={{ fontSize: '0.9rem', color: '#cbd5e1', margin: 0 }}>You have no visits scheduled right now. Select a doctor to book a consultation.</p>
                    </div>
                  )}
                </div>
                <button
                  onClick={onOpenBookModal}
                  style={{
                    backgroundColor: '#ea580c',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.75rem 1.25rem',
                    borderRadius: '10px',
                    fontWeight: '700',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  + Schedule Now
                </button>
              </div>
            </div>
          )}

          {portalTab === 'appointments' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: '900', color: '#102a43', margin: 0 }}>Your Appointments</h2>
                <button
                  onClick={onOpenBookModal}
                  style={{
                    backgroundColor: '#ea580c',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.6rem 1rem',
                    borderRadius: '8px',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  + Book New Appointment
                </button>
              </div>
              {appointments.length === 0 ? (
                <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '2.5rem', textAlign: 'center', border: '1px solid #e2e8f0' }}>
                  <p style={{ color: '#64748b', margin: '0 0 1rem 0' }}>You do not have any appointments booked yet.</p>
                  <button onClick={onOpenBookModal} style={{ backgroundColor: '#1B4360', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}>
                    Find a Doctor & Book
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {appointments.map((appt) => (
                    <div key={appt.id} style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '1.5rem', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#0284c7', backgroundColor: '#e0f2fe', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>{appt.specialty}</span>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#102a43', margin: '0.4rem 0 0.2rem 0' }}>{appt.doctorName}</h3>
                        <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>📅 {appt.date} • 🕒 {appt.timeSlot}</p>
                        {appt.notes && <p style={{ fontSize: '0.85rem', color: '#334155', marginTop: '0.5rem' }}><strong>Notes:</strong> {appt.notes}</p>}
                      </div>
                      <span style={{ backgroundColor: '#dcfce7', color: '#16a34a', padding: '0.3rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '700' }}>Confirmed</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {portalTab === 'profile' && (
            <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#102a43', margin: '0 0 1.5rem 0' }}>Patient Profile</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', fontSize: '0.95rem', color: '#334155' }}>
                <div><strong>Full Name:</strong> <p style={{ color: '#64748b', margin: '0.2rem 0 0 0' }}>{user.firstName} {user.lastName || ''}</p></div>
                <div><strong>Patient ID:</strong> <p style={{ color: '#64748b', margin: '0.2rem 0 0 0' }}>{user.patientId || 'SCM-2024-00847'}</p></div>
                <div><strong>Email Address:</strong> <p style={{ color: '#64748b', margin: '0.2rem 0 0 0' }}>{user.email}</p></div>
                <div><strong>Blood Type:</strong> <p style={{ color: '#64748b', margin: '0.2rem 0 0 0' }}>{user.bloodType || 'A+'}</p></div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('doctors');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedDoctorForProfile, setSelectedDoctorForProfile] = useState(null);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [portalInitialTab, setPortalInitialTab] = useState('overview');

  const specialties = ['All', 'Chief of Medicine & Cardiology', 'General Surgery', 'Neurology', 'Pediatrics', 'Orthopedics', 'Obstetrics & Gynecology', 'Dermatology', 'Internal Medicine', 'Urology', 'Ophthalmology', 'Radiology'];

  const filteredDoctors = selectedSpecialty === 'All' 
    ? doctors 
    : doctors.filter(doc => doc.specialty === selectedSpecialty);

  const handleBookingSubmit = (newAppt) => {
    setAppointments([newAppt, ...appointments]);
    
    // If user wasn't logged in, log them in automatically so they have a portal account
    const currentUser = loggedInUser || {
      firstName: newAppt.patientName.split(' ')[0] || 'Patient',
      lastName: newAppt.patientName.split(' ').slice(1).join(' ') || '',
      email: newAppt.email,
      patientId: 'SCM-2024-00847',
      bloodType: 'A+'
    };

    setLoggedInUser(currentUser);
    setPortalInitialTab('appointments'); // Direct them right to the appointments tab
    setActiveTab('portal');
    alert(`Appointment successfully booked with ${newAppt.doctorName} for ${newAppt.date}!`);
  };

  // If user is signed in, render the dashboard
  if (loggedInUser && activeTab === 'portal') {
    return (
      <>
        <PatientPortalDashboard
          user={loggedInUser}
          appointments={appointments}
          onSignOut={() => {
            setLoggedInUser(null);
            setActiveTab('doctors');
          }}
          onOpenBookModal={() => setActiveTab('doctors')}
          initialTab={portalInitialTab}
        />

        {/* Modals */}
        <DoctorProfileModal
          doctor={selectedDoctorForProfile}
          onClose={() => setSelectedDoctorForProfile(null)}
          onOpenBooking={(doc) => setSelectedDoctorForBooking(doc)}
        />

        <BookAppointmentModal
          doctor={selectedDoctorForBooking}
          onClose={() => setSelectedDoctorForBooking(null)}
          onSubmit={handleBookingSubmit}
          defaultPatientName={loggedInUser ? `${loggedInUser.firstName} ${loggedInUser.lastName || ''}`.trim() : ''}
        />
      </>
    );
  }

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#fcfbf9', minHeight: '100vh', color: '#102a43', margin: 0, padding: 0 }}>
      {/* Header */}
      <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '40px', height: '40px', backgroundColor: '#1B4360', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '900', fontSize: '1.2rem' }}>
            SC
          </div>
          <div>
            <h1 style={{ fontSize: '1.15rem', fontWeight: '900', margin: 0, color: '#102a43', letterSpacing: '-0.3px' }}>Sarah Care Medical Hub</h1>
            <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0, fontWeight: '600' }}>Excellence in Healthcare</p>
          </div>
        </div>

        <nav style={{ display: 'flex', gap: '0.5rem', backgroundColor: '#f1f5f9', padding: '0.3rem', borderRadius: '12px' }}>
          <button
            onClick={() => setActiveTab('doctors')}
            style={{
              backgroundColor: activeTab === 'doctors' ? '#1B4360' : 'transparent',
              color: activeTab === 'doctors' ? '#ffffff' : '#334155',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '9px',
              fontWeight: '700',
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Find Doctors
          </button>
          <button
            onClick={() => {
              setActiveTab('portal');
              setPortalInitialTab('overview');
            }}
            style={{
              backgroundColor: activeTab === 'portal' ? '#1B4360' : 'transparent',
              color: activeTab === 'portal' ? '#ffffff' : '#334155',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '9px',
              fontWeight: '700',
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Patient Portal
          </button>
        </nav>
      </header>

      {/* Main Content Area */}
      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', boxSizing: 'border-box' }}>
        {activeTab === 'doctors' && (
          <div>
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: '900', margin: '0 0 0.5rem 0', letterSpacing: '-0.5px' }}>Our Expert Medical Team</h2>
              <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>Browse our specialized consultants and book your consultation session.</p>
            </div>

            {/* Specialty Filters */}
            <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '2rem' }}>
              {specialties.map((spec, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSpecialty(spec)}
                  style={{
                    backgroundColor: selectedSpecialty === spec ? '#1B4360' : '#ffffff',
                    color: selectedSpecialty === spec ? '#ffffff' : '#334155',
                    border: '1px solid #cbd5e1',
                    padding: '0.5rem 1rem',
                    borderRadius: '9999px',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                  }}
                >
                  {spec}
                </button>
              ))}
            </div>

            {/* Doctors Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', justifyContent: 'center' }}>
              {filteredDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  onViewProfile={(doc) => setSelectedDoctorForProfile(doc)}
                  onBookNow={(doc) => setSelectedDoctorForBooking(doc)}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'portal' && (
          <PatientPortalLogin
            onSuccessfulLogin={(user) => {
              setLoggedInUser(user);
              setPortalInitialTab('overview');
            }}
          />
        )}
      </main>

      {/* Modals */}
      <DoctorProfileModal
        doctor={selectedDoctorForProfile}
        onClose={() => setSelectedDoctorForProfile(null)}
        onOpenBooking={(doc) => setSelectedDoctorForBooking(doc)}
      />

      <BookAppointmentModal
        doctor={selectedDoctorForBooking}
        onClose={() => setSelectedDoctorForBooking(null)}
        onSubmit={handleBookingSubmit}
        defaultPatientName={loggedInUser ? `${loggedInUser.firstName} ${loggedInUser.lastName || ''}`.trim() : ''}
      />
    </div>
  );
}