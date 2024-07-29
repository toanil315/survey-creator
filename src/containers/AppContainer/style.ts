import { makeResetStyles, shorthands, tokens } from '@fluentui/react-components';

export const useAppLayoutBaseClassName = makeResetStyles({
  display: 'flex',
  flexFlow: 'row nowrap',
  gap: tokens.spacingHorizontalXXL,

  width: '100%',

  '& > div': {
    width: '50%',
  },

  '& .preview': {
    ...shorthands.padding(tokens.spacingHorizontalXXL, tokens.spacingHorizontalXXL),
    ...shorthands.borderLeft('1px', 'solid', tokens.colorNeutralBackground3),
  },
});

export const useNavBaseClassName = makeResetStyles({
  height: '55px',
  display: 'flex',
  flexFlow: 'row nowrap',
  gap: '8px',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '8px',
  backgroundColor: tokens.colorNeutralBackground1,
  ...shorthands.border('1px', 'solid', tokens.colorNeutralBackground6),
  borderBottomWidth: '3px',
  borderBottomColor: tokens.colorBrandBackground,
});
