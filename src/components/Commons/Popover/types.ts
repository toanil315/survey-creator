import { PopoverProps as FuiPopoverProps } from '@fluentui/react-components';

export type PopoverSize = 'small' | 'medium' | 'large';

export interface PopoverProps extends Omit<FuiPopoverProps, 'children' | 'content'> {
  size?: PopoverSize;
  content: React.ReactNode;
  title?: React.ReactNode;
  children: React.ReactNode;
  actions?: React.ReactNode;
}
