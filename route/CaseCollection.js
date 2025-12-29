const express = require('express');
const router = express.Router();
const CaseCollectionController = require('../app/controllers/CaseCollectionController');

router.use(express.json());

// Quản lý collections
router.post('/create', CaseCollectionController.createCollection);
router.get('/my-collections', CaseCollectionController.getMyCollections);
router.get('/search', CaseCollectionController.searchCollections);
router.get('/:id', CaseCollectionController.getCollectionById);
router.put('/:id', CaseCollectionController.updateCollection);
router.delete('/:id', CaseCollectionController.deleteCollection);

// Quản lý test cases trong collection
router.post('/:id/add-case', CaseCollectionController.addTestCaseToCollection);
router.delete('/:id/remove-case/:testCaseId', CaseCollectionController.removeTestCaseFromCollection);
router.put('/:id/update-note/:testCaseId', CaseCollectionController.updateTestCaseNote);
router.post('/batch-add', CaseCollectionController.batchAddTestCases);

module.exports = router;
