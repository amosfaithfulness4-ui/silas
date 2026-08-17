/**
 * @typedef {'Cardiology' | 'Pediatrics' | 'Neurology' | 'Emergency Medicine' | 'Orthopedics' | 'Dermatology' | 'General Surgery'} MedicalSpecialty
 */

/**
 * @typedef {Object} TimeSlot
 * @property {string} id - Unique identifier for the slot
 * @property {string} startTime - e.g. "09:00 AM"
 * @property {string} endTime - e.g. "09:30 AM"
 * @property {boolean} isBooked - Slot availability status
 */

/**
 * @typedef {Object} DoctorAvailability
 * @property {'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'} dayOfWeek
 * @property {TimeSlot[]} timeSlots
 */

/**
 * @typedef {Object} Doctor
 * @property {string} id
 * @property {string} fullName
 * @property {MedicalSpecialty} specialty
 * @property {string} qualification - e.g. "MD, FACC"
 * @property {number} experienceYears
 * @property {string} avatarUrl
 * @property {string} bio
 * @property {string} department
 * @property {number} consultationFee
 * @property {DoctorAvailability[]} availability
 */

export const MEDICAL_SPECIALTIES = [
  'Cardiology',
  'Pediatrics',
  'Neurology',
  'Emergency Medicine',
  'Orthopedics',
  'Dermatology',
  'General Surgery',
];