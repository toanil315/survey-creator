import { Input, InputProps } from '@/components/Commons';
import { useFormContext } from 'react-hook-form';
import { CustomController } from './CustomController';

const RHFInput = <T extends string | number>(
  props: Omit<InputProps<T>, 'onChange'> & { name: string },
) => {
  const { control } = useFormContext();

  return (
    <CustomController
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
