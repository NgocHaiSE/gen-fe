const ColorectalRecordModel = require('../../models/healthRecord/ColorectalRecordModel');
const createHealthRecordController = require('./BaseHealthRecordController');

// Create controller using base factory
const baseController = createHealthRecordController(ColorectalRecordModel);

// Export base controller methods
// Override getByIdentID for colorectal-specific docx generation if needed
module.exports = baseController;

// Note: If you need the docx generation functionality, you can override like this:
// const fs = require('fs');
// const path = require('path');
// const PizZip = require('pizzip');
// const Docxtemplater = require('docxtemplater');
//
// module.exports = {
//     ...baseController,
//     getByIdentID: async (req, res) => {
//         // Custom docx generation logic here
//     }
// };
