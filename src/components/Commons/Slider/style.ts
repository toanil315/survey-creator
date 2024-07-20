import { makeResetStyles, makeStyles, sliderClassNames, tokens } from '@fluentui/react-components';

export const useSliderWrapperBaseStyles = makeResetStyles({
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'center',
  paddingBottom: '15px', // 20px is the height of the milestone
});

export const useSliderBaseStyles = makeResetStyles({
  flex: 1,

  [`& .${sliderClassNames.root}`]: {
    width: '100%',
  },

  [`& .${sliderClassNames.rail}`]: {
    position: 'relative',
  },
});

export const useMileStoneBaseStyles = makeResetStyles({
  position: 'absolute',
  left: 0,
  top: '-12px',
});

export const useMileStoneIconBaseStyles = makeResetStyles({
  position: 'absolute',
  transform: 'translateX(-50%)',
  height: '5px',
  width: '1.5px',
  backgroundColor: tokens.colorNeutralForeground3,
});

export const useMileStoneValueBaseStyles = makeResetStyles({
  position: 'absolute',
  top: '18px',
  transform: 'translateX(-50%)',
  color: tokens.colorNeutralForeground3,
});

export const useMileStoneStyles = makeStyles({
  showValue: {
    display: 'block',
  },
  unShowValue: {
    display: 'none',
  },
  highlightedValue: {
    color: tokens.colorBrandForeground1,
  },
  highlightedIcon: {
    backgroundColor: tokens.colorBrandForeground1,
  },
});
