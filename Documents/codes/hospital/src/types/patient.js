/**
 * @typedef {Object} EmergencyContact
 * @property {string} name
 * @property {string} relationship
 * @property {string} phone
 */

/**
 * @typedef {Object} InsuranceDetails
 * @property {string} providerName
 * @property {string} policyNumber
 * @property {string} [groupNumber]
 * @property {'Active' | 'Pending' | 'Expired'} coverageStatus
 */

/**
 * @typedef {Object} Patient
 * @property {string} id
 * @property {string} fullName
 * @property {string} email
 * @property {string} phone
 * @property {string} dateOfBirth
 * @property {'Male' | 'Female' | 'Other'} gender
 * @property {'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'} bloodGroup
 * @property {string[]} [allergies]
 * @property {EmergencyContact} emergencyContact
 * @property {InsuranceDetails} [insuranceInfo]
 */

/**
 * @typedef {Object} PatientVitals
 * @property {string} patientId
 * @property {string} lastUpdated
 * @property {string} bloodPressure - e.g. "120/80 mmHg"
 * @property {number} heartRate - Beats per minute
 * @property {number} temperature - In Celsius
 * @property {number} weightKg
 */

export {};