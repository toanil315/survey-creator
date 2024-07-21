import { makeResetStyles, shorthands, tokens } from '@fluentui/react-components';

export const useQuestionListBaseClassName = makeResetStyles({
  display: 'flex',
  flexFlow: 'column nowrap',
  gap: tokens.spacingVerticalXL,

  ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalXL),
  width: '100%%',
  height: 'calc(100vh - 55px)',
  overflowX: 'hidden',
  overflowY: 'auto',
});
