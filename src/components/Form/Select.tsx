import { Select, SelectProps } from '@/components/Commons';
import { Controller, useFormContext } from 'react-hook-form';

const RHFSelect = <T extends string | string[]>(
  props: Omit<SelectProps<T>, 'onChange'> & { name: string },
) => {
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field, fieldState }) => (
        <Select
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

export default RHFSelect;
