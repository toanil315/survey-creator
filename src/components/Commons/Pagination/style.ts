import {
  comboboxClassNames,
  makeResetStyles,
  makeStyles,
  tokens,
} from '@fluentui/react-components';

export const usePaginationWrapperBaseStyles = makeResetStyles({
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: tokens.spacingHorizontalMNudge,

  [`& .${comboboxClassNames.root}`]: {
    minWidth: 'unset',
  },

  [`& .${comboboxClassNames.input}`]: {
    width: '60px',
  },
});

export const usePageChangeHandlerBaseStyles = makeResetStyles({
  width: '30px',
  height: '30px',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  cursor: 'pointer',
});

export const usePageChangeHandlerStyles = makeStyles({
  revert: {
    transform: 'rotate(180deg)',
  },
  disabled: {
    cursor: 'not-allowed',
    '& path': {
      fill: tokens.colorNeutralForegroundDisabled,
    },
  },
});

export const usePageInfoBaseStyles = makeResetStyles({
  fontSize: tokens.fontSizeBase200,
});
