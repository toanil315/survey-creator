import { makeResetStyles, tokens, shorthands, makeStyles } from '@fluentui/react-components';

export const usePictureSelectionContainerBaseClassName = makeResetStyles({
  width: '100%',

  display: 'flex',
  flexFlow: 'row wrap',
  gap: tokens.spacingHorizontalM,
});

export const usePictureSelectionItemBaseClassName = makeResetStyles({
  width: `calc(50% - ${tokens.spacingHorizontalM} / 2)`,
  position: 'relative',
  cursor: 'pointer',

  '& img': {
    width: '100%',
    objectFit: 'cover',
    borderRadius: tokens.borderRadiusXLarge,
    ...shorthands.border('2px', 'solid', 'transparent'),
  },

  '& .indicator': {
    position: 'absolute',
    top: '5px',
    right: '5px',

    width: '24px',
    height: '24px',
    borderRadius: tokens.borderRadiusXLarge,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: tokens.colorNeutralBackground1,
  },
});

export const usePictureSelectionItemClassNames = makeStyles({
  selected: {
    '& img': {
      ...shorthands.border('2px', 'solid', tokens.colorBrandForeground1),
    },

    '& .indicator': {
      backgroundColor: tokens.colorBrandForeground1,
    },
  },
});
