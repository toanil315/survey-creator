import { makeResetStyles, tokens, shorthands } from '@fluentui/react-components';

export const useQuestionCardBaseClassName = makeResetStyles({
  width: '100%',
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'stretch',
  borderRadius: tokens.borderRadiusMedium,
  overflow: 'hidden',
  boxShadow: tokens.shadow8,
});

export const useQuestionOrderBaseClassName = makeResetStyles({
  ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
  backgroundColor: tokens.colorBrandBackground,
  color: tokens.colorNeutralBackground1,
});

export const useQuestionListBaseClassName = makeResetStyles({
  display: 'flex',
  flexFlow: 'column nowrap',
});

export const useQuestionTypeBaseClassName = makeResetStyles({
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
