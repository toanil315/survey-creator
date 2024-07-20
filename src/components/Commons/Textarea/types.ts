import { TextareaProps as FuiTextareaProps } from '@fluentui/react-components';

export type TextareaSize = 'small' | 'medium' | 'large';

export interface TextareaProps extends Omit<FuiTextareaProps, 'value' | 'onChange'> {
  label?: string;
  required?: boolean;
  size?: TextareaSize;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
}
