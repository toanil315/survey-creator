import {
  makeResetStyles,
  makeStyles,
  radioClassNames,
  tokens,
  shorthands,
} from '@fluentui/react-components';

export const useRadioGroupBaseStyles = makeResetStyles({
  [`& .${radioClassNames.indicator}`]: {
    marginLeft: '0px',
  },
});

export const useRadioGroupStyles = makeStyles({
  small: {
    [`& .${radioClassNames.indicator}`]: {
      width: '16px',
      height: '16px',
    },

    [`& .${radioClassNames.label}`]: {
      fontSize: tokens.fontSizeBase300,
      lineHeight: tokens.lineHeightBase300,
    },
  },
  medium: {
    [`& .${radioClassNames.indicator}`]: {
      width: '18px',
      height: '18px',
    },

    [`& .${radioClassNames.label}`]: {
      fontSize: tokens.fontSizeBase400,
      lineHeight: tokens.lineHeightBase400,
    },
  },
  large: {
    [`& .${radioClassNames.indicator}`]: {
      width: '20px',
      height: '20px',
    },

    [`& .${radioClassNames.label}`]: {
      fontSize: tokens.fontSizeBase400,
      lineHeight: tokens.lineHeightBase400,
    },
  },
  radioBorder: {
    [`&.${radioClassNames.root}`]: {
      width: '100%',
      borderRadius: tokens.borderRadiusLarge,
      ...shorthands.padding(tokens.spacingVerticalXS, tokens.spacingHorizontalM),
      ...shorthands.border('1px', 'solid', tokens.colorNeutralBackground3Pressed),
      marginBottom: tokens.spacingVerticalS,

      [`:hover`]: {
        backgroundColor: tokens.colorNeutralBackground1Hover,
      },
    },

    [`& .${radioClassNames.label}`]: {
      width: '100%',
    },
  },
  radioBorderActive: {
    [`&.${radioClassNames.root}`]: {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  error: {
    [`& .${radioClassNames.indicator}`]: {
      ...shorthands.borderColor(`${tokens.colorPaletteRedBackground3} !important`),

      ':after': {
        backgroundColor: `${tokens.colorPaletteRedBackground3} !important`,
      },
    },

    [`&.${radioClassNames.root}`]: {
      ...shorthands.borderColor(`${tokens.colorPaletteRedBackground3} !important`),
    },
  },
});
