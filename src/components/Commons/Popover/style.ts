import { makeResetStyles, makeStyles, tokens, shorthands } from '@fluentui/react-components';

export const usePopoverBaseStyles = makeResetStyles({
  borderRadius: tokens.borderRadiusXLarge,
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'nowrap',
});

export const usePopoverActionsBaseStyles = makeResetStyles({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  justifyContent: 'flex-end',
  alignItems: 'center',
});

export const usePopoverStyles = makeStyles({
  small: {
    minWidth: '170px',
    ...shorthands.padding(tokens.spacingVerticalMNudge, tokens.spacingHorizontalMNudge),
    gap: tokens.spacingVerticalMNudge,
  },
  medium: {
    minWidth: '212px',
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
    gap: tokens.spacingVerticalM,
  },
  large: {
    minWidth: '250px',
    ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalL),
    gap: tokens.spacingVerticalL,
  },
  actionsSmall: {
    gap: tokens.spacingHorizontalS,
  },
  actionsMedium: {
    gap: tokens.spacingHorizontalMNudge,
  },
  actionsLarge: {
    gap: tokens.spacingHorizontalM,
  },
  titleSmall: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase400,
  },
  titleLarge: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase500,
  },
});
