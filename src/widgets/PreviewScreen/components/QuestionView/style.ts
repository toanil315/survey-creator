import { makeResetStyles, makeStyles, shorthands, tokens } from '@fluentui/react-components';

export const useQuestionViewContainerBaseClassName = makeResetStyles({
  width: '420px',
  ...shorthands.border('1px', 'solid', tokens.colorNeutralBackground3Selected),
  borderRadius: tokens.borderRadiusXLarge,
  ...shorthands.padding(tokens.spacingVerticalXXL, tokens.spacingHorizontalXL),
  boxShadow: tokens.shadow4,

  display: 'flex',
  flexFlow: 'column nowrap',
  gap: tokens.spacingVerticalL,

  '& > .title': {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase400,
    color: tokens.colorNeutralForeground1,

    '& > .required': {
      color: tokens.colorPaletteRedBackground3,
    },
  },

  '& > .description': {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground2,
  },

  '& > .user-controls': {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    gap: tokens.spacingHorizontalM,
  },

  '& > .progress': {
    width: '100%',

    marginTop: tokens.spacingVerticalL,

    color: tokens.colorNeutralForeground4,
    fontSize: tokens.fontSizeBase200,

    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    gap: tokens.spacingVerticalS,
  },

  '& > .completed-icon': {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    gap: tokens.spacingVerticalSNudge,

    '& > div': {
      height: '4px',
      width: '64px',
      borderRadius: '100%',
      backgroundColor: tokens.colorBrandBackground,
    },
  },
});

export const useQuestionViewContainerClassNames = makeStyles({
  center: {
    alignItems: 'center',
  },
});

export const useRatingContainerBaseClassName = makeResetStyles({
  width: 'max-content',
  ...shorthands.margin('0px', 'auto'),

  '& .rating-labels': {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',

    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    fontWeight: tokens.fontWeightMedium,

    marginTop: tokens.spacingVerticalSNudge,
  },
});
