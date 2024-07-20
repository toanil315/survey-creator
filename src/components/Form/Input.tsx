import { Input, InputProps } from '@/components/Commons';
import { Controller, useFormContext } from 'react-hook-form';

const RHFInput = <T extends string | number>(
  props: Omit<InputProps<T>, 'onChange'> & { name: string },
) => {
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field, fieldState }) => (
        <Input
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

export default RHFInput;
