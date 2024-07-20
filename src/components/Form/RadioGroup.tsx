import { RadioGroup, RadioGroupProps } from '@/components/Commons';
import { Controller, useFormContext } from 'react-hook-form';

const RHFRadioGroup = (props: Omit<RadioGroupProps, 'onChange'> & { name: string }) => {
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field, fieldState }) => (
        <RadioGroup
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

export default RHFRadioGroup;
