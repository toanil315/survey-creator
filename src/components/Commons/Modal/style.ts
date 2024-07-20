import { makeResetStyles, makeStyles, shorthands, tokens } from '@fluentui/react-components';

export const useModalActionsBaseStyles = makeResetStyles({
  paddingTop: tokens.spacingVerticalXXL,
});

export const useModalBaseStyles = makeResetStyles({
  borderRadius: tokens.borderRadiusXLarge,
  boxShadow: ' 0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 8px 10px -6px rgba(0, 0, 0, 0.1)',
});

export const useModalStyles = makeStyles({
  xsmall: {
    width: '575px',
    ...shorthands.padding(
      tokens.spacingVerticalS,
      tokens.spacingHorizontalL,
      tokens.spacingVerticalL,
    ),
  },
  small: {
    width: '768px',
    ...shorthands.padding(
      tokens.spacingVerticalMNudge,
      tokens.spacingHorizontalL,
      tokens.spacingVerticalL,
    ),
  },
  medium: {
    width: '992px',
    ...shorthands.padding(
      tokens.spacingVerticalM,
      tokens.spacingHorizontalXL,
      tokens.spacingVerticalXL,
    ),
  },
  large: {
    width: '1024px',
    ...shorthands.padding(
      tokens.spacingVerticalL,
      tokens.spacingHorizontalXXL,
      tokens.spacingVerticalXXL,
    ),
  },
});
