import { InputProps as FuiInputProps } from '@fluentui/react-components';

export type InputSize = 'small' | 'medium' | 'large';

export interface InputProps<T> extends Omit<FuiInputProps, 'value' | 'onChange'> {
  label?: string;
  required?: boolean;
  size?: InputSize;
  error?: string;
  value?: T;
  onChange?: (value: T) => void;
}
