export interface PaginationProps {
  onTableChange: (pagination: { page: number; limit: number }) => void;
  current: number;
  pageSize: number;
  total: number;
}
