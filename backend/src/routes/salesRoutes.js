const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();

// GET /api/sales - Get sales with filters, search, sort, pagination
router.get('/', salesController.getSales.bind(salesController));

// GET /api/sales/filters - Get available filter options
router.get('/filters', salesController.getFilterOptions.bind(salesController));

// GET /api/sales/statistics - Get sales statistics
router.get('/statistics', salesController.getStatistics.bind(salesController));

module.exports = router;