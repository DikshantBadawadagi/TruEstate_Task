const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  /**
   * Fetch sales data with filters, search, sort, pagination
   */
  async getSales(params) {
    const queryParams = new URLSearchParams();

    // Add all parameters to query string
    if (params.search) queryParams.append('search', params.search);
    if (params.regions?.length) queryParams.append('regions', params.regions.join(','));
    if (params.genders?.length) queryParams.append('genders', params.genders.join(','));
    if (params.ageMin) queryParams.append('ageMin', params.ageMin);
    if (params.ageMax) queryParams.append('ageMax', params.ageMax);
    if (params.categories?.length) queryParams.append('categories', params.categories.join(','));
    if (params.tags?.length) queryParams.append('tags', params.tags.join(','));
    if (params.paymentMethods?.length) queryParams.append('paymentMethods', params.paymentMethods.join(','));
    if (params.dateFrom) queryParams.append('dateFrom', params.dateFrom);
    if (params.dateTo) queryParams.append('dateTo', params.dateTo);
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);

    const response = await fetch(`${API_BASE_URL}/sales?${queryParams}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch sales data');
    }

    return response.json();
  }

  /**
   * Fetch filter options
   */
  async getFilterOptions() {
    const response = await fetch(`${API_BASE_URL}/sales/filters`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch filter options');
    }

    return response.json();
  }

  /**
   * Fetch statistics
   */
  async getStatistics(filters) {
    const queryParams = new URLSearchParams();

    if (filters.regions?.length) queryParams.append('regions', filters.regions.join(','));
    if (filters.genders?.length) queryParams.append('genders', filters.genders.join(','));
    if (filters.ageMin) queryParams.append('ageMin', filters.ageMin);
    if (filters.ageMax) queryParams.append('ageMax', filters.ageMax);
    if (filters.categories?.length) queryParams.append('categories', filters.categories.join(','));
    if (filters.tags?.length) queryParams.append('tags', filters.tags.join(','));
    if (filters.paymentMethods?.length) queryParams.append('paymentMethods', filters.paymentMethods.join(','));
    if (filters.dateFrom) queryParams.append('dateFrom', filters.dateFrom);
    if (filters.dateTo) queryParams.append('dateTo', filters.dateTo);

    const response = await fetch(`${API_BASE_URL}/sales/statistics?${queryParams}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch statistics');
    }

    return response.json();
  }
}

export default new ApiService();