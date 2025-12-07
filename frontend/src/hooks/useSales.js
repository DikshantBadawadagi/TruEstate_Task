import { useState, useEffect, useCallback, useRef } from 'react';
import apiService from '../services/apiService';

export const useSales = () => {
  const [sales, setSales] = useState([]);
  const [filterOptions, setFilterOptions] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const lastFetchedFiltersRef = useRef('');
  const isMountedRef = useRef(false);

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
    isMountedRef.current = true;
  }, []);

  useEffect(() => {
    if (!isMountedRef.current) return;

    const filtersString = JSON.stringify(filters);
    
    if (filtersString === lastFetchedFiltersRef.current) {
      return;
    }

    const fetchSales = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiService.getSales(filters);
        setSales(response.data);
        setPagination(response.pagination);
        lastFetchedFiltersRef.current = filtersString;
      } catch (err) {
        setError(err.message);
        console.error('Error fetching sales:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, [filters.search, filters.regions, filters.genders, filters.ageMin, filters.ageMax, 
      filters.categories, filters.tags, filters.paymentMethods, filters.dateFrom, 
      filters.dateTo, filters.sortBy, filters.sortOrder, filters.page, filters.limit]);

  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: key !== 'page' ? 1 : value
    }));
  }, []);

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

  const refetch = useCallback(() => {
    lastFetchedFiltersRef.current = ''; 
    setFilters(prev => ({ ...prev })); 
  }, []);

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