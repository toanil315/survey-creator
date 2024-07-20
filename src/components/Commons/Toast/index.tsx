import {
  useId,
  Toaster as FuiToaster,
  useToastController,
  Toast as FuiToast,
  ToastTitle,
  ToastBody,
  ToastFooter,
  ToastTrigger,
  Link,
} from '@fluentui/react-components';
import { useEffect } from 'react';
import { ToastProps, ShowToastParams } from './types';
import { SHOW_TOAST_KEY } from './constants';
import { useToastFooterBaseStyles } from './style';

export const Toast = ({ title, body, dismissable, dismiss, actions }: ToastProps) => {
  const toastFooterBaseClassName = useToastFooterBaseStyles();

  return (
    <FuiToast>
      <ToastTitle
        action={
          dismissable ? (
            <ToastTrigger>{dismiss ? (dismiss as any) : <Link>Dismiss</Link>}</ToastTrigger>
          ) : null
        }
      >
        {title}
      </ToastTitle>
      {body && <ToastBody>{body}</ToastBody>}
      {actions && <ToastFooter className={toastFooterBaseClassName}>{actions}</ToastFooter>}
    </FuiToast>
  );
};

export const Toaster = () => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);

  const showToast = ({ props, ...toastOptions }: ShowToastParams) => {
    dispatchToast(<Toast {...props} />, toastOptions);
  };

  useEffect(() => {
    const handleShowToast = (event: CustomEvent<ShowToastParams>) => {
      showToast(event.detail);
    };

    window.addEventListener(SHOW_TOAST_KEY, handleShowToast);

    return () => {
      window.removeEventListener(SHOW_TOAST_KEY, handleShowToast);
    };
  }, []);

  return <FuiToaster toasterId={toasterId} />;
};
