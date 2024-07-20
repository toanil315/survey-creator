import { ComboboxProps } from '@fluentui/react-components';

export type SelectSize = 'small' | 'medium' | 'large';

export interface SelectOption {
  value?: string;
  label?: string;
  renderFunction?: (option: Omit<SelectOption, 'group'>) => React.ReactNode;
  disabled?: boolean;
  group?: {
    label: string;
    options: SelectOption[];
  };
}

export interface SelectProps<T> extends Omit<ComboboxProps, 'value' | 'onChange'> {
  size?: SelectSize;
  label?: string;
  required?: boolean;
  error?: string;
  value?: T;
  options: SelectOption[];
  onChange?: (value: T) => void;
}
