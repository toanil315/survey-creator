import { Tooltip, mergeClasses } from '@fluentui/react-components';
import { Select } from '../Select';
import { TableArrowLeftIcon, QuickJumperIcon } from '@/components/Icons';
import {
  usePageChangeHandlerBaseStyles,
  usePageChangeHandlerStyles,
  usePageInfoBaseStyles,
  usePaginationWrapperBaseStyles,
} from './style';
import { PaginationProps } from './types';

const Pagination = ({ onTableChange, pageSize, current, total = 0 }: PaginationProps) => {
  const paginationWrapperBaseClassName = usePaginationWrapperBaseStyles();
  const pageChangeHandlerBaseClassName = usePageChangeHandlerBaseStyles();
  const pageInfoBaseClassName = usePageInfoBaseStyles();
  const pageChangeHandlerClassName = usePageChangeHandlerStyles();

  const from = pageSize * (current - 1) + 1;
  const to = pageSize * current;
  const pageCount = Math.ceil(total / pageSize);

  const isFirstPageJumpEnabled = current > 1;
  const isLastPageJumpEnabled = current < pageCount;

  const handleLimitChange = (value: string) => {
    onTableChange({ page: 1, limit: Number(value) });
  };

  const handlePageChange = (page: number) => {
    onTableChange({ page, limit: pageSize });
  };

  return (
    <div className={paginationWrapperBaseClassName}>
      <div>
        <Select
          size='small'
          value={String(pageSize)}
          onChange={handleLimitChange}
          options={[
            { value: '10', label: '10 rows' },
            { value: '20', label: '20 rows' },
            { value: '50', label: '50 rows' },
          ]}
        />
      </div>
      <div className={paginationWrapperBaseClassName}>
        <Tooltip
          relationship='description'
          appearance='inverted'
          content='First Page'
          withArrow
        >
          <div
            className={mergeClasses(
              pageChangeHandlerBaseClassName,
              !isFirstPageJumpEnabled && pageChangeHandlerClassName.disabled,
            )}
            onClick={() => isFirstPageJumpEnabled && handlePageChange(1)}
          >
            <QuickJumperIcon
              width={20}
              height={20}
            />
          </div>
        </Tooltip>
        <Tooltip
          relationship='description'
          appearance='inverted'
          content='Previous Page'
          withArrow
        >
          <div
            className={mergeClasses(
              pageChangeHandlerBaseClassName,
              !isFirstPageJumpEnabled && pageChangeHandlerClassName.disabled,
            )}
            onClick={() => isFirstPageJumpEnabled && handlePageChange(current - 1)}
          >
            <TableArrowLeftIcon
              width={20}
              height={20}
            />
          </div>
        </Tooltip>
        <span className={pageInfoBaseClassName}>
          {from}-{pageSize > total ? total : to} of {total}
        </span>
        <Tooltip
          relationship='description'
          appearance='inverted'
          content='Next Page'
          withArrow
        >
          <div
            className={mergeClasses(
              pageChangeHandlerBaseClassName,
              pageChangeHandlerClassName.revert,
              !isLastPageJumpEnabled && pageChangeHandlerClassName.disabled,
            )}
            onClick={() => isLastPageJumpEnabled && handlePageChange(current + 1)}
          >
            <TableArrowLeftIcon
              width={20}
              height={20}
            />
          </div>
        </Tooltip>
        <Tooltip
          relationship='description'
          appearance='inverted'
          content='Last Page'
          withArrow
        >
          <div
            className={mergeClasses(
              pageChangeHandlerBaseClassName,
              pageChangeHandlerClassName.revert,
              !isLastPageJumpEnabled && pageChangeHandlerClassName.disabled,
            )}
            onClick={() => isLastPageJumpEnabled && handlePageChange(pageCount)}
          >
            <QuickJumperIcon
              width={20}
              height={20}
            />
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default Pagination;
