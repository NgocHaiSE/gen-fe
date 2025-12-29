const express = require('express');
const router = express.Router();
const articleController = require('../controller/ArticleController');

// Get all available cancer types
router.get('/types', articleController.getAvailableTypes);

// Get articles by cancer type
// Supports: ?page=1&limit=10&search=keyword&category=1
router.get('/:type', articleController.getArticlesByType);

// Get single article by ID
router.get('/:type/:id', articleController.getArticleById);

module.exports = router;
