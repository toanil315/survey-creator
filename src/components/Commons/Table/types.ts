import { useTable } from '@/hooks';
import { TableColumnDefinition } from '@fluentui/react-components';

export type BaseTableItem = object & { id: string };

export interface TableColumn<U> {
  definition: TableColumnDefinition<U>;
  title: React.ReactNode;
  render: (item: U) => React.ReactNode;
}

export interface TableProps<T extends BaseTableItem> {
  tableInstance: ReturnType<typeof useTable>;
  totalElements: number;
  columns: TableColumn<T>[];
  dataSource?: T[];
}
