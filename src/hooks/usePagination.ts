import { useState } from 'react';

interface UsePaginationParams {
  page: number;
  limit: number;
}

const getInitialPageAndLimit = (field: 'page' | 'limit', fallbackValue: number) => {
  const searchParams = new URLSearchParams(window.location.search);
  const value = searchParams.get(field);
  return value ? Number(value) : fallbackValue;
};

export const usePagination = ({ page: defaultPage, limit: defaultLimit }: UsePaginationParams) => {
  const [page, setPage] = useState(getInitialPageAndLimit('page', defaultPage));
  const [limit, setLimit] = useState(getInitialPageAndLimit('limit', defaultLimit));

  const onPageChange = (page: number, limit: number, searchParams: URLSearchParams) => {
    searchParams.delete('page');
    searchParams.delete('limit');
    searchParams.append('page', String(page));
    searchParams.append('limit', String(limit));
    setPage(page);
    setLimit(limit);
    return searchParams;
  };

  return {
    currentPage: Number(page) || 1,
    limit,
    onPageChange,
  };
};
