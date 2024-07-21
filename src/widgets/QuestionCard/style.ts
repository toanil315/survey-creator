import { makeResetStyles, tokens, shorthands, makeStyles } from '@fluentui/react-components';

export const useQuestionCardBaseClassName = makeResetStyles({
  flexShrink: 0,
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
  backgroundColor: tokens.colorNeutralForeground4,
  color: tokens.colorNeutralBackground1,
  ...shorthands.borderRight('1px', 'solid', tokens.colorNeutralBackground1Hover),
});

export const useQuestionOrderClassNames = makeStyles({
  white: {
    backgroundColor: tokens.colorNeutralBackground1,
  },
  gray: {
    backgroundColor: tokens.colorNeutralForeground4,
  },
});

export const useQuestionFormContainerBaseClassName = makeResetStyles({
  display: 'flex',
  flexFlow: 'column nowrap',
  alignItems: 'stretch',
  gap: tokens.spacingVerticalM,
});
