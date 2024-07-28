import {
  checkboxClassNames,
  makeResetStyles,
  makeStyles,
  tokens,
  shorthands,
} from '@fluentui/react-components';

export const useCheckboxBaseStyles = makeResetStyles({
  borderRadius: tokens.borderRadiusMedium,
  [`& .${checkboxClassNames.indicator}`]: {
    marginLeft: 0,

    '& svg': {
      width: '100%',
      height: '100%',
    },
  },
});

export const useCheckboxStyles = makeStyles({
  checkboxSmall: {
    [`& .${checkboxClassNames.indicator}`]: {
      width: '16px',
      height: '16px',
    },
  },
  checkboxMedium: {
    [`& .${checkboxClassNames.indicator}`]: {
      width: '18px',
      height: '18px',
    },
  },
  checkboxLarge: {
    [`& .${checkboxClassNames.indicator}`]: {
      width: '20px',
      height: '20px',
    },
  },
  checkboxBorder: {
    [`&.${checkboxClassNames.root}`]: {
      width: '100%',
      borderRadius: tokens.borderRadiusLarge,
      ...shorthands.padding(tokens.spacingVerticalXS, tokens.spacingHorizontalM),
      ...shorthands.border('1px', 'solid', tokens.colorNeutralBackground3Pressed),
      marginBottom: tokens.spacingVerticalS,

      [`:hover`]: {
        backgroundColor: tokens.colorNeutralBackground3Hover,
      },
    },

    [`& .${checkboxClassNames.label}`]: {
      width: '100%',
    },
  },
  checkboxBorderActive: {
    [`&.${checkboxClassNames.root}`]: {
      backgroundColor: tokens.colorNeutralBackground3Hover,
    },
  },
  error: {
    [`& .${checkboxClassNames.indicator}`]: {
      ...shorthands.borderColor(`${tokens.colorPaletteRedBackground3} !important`),
      ':has(svg)': {
        backgroundColor: `${tokens.colorPaletteRedBackground3} !important`,
      },
    },

    [`&.${checkboxClassNames.root}`]: {
      ...shorthands.borderColor(`${tokens.colorPaletteRedBackground3} !important`),
    },
  },
});

export const useCheckboxGroupStyles = makeStyles({
  group: {
    display: 'flex',
    gap: tokens.spacingHorizontalMNudge,
  },
  groupVertical: {
    flexDirection: 'column',
    flexWrap: 'nowrap',
  },
  groupHorizontal: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  requiredMark: {
    color: tokens.colorPaletteRedBackground3,
  },
});
