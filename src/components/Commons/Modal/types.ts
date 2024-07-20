import { useModal } from '@/hooks';
import { DialogProps } from '@fluentui/react-components';

export type ModalSize = 'xsmall' | 'small' | 'medium' | 'large';

export interface ModalProps extends Omit<DialogProps, 'children'> {
  size?: ModalSize;
  modal: ReturnType<typeof useModal>;
  title?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  hasCloseIcon?: boolean;
}
