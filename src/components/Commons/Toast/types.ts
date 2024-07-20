import { useToastController } from '@fluentui/react-components';

type ToastOptions = Parameters<ReturnType<typeof useToastController>['dispatchToast']>[1];

export interface ToastProps {
  title: React.ReactNode;
  body?: React.ReactNode;
  actions?: React.ReactNode;
  dismissable?: boolean;
  dismiss?: React.ReactNode;
}

export type ShowToastParams = ToastOptions & {
  props: ToastProps;
};
