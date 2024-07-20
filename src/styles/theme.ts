import {
  BrandVariants,
  Theme,
  createLightTheme,
  createDarkTheme,
} from '@fluentui/react-components';

const myNewTheme: BrandVariants = {
  10: '#020404',
  20: '#101C1A',
  30: '#152E2B',
  40: '#183C38',
  50: '#1B4945',
  60: '#1C5852',
  70: '#1D6660',
  80: '#1D766E',
  90: '#1C857C',
  100: '#1A958B',
  110: '#15A59A',
  120: '#0DB5A9',
  130: '#18C5B9',
  140: '#62D1C6',
  150: '#8EDDD3',
  160: '#B4E8E1',
};

const lightTheme: Theme = {
  ...createLightTheme(myNewTheme),
};

const darkTheme: Theme = {
  ...createDarkTheme(myNewTheme),
};

darkTheme.colorBrandForeground1 = myNewTheme[110];
darkTheme.colorBrandForeground2 = myNewTheme[120];

export { lightTheme, darkTheme };
