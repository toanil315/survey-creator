import { makeResetStyles, tokens } from '@fluentui/react-components';

export const useFormTitleBaseClassName = makeResetStyles({
  textAlign: 'center',
  marginBottom: tokens.spacingVerticalXL,
  color: tokens.colorBrandBackground,
  fontSize: tokens.fontSizeBase600,
});
