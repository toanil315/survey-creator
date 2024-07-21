import {
  accordionHeaderClassNames,
  accordionPanelClassNames,
  makeResetStyles,
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';

export const useAccordionBaseStyles = makeResetStyles({
  [`& .${accordionHeaderClassNames.button}`]: {
    minHeight: 0,
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalXL),
    backgroundColor: tokens.colorNeutralBackground1,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',

    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },

    '& div': {
      width: '100%',
    },
  },

  [`& .${accordionPanelClassNames.root}`]: {
    margin: 0,
    padding: tokens.spacingHorizontalXL,
    backgroundColor: tokens.colorNeutralBackground1,
  },

  '& .helper-text': {
    fontSize: tokens.fontSizeBase100,
    color: tokens.colorNeutralForeground3,
  },
});

export const useAccordionStyles = makeStyles({});
