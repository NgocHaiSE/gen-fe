const express = require('express');
const router = express.Router();
const testCaseController = require('../app/controllers/TestCaseController');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

// Optimized list endpoint with aggregation (use this instead of '/')
router.get('/list', testCaseController.getList);
router.get('/', testCaseController.findAPage);
router.get('/detail/:id', testCaseController.findByIDTest);
router.get('/detail', testCaseController.findAllTest);
router.get('/file-name', testCaseController.getFileName);
router.delete('/delete/:id', testCaseController.delete);
router.get('/find/:id', testCaseController.findByID);
router.post('/add', testCaseController.addTest);
router.put('/update-test', testCaseController.updateTest);
router.post('/add-result-test', testCaseController.addTestResult);
router.post('/download', testCaseController.download);

module.exports = router;
