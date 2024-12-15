import { makeResetStyles, shorthands, tokens } from '@fluentui/react-components';

export const useSurveyLayoutBaseClassName = makeResetStyles({
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

export const useProductTourButtonBaseClassName = makeResetStyles({
  position: 'fixed',
  bottom: '18px',
  right: '18px',

  width: '54px',
  height: '54px',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  backgroundColor: 'white',
  ...shorthands.border('1px', 'solid', tokens.colorNeutralBackground6),
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '50%',
  padding: '8px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',

  '&:hover': {
    backgroundColor: tokens.colorNeutralBackground3,
  },
});
