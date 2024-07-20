import { usePagination } from './usePagination';
import { useState } from 'react';
import { SORT_ORDER_ENUM } from '@/constants';
import { useSearchParams } from 'react-router-dom';

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface SortParams {
  field: string;
  order: SORT_ORDER_ENUM;
}

export interface FilterParams {
  [key: string]: unknown[] | null;
}

export type TableOnChange = (
  paginationValue?: Partial<PaginationParams> | null,
  sortValue?: SortParams | null,
  filterValue?: FilterParams | null,
) => void;

interface UseTableProps {
  pagination: PaginationParams;
  sort?: SortParams;
  filter?: FilterParams;
}

const sortParamsSeparator = '@SORT@';
const filterParamsSeparator = '@FILTER@';

export const useTable = ({
  pagination: defaultPagination,
  sort: defaultSort,
  filter: defaultFilter,
}: UseTableProps) => {
  const pagination = usePagination(defaultPagination);
  const sort = useSortTable(defaultSort);
  const filter = useFilterTable(defaultFilter);
  const [searchParams, setSearchParams] = useSearchParams();

  const onChange: TableOnChange = (paginationValue, sortValue, filterValue) => {
    if (paginationValue) {
      pagination.onPageChange(
        paginationValue.page || pagination.currentPage,
        paginationValue.limit || pagination.limit,
        searchParams,
      );
    }
    if (filterValue) filter.onFilter(filterValue, searchParams);
    if (sortValue) sort.onSort(sortValue as SortParams, searchParams);
    setSearchParams(searchParams);
  };

  return {
    pagination,
    sort,
    filter,
    onChange,
  };
};

const useSortTable = (initialSort?: SortParams) => {
  const [sortedInfo, setSortedInfo] = useState<Partial<SortParams>>(getInitialSort(initialSort));

  const onSort = ({ field, order }: SortParams, searchParams: URLSearchParams) => {
    searchParams.delete('sort');
    if (field && order) {
      searchParams.append('sort', `${field}${sortParamsSeparator}${order}`);
      setSortedInfo({ field, order });
    } else {
      setSortedInfo({});
    }

    return searchParams;
  };

  return {
    sortedInfo,
    onSort,
  };
};
const useFilterTable = (initialFilter?: FilterParams) => {
  const [filteredInfo, setFilteredInfo] = useState<Partial<FilterParams>>(
    getInitialFilter(initialFilter),
  );

  const onFilter = (filterParams: FilterParams, searchParams: URLSearchParams) => {
    searchParams.delete('filter');
    const filterEntries = Object.entries(filterParams);
    filterEntries.forEach(([field, values]) => {
      if (values && values.length) {
        searchParams.append('filter', `${field}${filterParamsSeparator}${values.join(',')}`);
      }
    });
    searchParams.delete('page');
    searchParams.append('page', '1');
    setFilteredInfo(filterParams);
    return searchParams;
  };

  return {
    filteredInfo,
    onFilter,
  };
};

const getInitialSort = (defaultSort?: SortParams): Partial<SortParams> => {
  const searchParams = new URLSearchParams(window.location.search);
  const value = searchParams.get('sort');

  if (value) {
    const [field, order] = value.split(sortParamsSeparator);
    return { field, order: order as SORT_ORDER_ENUM };
  }

  if (defaultSort) {
    return defaultSort;
  }

  return {};
};

const getInitialFilter = (defaultFilter?: FilterParams): Partial<FilterParams> => {
  const searchParams = new URLSearchParams(window.location.search);
  const values = searchParams.getAll('filter');
  let result: Record<string, unknown[]> = {};

  if (values) {
    values.forEach((filterQuery) => {
      const [filterField, filterValuesStr] = filterQuery.split(filterParamsSeparator);
      const filterValues = filterValuesStr.split(',');

      if (filterValues.length > 0) {
        result = { ...result, [filterField]: filterValues };
      }
    });
    return result;
  }

  if (defaultFilter) {
    return defaultFilter;
  }

  return {};
};
