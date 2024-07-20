import {
  makeResetStyles,
  makeStyles,
  tokens,
  shorthands,
  comboboxClassNames,
} from '@fluentui/react-components';

export const useSelectBaseStyles = makeResetStyles({
  [`&.${comboboxClassNames.root}`]: {
    borderRadius: tokens.borderRadiusMedium,
    height: 'max-content',
  },

  [`& .${comboboxClassNames.input}`]: {
    paddingLeft: '0px',
  },
});

export const useSelectStyles = makeStyles({
  small: {
    ...shorthands.padding(tokens.spacingVerticalS),
    [`& .${comboboxClassNames.input}`]: {
      fontSize: tokens.fontSizeBase300,
      lineHeight: tokens.lineHeightBase300,
    },
  },
  medium: {
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM),
    [`& .${comboboxClassNames.input}`]: {
      fontSize: tokens.fontSizeBase400,
      lineHeight: tokens.lineHeightBase400,
    },
  },
  large: {
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalL),
    [`& .${comboboxClassNames.input}`]: {
      fontSize: tokens.fontSizeBase400,
      lineHeight: tokens.lineHeightBase400,
    },
  },
  error: {
    ...shorthands.borderColor(`${tokens.colorPaletteRedBackground3} !important`),
    ':after': {
      borderBottomColor: `${tokens.colorPaletteRedBackground3} !important`,
    },
  },

  optionSmall: {
    ...shorthands.padding(tokens.spacingVerticalSNudge),
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
  },
  optionMedium: {
    ...shorthands.padding(tokens.spacingVerticalSNudge, tokens.spacingHorizontalM),
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
  },
  optionLarge: {
    ...shorthands.padding(tokens.spacingVerticalSNudge, tokens.spacingHorizontalL),
    fontSize: tokens.fontSizeBase500,
    lineHeight: tokens.lineHeightBase500,
  },
});
