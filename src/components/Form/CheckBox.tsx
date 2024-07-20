import { Checkbox, CheckboxProps } from '@/components/Commons';
import { Controller, useFormContext } from 'react-hook-form';

const RHFCheckBox = (props: Omit<CheckboxProps, 'onChange'> & { name: string }) => {
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field, fieldState }) => (
        <Checkbox
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

export default RHFCheckBox;
