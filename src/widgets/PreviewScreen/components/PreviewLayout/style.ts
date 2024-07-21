import { makeResetStyles, makeStyles, shorthands, tokens } from '@fluentui/react-components';

export const usePreviewLayoutBaseClassName = makeResetStyles({
  display: 'flex',
  flexFlow: 'column nowrap',
  height: '100%',
  borderRadius: tokens.borderRadiusMedium,
  ...shorthands.border('1px', 'solid', tokens.colorNeutralBackground1),
  boxShadow: tokens.shadow8,
  overflow: 'hidden',

  '& > .container': {
    flexGrow: 1,
    ...shorthands.padding('0px', tokens.spacingHorizontalM),

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  '& *': {
    fontDamily: '"Poppins", sans-serif',
  },
});

export const usePreviewHeaderBaseClassName = makeResetStyles({
  backgroundColor: tokens.colorNeutralBackground3,

  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  ...shorthands.padding(tokens.spacingVerticalMNudge, tokens.spacingHorizontalM),

  '& > .container': {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
  },
});

export const useDotBaseClassName = makeResetStyles({
  width: '10px',
  height: '10px',
  borderRadius: tokens.borderRadiusCircular,
});

export const useDotClassNames = makeStyles({
  red: {
    backgroundColor: tokens.colorPaletteRedBackground3,
  },
  yellow: {
    backgroundColor: tokens.colorPaletteYellowBackground3,
  },
  green: {
    backgroundColor: tokens.colorPaletteGreenBackground3,
  },
});

export const useRestartButtonBaseClassName = makeResetStyles({
  display: 'flex',
  flexFlow: 'row nowrap',
  gap: tokens.spacingHorizontalSNudge,
  cursor: 'pointer',
  backgroundColor: tokens.colorNeutralBackground1,
  borderRadius: tokens.borderRadiusLarge,
  ...shorthands.padding(tokens.spacingVerticalXXS, tokens.spacingHorizontalM),
  ...shorthands.border('1px', 'solid', tokens.colorNeutralBackground1Pressed),
});
