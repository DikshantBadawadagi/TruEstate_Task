const salesService = require('../services/salesService');

class SalesController {
  /**
   * GET /api/sales
   * Get sales with search, filters, sorting, pagination
   */
  async getSales(req, res) {
    try {
      const params = {
        search: req.query.search,
        regions: req.query.regions ? req.query.regions.split(',') : [],
        genders: req.query.genders ? req.query.genders.split(',') : [],
        ageMin: req.query.ageMin,
        ageMax: req.query.ageMax,
        categories: req.query.categories ? req.query.categories.split(',') : [],
        tags: req.query.tags ? req.query.tags.split(',') : [],
        paymentMethods: req.query.paymentMethods ? req.query.paymentMethods.split(',') : [],
        dateFrom: req.query.dateFrom,
        dateTo: req.query.dateTo,
        sortBy: req.query.sortBy || 'date',
        sortOrder: req.query.sortOrder || 'desc',
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10
      };

      const result = await salesService.getSales(params);

      res.status(200).json({
        success: true,
        data: result.sales,
        pagination: result.pagination
      });
    } catch (error) {
      console.error('Error fetching sales:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch sales data',
        error: error.message
      });
    }
  }

  /**
   * GET /api/sales/filters
   * Get available filter options
   */
  async getFilterOptions(req, res) {
    try {
      const options = await salesService.getFilterOptions();

      res.status(200).json({
        success: true,
        data: options
      });
    } catch (error) {
      console.error('Error fetching filter options:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch filter options',
        error: error.message
      });
    }
  }

  /**
   * GET /api/sales/statistics
   * Get sales statistics
   */
  async getStatistics(req, res) {
    try {
      const filters = {
        regions: req.query.regions ? req.query.regions.split(',') : [],
        genders: req.query.genders ? req.query.genders.split(',') : [],
        ageMin: req.query.ageMin,
        ageMax: req.query.ageMax,
        categories: req.query.categories ? req.query.categories.split(',') : [],
        tags: req.query.tags ? req.query.tags.split(',') : [],
        paymentMethods: req.query.paymentMethods ? req.query.paymentMethods.split(',') : [],
        dateFrom: req.query.dateFrom,
        dateTo: req.query.dateTo
      };

      const stats = await salesService.getStatistics(filters);

      res.status(200).json({
        success: true,
        data: stats
      });
    } catch (error) {
      console.error('Error fetching statistics:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch statistics',
        error: error.message
      });
    }
  }
}

module.exports = new SalesController();