import {
  inputClassNames,
  makeResetStyles,
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';

export const useInputBaseStyles = makeResetStyles({
  borderRadius: tokens.borderRadiusMedium,
  '& > input': {
    paddingLeft: 0,
    paddingRight: 0,
  },
});

export const useInputStyles = makeStyles({
  inputSmall: {
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalS),
    [`& .${inputClassNames.input}`]: {
      fontSize: tokens.fontSizeBase300,
      lineHeight: tokens.lineHeightBase300,
    },
  },
  inputMedium: {
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM),
    [`& .${inputClassNames.input}`]: {
      fontSize: tokens.fontSizeBase400,
      lineHeight: tokens.lineHeightBase400,
    },
  },
  inputLarge: {
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalL),
    [`& .${inputClassNames.input}`]: {
      fontSize: tokens.fontSizeBase500,
      lineHeight: tokens.lineHeightBase500,
    },
  },
  inputError: {
    ...shorthands.borderColor(`${tokens.colorPaletteRedBackground3} !important`),
    ':after': {
      borderBottomColor: `${tokens.colorPaletteRedBackground3} !important`,
    },
  },
});
