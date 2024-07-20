import {
  makeResetStyles,
  makeStyles,
  tableHeaderCellClassNames,
  tokens,
} from '@fluentui/react-components';

export const useTableWrapperBaseStyles = makeResetStyles({
  display: 'flex',
  flexFlow: 'column nowrap',
  gap: '15px',
});

export const useTableHeaderBaseStyles = makeResetStyles({
  backgroundColor: tokens.colorNeutralBackground2,

  [`& .${tableHeaderCellClassNames.button}`]: {
    paddingTop: tokens.spacingVerticalSNudge,
    paddingBottom: tokens.spacingVerticalSNudge,
    fontWeight: tokens.fontWeightSemibold,

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export const useTableSortIconStyles = makeStyles({
  revert: {
    transform: 'rotate(180deg)',
  },
});
