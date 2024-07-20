import { DatePickerProps as FuiDatePickerProps } from '@fluentui/react-datepicker-compat';

export type DatePickerSize = 'small' | 'medium' | 'large';

export interface DatePickerProps extends Omit<FuiDatePickerProps, 'value' | 'onChange'> {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  label?: string;
  required?: boolean;
  size?: DatePickerSize;
  error?: string;
}
