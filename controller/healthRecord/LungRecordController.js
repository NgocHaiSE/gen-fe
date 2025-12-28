const LungRecordModel = require('../../models/healthRecord/LungRecordModel');
const createHealthRecordController = require('./BaseHealthRecordController');

// Create controller using base factory
const baseController = createHealthRecordController(LungRecordModel);

// Export base controller methods
// Add any lung-specific methods here if needed
module.exports = baseController;
