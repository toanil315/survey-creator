import { Select, SelectProps } from '@/components/Commons';
import { useFormContext } from 'react-hook-form';
import { CustomController } from './CustomController';

const RHFSelect = <T extends string | string[]>(
  props: Omit<SelectProps<T>, 'onChange'> & { name: string },
) => {
  const { control } = useFormContext();

  return (
    <CustomController
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
