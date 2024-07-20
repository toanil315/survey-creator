import { DatePicker, DatePickerProps } from '@/components/Commons';
import { Controller, useFormContext } from 'react-hook-form';

const RHFDatePicker = (props: Omit<DatePickerProps, 'onChange'> & { name: string }) => {
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field, fieldState }) => (
        <DatePicker
          error={fieldState.error?.message}
          {...props}
          {...field}
        />
      )}
      name={props.name || ''}
      control={control}
    />
  );
};

export default RHFDatePicker;
