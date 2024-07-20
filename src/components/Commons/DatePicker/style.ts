import { makeResetStyles, makeStyles, shorthands, tokens } from '@fluentui/react-components';

export const useDatePickerBaseStyles = makeResetStyles({
  borderRadius: tokens.borderRadiusMedium,
  '& > input': {
    paddingLeft: 0,
    paddingRight: 0,
  },
});

export const useDatePickerStyles = makeStyles({
  datePickerSmall: {
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalS),
    [`& > input`]: {
      fontSize: tokens.fontSizeBase300,
      lineHeight: tokens.lineHeightBase300,
    },
  },
  datePickerMedium: {
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM),
    [`& > input`]: {
      fontSize: tokens.fontSizeBase400,
      lineHeight: tokens.lineHeightBase400,
    },
  },
  datePickerLarge: {
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalL),
    [`& > input`]: {
      fontSize: tokens.fontSizeBase500,
      lineHeight: tokens.lineHeightBase500,
    },
  },
  datePickerError: {
    ...shorthands.borderColor(`${tokens.colorPaletteRedBackground3} !important`),
    ':after': {
      borderBottomColor: `${tokens.colorPaletteRedBackground3} !important`,
    },
  },
});
