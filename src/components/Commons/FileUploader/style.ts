import { makeResetStyles, tokens, shorthands, makeStyles } from '@fluentui/react-components';

export const useWrapperBaseStyles = makeResetStyles({
  width: '100%',
});

export const useContainerBaseStyles = makeResetStyles({
  display: 'flex',
  flexFlow: 'column nowrap',
  gap: '16px',
});

export const useBrowserFileInputBaseStyles = makeResetStyles({
  width: '100%',
  backgroundColor: tokens.colorNeutralBackground1,

  fontSize: tokens.fontSizeBase300,
  lineHeight: tokens.lineHeightBase300,
  color: tokens.colorNeutralForeground1,
  paddingLeft: tokens.spacingHorizontalM,

  ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke1),
  borderRight: 'none',

  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  borderRadius: tokens.borderRadiusMedium,
});

export const useBrowserFileInputStyles = makeStyles({
  error: {
    ...shorthands.borderColor(`${tokens.colorPaletteRedBackground3} !important`),
  },
});

export const useBrowserFileAreaBaseStyles = makeResetStyles({
  width: '100%',

  '& .area': {
    ...shorthands.padding(tokens.spacingVerticalXXXL, tokens.spacingHorizontalXXXL),
    ...shorthands.border('1px', 'dashed', tokens.colorNeutralStroke1),
    borderRadius: tokens.borderRadiusMedium,

    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    gap: tokens.spacingVerticalL,
    cursor: 'pointer',

    '& .instruction': {
      fontSize: tokens.fontSizeBase300,
      fontWeight: tokens.fontWeightSemibold,
      lineHeight: tokens.lineHeightBase300,
      color: tokens.colorNeutralForeground1,
    },

    '& > span': {
      marginTop: '0',
    },
  },
});

export const useBrowserFileAreaStyles = makeStyles({
  error: {
    '& .area': {
      ...shorthands.borderColor(`${tokens.colorPaletteRedBackground3} !important`),
    },
  },
});

export const useDndFileBaseStyles = makeResetStyles({
  position: 'relative',

  '& .area': {
    transition: 'all 0.2s linear',
    cursor: 'default',

    '& .link': {
      color: tokens.colorBrandForeground1,
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },

  '& input': {
    display: 'block',
    opacity: 0,

    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
});

export const useDndFileStyles = makeStyles({
  dragEnter: {
    '& .area': {
      ...shorthands.borderColor(tokens.colorBrandForeground1),
      ...shorthands.borderStyle('solid'),
      backgroundColor: tokens.colorCompoundBrandBackground,
    },
  },
  error: {
    ...shorthands.borderColor(`${tokens.colorPaletteRedBackground3} !important`),
  },
});

export const useFileContainerBaseStyles = makeResetStyles({
  width: '100%',

  display: 'flex',
  flexFlow: 'column nowrap',
  gap: tokens.spacingVerticalM,
});

export const useFileItemBaseStyles = makeResetStyles({
  width: '100%',
  backgroundColor: tokens.colorNeutralBackground1,

  ...shorthands.padding(
    tokens.spacingVerticalM,
    tokens.spacingHorizontalM,
    tokens.spacingVerticalM,
    tokens.spacingHorizontalL,
  ),
  ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke1),
  borderRadius: tokens.borderRadiusMedium,

  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: tokens.spacingHorizontalXXXL,

  '& .name': {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  '& .close-action': {
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalS),
    cursor: 'pointer',
  },
});
