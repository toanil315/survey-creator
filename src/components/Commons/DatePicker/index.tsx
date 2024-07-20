import { DatePicker as FuiDatePicker } from '@fluentui/react-datepicker-compat';
import { DatePickerProps } from './types';
import { Field, mergeClasses } from '@fluentui/react-components';
import { useDatePickerBaseStyles, useDatePickerStyles } from './style';

export const DatePicker = ({
  label,
  required,
  size = 'medium',
  onChange,
  error,
  ...restProps
}: DatePickerProps) => {
  const datePickerBaseClassName = useDatePickerBaseStyles();
  const datePickerClassNames = useDatePickerStyles();

  const handleChange = (date?: Date | null) => {
    onChange && onChange(date || null);
  };

  return (
    <Field
      label={label}
      required={required}
      size={size}
      {...(Boolean(error)
        ? {
            validationState: 'error',
            validationMessage: error,
          }
        : {})}
    >
      <FuiDatePicker
        className={mergeClasses(
          datePickerBaseClassName,
          size === 'small' && datePickerClassNames.datePickerSmall,
          size === 'medium' && datePickerClassNames.datePickerMedium,
          size === 'large' && datePickerClassNames.datePickerLarge,
          Boolean(error) && datePickerClassNames.datePickerError,
        )}
        {...restProps}
        onSelectDate={handleChange}
      />
    </Field>
  );
};
