import {
  accordionHeaderClassNames,
  accordionPanelClassNames,
  comboboxClassNames,
  makeResetStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';

export const useQuestionLogicContainerBaseClassName = makeResetStyles({
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'stretch',
  gap: '8px',
  marginBottom: '12px',

  [`& .${comboboxClassNames.root}`]: {
    minWidth: '100px',
  },
  [`& .${comboboxClassNames.input}`]: {
    width: '140px',
  },

  '& .statement': {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    width: '115px',
    flexShrink: 0,
  },
});

export const useRemoveButtonBaseClassName = makeResetStyles({
  ...shorthands.padding(tokens.spacingVerticalM),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
});

export const useCustomAccrodionBaseClassName = makeResetStyles({
  [`& .${accordionHeaderClassNames.button}`]: {
    minHeight: 0,
    ...shorthands.padding(tokens.spacingVerticalM, '0px'),
    backgroundColor: 'transparent',

    ':hover': {
      backgroundColor: 'transparent',
    },

    '& div': {
      width: '100%',
    },
  },

  [`& .${accordionPanelClassNames.root}`]: {
    ...shorthands.padding('0px'),
  },
});

export const useTitleBaseClassName = makeResetStyles({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});
