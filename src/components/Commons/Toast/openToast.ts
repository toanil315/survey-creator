import { SHOW_TOAST_KEY } from './constants';
import { ShowToastParams } from './types';

export const openToast = (params: ShowToastParams) => {
  window.dispatchEvent(new CustomEvent(SHOW_TOAST_KEY, { detail: params }));
};
