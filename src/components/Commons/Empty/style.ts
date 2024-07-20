import { makeResetStyles, tokens } from '@fluentui/react-components';

export const useEmptyBaseStyles = makeResetStyles({
  display: 'flex',
  flexFlow: 'column nowrap',
  alignItems: 'center',
  gap: '20px',
});

export const useEmptyHeaderBaseStyles = makeResetStyles({
  fontSize: tokens.fontSizeBase500,
  lineHeight: tokens.lineHeightBase400,
  fontWeight: tokens.fontWeightMedium,
});

export const useEmptyDescriptionBaseStyles = makeResetStyles({
  fontSize: tokens.fontSizeBase300,
  lineHeight: tokens.lineHeightBase300,
  fontWeight: tokens.fontWeightRegular,
  textAlign: 'center',
});
