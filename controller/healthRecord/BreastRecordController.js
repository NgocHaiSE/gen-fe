const BreastRecordModel = require('../../models/healthRecord/BreastRecordModel');
const createHealthRecordController = require('./BaseHealthRecordController');

// Create controller using base factory
const baseController = createHealthRecordController(BreastRecordModel);

// Export base controller methods
// Add any breast-specific methods here if needed
module.exports = baseController;
