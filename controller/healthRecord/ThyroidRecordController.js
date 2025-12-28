const ThyroidRecordModel = require('../../models/healthRecord/ThyroidRecordModel');
const createHealthRecordController = require('./BaseHealthRecordController');

// Create controller using base factory
const baseController = createHealthRecordController(ThyroidRecordModel);

// Export base controller methods
// Add any thyroid-specific methods here if needed
module.exports = baseController;
