import { makeResetStyles, shorthands, tokens } from '@fluentui/react-components';

export const useAdditionalActionButtonBaseClassName = makeResetStyles({
  ...shorthands.padding(tokens.spacingVerticalM),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
});

export const useOptionContainerBaseClassName = makeResetStyles({
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'stretch',
  gap: '8px',
  marginBottom: '12px',
});
