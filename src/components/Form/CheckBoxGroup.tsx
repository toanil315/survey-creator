import { Checkbox, CheckboxGroupProps } from '@/components/Commons';
import { Controller, useFormContext } from 'react-hook-form';

const RHFCheckBoxGroup = (props: Omit<CheckboxGroupProps, 'onChange'> & { name: string }) => {
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field, fieldState }) => (
        <Checkbox.Group
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

export default RHFCheckBoxGroup;
