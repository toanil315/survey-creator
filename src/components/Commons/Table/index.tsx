import { BaseTableItem, TableProps } from './types';
import Pagination from '../Pagination';
import {
  SortDirection,
  TableColumnId,
  useTableFeatures,
  useTableSort,
  Table as FuiTable,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  TableCellLayout,
} from '@fluentui/react-components';
import { SORT_ORDER_ENUM } from '@/constants';
import { useTableHeaderBaseStyles, useTableWrapperBaseStyles } from './style';
import TableSortIcon from './TableSortIcon';

export const Table = <T extends BaseTableItem>({
  tableInstance,
  totalElements,
  columns,
  dataSource,
}: TableProps<T>) => {
  const tableWrapperBaseClassName = useTableWrapperBaseStyles();
  const tableHeaderBaseClassName = useTableHeaderBaseStyles();

  const { pagination, sort } = tableInstance;

  const {
    getRows,
    sort: { getSortDirection, toggleColumnSort, sort: sortFunc },
  } = useTableFeatures(
    {
      columns: columns.map((column) => column.definition),
      items: dataSource || [],
    },
    [
      useTableSort({
        sortState: {
          sortDirection: sort.sortedInfo.order as SortDirection,
          sortColumn: sort.sortedInfo.field,
        },
        onSortChange: (_, nextSortState) => {
          if (nextSortState.sortColumn) {
            tableInstance.onChange(null, {
              field: nextSortState.sortColumn as string,
              order: nextSortState.sortDirection as SORT_ORDER_ENUM,
            });
          }
        },
      }),
    ],
  );

  const headerSortProps = (columnId: TableColumnId) => ({
    onClick: (e: React.MouseEvent) => toggleColumnSort(e, columnId),
    sortDirection: getSortDirection(columnId),
  });

  const rows = sortFunc(getRows());

  return (
    <div className={tableWrapperBaseClassName}>
      <FuiTable sortable>
        <TableHeader>
          <TableRow>
            {columns.map((column) => {
              return (
                <TableHeaderCell
                  key={`table-header-${column.definition.columnId}`}
                  {...headerSortProps(column.definition.columnId)}
                  className={tableHeaderBaseClassName}
                  sortIcon={
                    <TableSortIcon
                      sortOrder={getSortDirection(column.definition.columnId) as SORT_ORDER_ENUM}
                    />
                  }
                >
                  {column.title}
                </TableHeaderCell>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(({ item }) => (
            <TableRow key={item.id}>
              {columns.map((column) => {
                return (
                  <TableCell key={`table-cell-${item.id}-${column.definition.columnId}`}>
                    <TableCellLayout>{column.render(item)}</TableCellLayout>
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </FuiTable>
      <Pagination
        current={pagination.currentPage}
        pageSize={pagination.limit}
        total={totalElements}
        onTableChange={tableInstance.onChange as any}
      />
    </div>
  );
};
