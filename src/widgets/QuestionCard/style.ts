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

export const useQuestionFormContainerBaseClassName = makeResetStyles({
  display: 'flex',
  flexFlow: 'column nowrap',
  alignItems: 'stretch',
  gap: tokens.spacingVerticalM,
});
