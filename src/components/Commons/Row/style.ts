import { makeResetStyles } from '@fluentui/react-components';

export const useRowBaseStyles = makeResetStyles({
  boxSizing: 'border-box',
  display: 'flex',
  flexFlow: 'row wrap',
  minWidth: '0px',
});
