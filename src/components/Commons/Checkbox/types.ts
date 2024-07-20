import { CheckboxProps as FuiCheckboxProps } from '@fluentui/react-components';

export type CheckboxSize = 'small' | 'medium' | 'large';

export interface CheckboxProps extends Omit<FuiCheckboxProps, 'size'> {
  size?: CheckboxSize;
  error?: string;
}

export interface CheckboxGroupItem {
  value: string;
  label: string;
}

export interface CheckboxGroupProps {
  items: CheckboxGroupItem[];
  size?: CheckboxSize;
  value?: string[];
  onChange?: (value: string[]) => void;
  label?: string;
  required?: boolean;
  direction?: 'row' | 'column';
  error?: string;
}
