import { ArrowUpIcon } from '@/components/Icons';
import { SORT_ORDER_ENUM } from '@/constants';
import { useTableSortIconStyles } from './style';

interface Props {
  sortOrder: string | null;
}

const TableSortIcon = ({ sortOrder }: Props) => {
  const tableSortIconStyles = useTableSortIconStyles();

  switch (sortOrder) {
    case SORT_ORDER_ENUM.ASC:
      return (
        <ArrowUpIcon
          className={tableSortIconStyles.revert}
          width={12}
        />
      );
    case SORT_ORDER_ENUM.DESC:
      return <ArrowUpIcon width={12} />;
    default:
      return null;
  }
};

export default TableSortIcon;
