import { makeResetStyles, makeStyles, shorthands, tokens } from '@fluentui/react-components';

export const useButtonBaseStyles = makeResetStyles({
  borderRadius: tokens.borderRadiusMedium,
});

export const useButtonStyles = makeStyles({
  buttonSmall: {
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalS),
    gap: tokens.spacingHorizontalS,
  },
  buttonMedium: {
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM),
    gap: tokens.spacingHorizontalMNudge,
  },
  buttonLarge: {
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalL),
    gap: tokens.spacingHorizontalM,
  },
  buttonLoading: {
    cursor: 'no-drop !important',
    opacity: 0.6,
  },
});
