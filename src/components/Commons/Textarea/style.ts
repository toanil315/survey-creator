import {
  makeResetStyles,
  makeStyles,
  shorthands,
  textareaClassNames,
  tokens,
} from '@fluentui/react-components';

export const useTextareaBaseStyles = makeResetStyles({
  borderRadius: tokens.borderRadiusMedium,
  [`&  .${textareaClassNames.textarea}`]: {
    ...shorthands.padding('0px'),
  },
});

export const useTextareaStyles = makeStyles({
  textareaSmall: {
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalS),
    [`& .${textareaClassNames.textarea}`]: {
      fontSize: tokens.fontSizeBase300,
      lineHeight: tokens.lineHeightBase300,
    },
  },
  textareaMedium: {
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM),
    [`& .${textareaClassNames.textarea}`]: {
      fontSize: tokens.fontSizeBase400,
      lineHeight: tokens.lineHeightBase400,
    },
  },
  textareaLarge: {
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalL),
    [`& .${textareaClassNames.textarea}`]: {
      fontSize: tokens.fontSizeBase500,
      lineHeight: tokens.lineHeightBase500,
    },
  },
  textareaError: {
    ...shorthands.borderColor(`${tokens.colorPaletteRedBackground3} !important`),
    ':after': {
      borderBottomColor: `${tokens.colorPaletteRedBackground3} !important`,
    },
  },
});
