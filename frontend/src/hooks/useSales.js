import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/apiService';

export const useSales = () => {
  const [sales, setSales] = useState([]);
  const [filterOptions, setFilterOptions] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filter and search state
  const [filters, setFilters] = useState({
    search: '',
    regions: [],
    genders: [],
    ageMin: '',
    ageMax: '',
    categories: [],
    tags: [],
    paymentMethods: [],
    dateFrom: '',
    dateTo: '',
    sortBy: 'date',
    sortOrder: 'desc',
    page: 1,
    limit: 10
  });

  // Stringify filters for stable comparison
  const filtersString = JSON.stringify(filters);

  // Fetch filter options on mount
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await apiService.getFilterOptions();
        setFilterOptions(response.data);
      } catch (err) {
        console.error('Error fetching filter options:', err);
      }
    };

    fetchFilterOptions();
  }, []);

  // Fetch sales data whenever filters change
  useEffect(() => {
    const fetchSales = async () => {
      setLoading(true);
      setError(null);

      try {
        const parsedFilters = JSON.parse(filtersString);
        const response = await apiService.getSales(parsedFilters);
        setSales(response.data);
        setPagination(response.pagination);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching sales:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersString]); // Only depend on the stringified version

  // Update individual filter
  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: key !== 'page' ? 1 : value
    }));
  }, []);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setFilters({
      search: '',
      regions: [],
      genders: [],
      ageMin: '',
      ageMax: '',
      categories: [],
      tags: [],
      paymentMethods: [],
      dateFrom: '',
      dateTo: '',
      sortBy: 'date',
      sortOrder: 'desc',
      page: 1,
      limit: 10
    });
  }, []);

  // Pagination helpers
  const goToNextPage = useCallback(() => {
    if (pagination?.hasNextPage) {
      setFilters(prev => ({ ...prev, page: prev.page + 1 }));
    }
  }, [pagination?.hasNextPage]);

  const goToPrevPage = useCallback(() => {
    if (pagination?.hasPrevPage) {
      setFilters(prev => ({ ...prev, page: prev.page - 1 }));
    }
  }, [pagination?.hasPrevPage]);

  // Manual refetch function
  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const parsedFilters = JSON.parse(filtersString);
      const response = await apiService.getSales(parsedFilters);
      setSales(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching sales:', err);
    } finally {
      setLoading(false);
    }
  }, [filtersString]);

  return {
    sales,
    filterOptions,
    pagination,
    loading,
    error,
    filters,
    updateFilter,
    resetFilters,
    goToNextPage,
    goToPrevPage,
    refetch
  };
};