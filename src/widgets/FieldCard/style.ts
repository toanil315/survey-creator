import { makeResetStyles, tokens, shorthands, makeStyles } from '@fluentui/react-components';

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
  backgroundColor: tokens.colorNeutralForeground4,
  color: tokens.colorNeutralBackground1,
  ...shorthands.borderRight('1px', 'solid', tokens.colorNeutralBackground1Hover),
});

export const useFieldOrderClassNames = makeStyles({
  white: {
    backgroundColor: tokens.colorNeutralBackground1,
  },
  gray: {
    backgroundColor: tokens.colorNeutralForeground4,
  },
});

export const useFieldFormContainerBaseClassName = makeResetStyles({
  display: 'flex',
  flexFlow: 'column nowrap',
  alignItems: 'stretch',
  gap: tokens.spacingVerticalM,
});

export const useConditionFormContainerBaseClassName = makeResetStyles({
  display: 'flex',
  flexFlow: 'column nowrap',
  alignItems: 'stretch',
  gap: tokens.spacingVerticalM,

  ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM),
  borderRadius: tokens.borderRadiusLarge,
  ...shorthands.border('2px', 'solid', tokens.colorNeutralBackground3Hover),
  background: tokens.colorNeutralBackground1,
});

export const useFieldFormContainerClassNames = makeStyles({
  row: {
    flexFlow: 'row nowrap',
  },
  column: {
    flexFlow: 'column nowrap',
  },
  padding: {
    paddingTop: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingHorizontalM,
  },
  wrap: {
    flexWrap: 'wrap',
  },
});
