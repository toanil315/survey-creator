import { ShowToastParams } from './types';

export const SHOW_TOAST_KEY = 'SHOW_TOAST_KEY';

declare global {
  interface WindowEventMap {
    [SHOW_TOAST_KEY]: CustomEvent<ShowToastParams>;
  }
}
