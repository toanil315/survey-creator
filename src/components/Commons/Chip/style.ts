import {
  makeResetStyles,
  makeStyles,
  tokens,
  shorthands,
  tagClassNames,
} from '@fluentui/react-components';

export const useTagBaseStyles = makeResetStyles({
  borderRadius: tokens.borderRadiusCircular,
  height: 'max-content',

  [`& .${tagClassNames.primaryText}`]: {
    ...shorthands.padding('0px'),
  },
});

export const useTagStyles = makeStyles({
  small: {
    ...shorthands.padding(tokens.spacingVerticalXXS, tokens.spacingHorizontalXS),
    gap: tokens.spacingHorizontalXS,
    [`& .${tagClassNames.primaryText}`]: {
      fontSize: tokens.fontSizeBase200,
      lineHeight: tokens.lineHeightBase200,
    },
  },
  medium: {
    ...shorthands.padding(tokens.spacingVerticalXS, tokens.spacingHorizontalS),
    gap: tokens.spacingHorizontalSNudge,
    [`& .${tagClassNames.primaryText}`]: {
      fontSize: tokens.fontSizeBase300,
      lineHeight: tokens.lineHeightBase300,
    },
  },
  large: {
    ...shorthands.padding(tokens.spacingVerticalSNudge, tokens.spacingHorizontalMNudge),
    gap: tokens.spacingHorizontalS,
    [`& .${tagClassNames.primaryText}`]: {
      fontSize: tokens.fontSizeBase400,
      lineHeight: tokens.lineHeightBase400,
    },
  },
  intro: {
    backgroundColor: tokens.colorPaletteBlueBorderActive,
    color: tokens.colorNeutralBackground1,
  },
  success: {
    backgroundColor: tokens.colorPaletteGreenBorderActive,
    color: tokens.colorNeutralBackground1,
  },
  warning: {
    backgroundColor: tokens.colorPaletteGoldBorderActive,
    color: tokens.colorNeutralBackground1,
  },
  error: {
    backgroundColor: tokens.colorStatusDangerBorder2,
    color: tokens.colorNeutralBackground1,
  },
});
