/**
 * @typedef {'Scheduled' | 'Completed' | 'Cancelled' | 'In-Progress'} AppointmentStatus
 */

/**
 * @typedef {'In-Person' | 'Telehealth' | 'Emergency'} AppointmentType
 */

/**
 * @typedef {Object} Appointment
 * @property {string} id
 * @property {string} patientId
 * @property {string} patientName
 * @property {string} doctorId
 * @property {string} doctorName
 * @property {import('./doctor').MedicalSpecialty} specialty
 * @property {string} appointmentDate - ISO date string
 * @property {string} timeSlot
 * @property {AppointmentStatus} status
 * @property {AppointmentType} type
 * @property {string} reasonForVisit
 * @property {string} createdAt
 */

/**
 * @typedef {Object} CreateAppointmentPayload
 * @property {string} patientId
 * @property {string} doctorId
 * @property {string} appointmentDate
 * @property {string} timeSlotId
 * @property {string} reasonForVisit
 * @property {AppointmentType} type
 */

export const APPOINTMENT_STATUS = {
  SCHEDULED: 'Scheduled',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
  IN_PROGRESS: 'In-Progress',
};

export const APPOINTMENT_TYPES = {
  IN_PERSON: 'In-Person',
  TELEHEALTH: 'Telehealth',
  EMERGENCY: 'Emergency',
};