import { CheckboxProps as FuiCheckboxProps } from '@fluentui/react-components';

export type CheckboxSize = 'small' | 'medium' | 'large';

export interface CheckboxProps extends Omit<FuiCheckboxProps, 'size'> {
  size?: CheckboxSize;
  error?: string;
  appearance?: 'default' | 'border';
}

export interface CheckboxGroupItem {
  value: string;
  label: string;
  render?: (item: CheckboxGroupItem) => FuiCheckboxProps['label'];
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
  appearance?: 'default' | 'border';
}
