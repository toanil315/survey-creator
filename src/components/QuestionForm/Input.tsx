import { Input, InputProps } from '@/components/Commons';
import { useFormContext } from 'react-hook-form';
import { CustomController } from './CustomController';

const RHFInput = <T extends string | number>(props: InputProps<T> & { name: string }) => {
  const { control } = useFormContext();

  return (
    <CustomController
      render={({ field, fieldState }) => (
        <Input
          error={fieldState.error?.message}
          {...props}
          {...field}
          onChange={(...event: Parameters<NonNullable<InputProps<T>['onChange']>>) => {
            props.onChange && props.onChange(...event);
            field.onChange(...event);
          }}
        />
      )}
      name={props.name || ''}
      control={control}
    />
  );
};

export default RHFInput;
