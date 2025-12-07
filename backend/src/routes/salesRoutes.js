const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.get('/', salesController.getSales.bind(salesController));

router.get('/filters', salesController.getFilterOptions.bind(salesController));

router.get('/statistics', salesController.getStatistics.bind(salesController));

module.exports = router;