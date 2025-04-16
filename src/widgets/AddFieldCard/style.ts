import { makeResetStyles, tokens, shorthands } from '@fluentui/react-components';

export const useFieldCardBaseClassName = makeResetStyles({
  flexShrink: 0,
  width: '100%',
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'stretch',
  borderRadius: tokens.borderRadiusMedium,
  overflow: 'hidden',
  boxShadow: tokens.shadow8,
});

export const useFieldOrderBaseClassName = makeResetStyles({
  ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
  backgroundColor: tokens.colorBrandBackground,
  color: tokens.colorNeutralBackground1,
});

export const useFieldListBaseClassName = makeResetStyles({
  display: 'flex',
  flexFlow: 'column nowrap',
});

export const useFieldTypeBaseClassName = makeResetStyles({
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'center',
  gap: tokens.spacingHorizontalMNudge,

  fontWeight: tokens.fontWeightMedium,
  textTransform: 'capitalize',

  width: '100%',
  ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalS),
  borderRadius: tokens.borderRadiusMedium,

  cursor: 'pointer',

  ':hover': {
    backgroundColor: tokens.colorNeutralBackground3,
  },

  '& .icon': {
    fill: tokens.colorBrandBackground,
  },
});
