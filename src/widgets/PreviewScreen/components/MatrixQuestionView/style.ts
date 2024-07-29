import {
  makeResetStyles,
  radioClassNames,
  tokens,
  shorthands,
  fieldClassNames,
  radioGroupClassNames,
} from '@fluentui/react-components';

export const useMatrixGridBaseClassName = makeResetStyles({
  display: 'flex',
  flexFlow: 'column nowrap',
  gap: tokens.spacingVerticalXXL,
  marginBottom: tokens.spacingVerticalL,
});

export const useMatrixRowHeaderBaseClassName = makeResetStyles({
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  paddingLeft: '140px',

  '& span': {
    display: 'inline-block',
    width: '18px',
    textAlign: 'center',
  },
});

export const useMatrixRowBaseClassName = makeResetStyles({
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'flex-end',

  '& .row-title': {
    width: '140px',
  },

  [`& .${fieldClassNames.root}`]: {
    flexGrow: 1,
  },

  [`& .${radioGroupClassNames.root}`]: {
    width: '100%',
    justifyContent: 'space-between',
  },

  [`& .${radioClassNames.root}`]: {
    flexDirection: 'column-reverse',
  },

  [`& .${radioClassNames.indicator}`]: {
    ...shorthands.margin('0px'),
  },

  [`& .${radioClassNames.label}`]: {
    ...shorthands.padding('0px'),
    paddingBottom: tokens.spacingVerticalSNudge,
  },
});
