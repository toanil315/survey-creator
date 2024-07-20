import {
  makeResetStyles,
  menuItemClassNames,
  shorthands,
  tokens,
} from '@fluentui/react-components';

export const useOverflowMenuItemBaseStyle = makeResetStyles({
  minWidth: '100px',
  ...shorthands.padding(tokens.spacingVerticalXS, tokens.spacingHorizontalSNudge),

  ':hover': {
    backgroundColor: tokens.colorBrandBackgroundInvertedHover,
  },

  [`& .${menuItemClassNames.content}`]: {
    ...shorthands.padding(tokens.spacingVerticalSNudge, tokens.spacingHorizontalM),
  },
});
