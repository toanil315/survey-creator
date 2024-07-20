import {
  makeResetStyles,
  makeStyles,
  shorthands,
  tagPickerControlClassNames,
  tagPickerGroupClassNames,
  tagPickerInputClassNames,
  tokens,
} from '@fluentui/react-components';

export const useTagPickerBaseStyles = makeResetStyles({
  height: 'max-content',
  [`& .${tagPickerInputClassNames.root}`]: {
    ...shorthands.padding('0px'),
  },
  [`& .${tagPickerGroupClassNames.root}`]: {
    ...shorthands.padding('0px'),
  },
  [`& .${tagPickerControlClassNames.aside}`]: {
    display: 'flex',
    alignItems: 'center',
  },
});

export const useTagPickerStyles = makeStyles({
  small: {
    ...shorthands.padding(tokens.spacingVerticalS),
  },
  medium: {
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM),
  },
  large: {
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalL),
  },
  error: {
    ...shorthands.borderColor(`${tokens.colorPaletteRedBackground3} !important`),
    ':after': {
      borderBottomColor: `${tokens.colorPaletteRedBackground3} !important`,
    },
  },
});
