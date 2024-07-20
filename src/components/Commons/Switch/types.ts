import { SwitchProps as FuiSwitchProps } from '@fluentui/react-components';

export type SwitchSize = 'small' | 'medium' | 'large';

export interface SwitchProps extends Omit<FuiSwitchProps, 'size' | 'value' | 'onChange'> {
  size?: SwitchSize;
  label?: string;
  required?: boolean;
  error?: string;
  checkedText?: string;
  unCheckedText?: string;
  value?: boolean;
  onChange?: (value: boolean) => void;
}
