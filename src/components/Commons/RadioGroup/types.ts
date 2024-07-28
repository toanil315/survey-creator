import { RadioGroupProps as FuiRadioGroupProps, RadioProps } from '@fluentui/react-components';

export type RadioSize = 'small' | 'medium' | 'large';

export interface RadioGroupItem {
  value: string;
  label: string;
  render?: (item: RadioGroupItem) => RadioProps['label'];
}

export interface RadioGroupProps extends Omit<FuiRadioGroupProps, 'value' | 'onChange'> {
  items: RadioGroupItem[];
  size?: RadioSize;
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  required?: boolean;
  error?: string;
  appearance?: 'default' | 'border';
}
