import 'i18next';
import { defaultNS, resources } from './index';

declare module 'i18next' {
  // and extend them!
  interface CustomTypeOptions {
    // custom namespace type if you changed it
    defaultNS: typeof defaultNS;
    // custom resources type
    resources: (typeof resources)['en'];
  }
}
