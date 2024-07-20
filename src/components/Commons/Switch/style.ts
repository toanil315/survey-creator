import { makeResetStyles, switchClassNames } from '@fluentui/react-components';

export const useSwitchBaseStyles = makeResetStyles({
  [`& .${switchClassNames.indicator}`]: {
    marginLeft: '0px',
  },
});
