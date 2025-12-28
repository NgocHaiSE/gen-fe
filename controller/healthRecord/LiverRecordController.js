const LiverRecordModel = require('../../models/healthRecord/LiverRecordModel');
const createHealthRecordController = require('./BaseHealthRecordController');

// Create controller using base factory
const baseController = createHealthRecordController(LiverRecordModel);

// Export base controller methods
// Add any liver-specific methods here if needed
module.exports = baseController;
