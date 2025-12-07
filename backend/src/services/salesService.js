const Sale = require('../models/Sale');

class SalesService {

  async getSales(params) {
    const {
      search = '',
      regions = [],
      genders = [],
      ageMin,
      ageMax,
      categories = [],
      tags = [],
      paymentMethods = [],
      dateFrom,
      dateTo,
      sortBy = 'date',
      sortOrder = 'desc',
      page = 1,
      limit = 10
    } = params;

    const query = {};

    if (search && search.trim() !== '') {
      query.$text = { $search: search.trim() };
    }

    if (regions.length > 0) {
      query.customerRegion = { $in: regions };
    }

    if (genders.length > 0) {
      query.gender = { $in: genders };
    }

    if (ageMin !== undefined || ageMax !== undefined) {
      query.age = {};
      if (ageMin !== undefined) query.age.$gte = parseInt(ageMin);
      if (ageMax !== undefined) query.age.$lte = parseInt(ageMax);
    }

    if (categories.length > 0) {
      query.productCategory = { $in: categories };
    }

    if (tags.length > 0) {
      query.tags = { $in: tags };
    }

    if (paymentMethods.length > 0) {
      query.paymentMethod = { $in: paymentMethods };
    }

    if (dateFrom || dateTo) {
      query.date = {};
      if (dateFrom) query.date.$gte = new Date(dateFrom);
      if (dateTo) query.date.$lte = new Date(dateTo);
    }

    const sortOptions = {};
    switch (sortBy) {
      case 'date':
        sortOptions.date = sortOrder === 'asc' ? 1 : -1;
        break;
      case 'quantity':
        sortOptions.quantity = sortOrder === 'asc' ? 1 : -1;
        break;
      case 'customerName':
        sortOptions.customerName = sortOrder === 'asc' ? 1 : -1;
        break;
      default:
        sortOptions.date = -1;
    }

    const skip = (page - 1) * limit;

    const [sales, totalCount] = await Promise.all([
      Sale.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Sale.countDocuments(query)
    ]);

    return {
      sales,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalCount / limit),
        totalItems: totalCount,
        itemsPerPage: parseInt(limit),
        hasNextPage: page * limit < totalCount,
        hasPrevPage: page > 1
      }
    };
  }


  async getFilterOptions() {
    const [regions, genders, categories, tags, paymentMethods] = await Promise.all([
      Sale.distinct('customerRegion'),
      Sale.distinct('gender'),
      Sale.distinct('productCategory'),
      Sale.distinct('tags'),
      Sale.distinct('paymentMethod')
    ]);

    return {
      regions: regions.sort(),
      genders: genders.sort(),
      categories: categories.sort(),
      tags: tags.sort(),
      paymentMethods: paymentMethods.sort()
    };
  }


  async getStatistics(filters = {}) {
    const query = this._buildFilterQuery(filters);

    const stats = await Sale.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          totalSales: { $sum: 1 },
          totalRevenue: { $sum: '$finalAmount' },
          averageOrderValue: { $avg: '$finalAmount' },
          totalQuantity: { $sum: '$quantity' }
        }
      }
    ]);

    return stats[0] || {
      totalSales: 0,
      totalRevenue: 0,
      averageOrderValue: 0,
      totalQuantity: 0
    };
  }

  _buildFilterQuery(filters) {
    const query = {};
    
    if (filters.regions?.length) query.customerRegion = { $in: filters.regions };
    if (filters.genders?.length) query.gender = { $in: filters.genders };
    if (filters.categories?.length) query.productCategory = { $in: filters.categories };
    if (filters.tags?.length) query.tags = { $in: filters.tags };
    if (filters.paymentMethods?.length) query.paymentMethod = { $in: filters.paymentMethods };
    
    if (filters.ageMin || filters.ageMax) {
      query.age = {};
      if (filters.ageMin) query.age.$gte = parseInt(filters.ageMin);
      if (filters.ageMax) query.age.$lte = parseInt(filters.ageMax);
    }
    
    if (filters.dateFrom || filters.dateTo) {
      query.date = {};
      if (filters.dateFrom) query.date.$gte = new Date(filters.dateFrom);
      if (filters.dateTo) query.date.$lte = new Date(filters.dateTo);
    }

    return query;
  }
}

module.exports = new SalesService();