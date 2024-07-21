import { Textarea, TextareaProps } from '@/components/Commons';
import { useFormContext } from 'react-hook-form';
import { CustomController } from './CustomController';

const RHFTextarea = (props: Omit<TextareaProps, 'onChange'> & { name: string }) => {
  const { control } = useFormContext();

  return (
    <CustomController
      render={({ field, fieldState }) => (
        <Textarea
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

export default RHFTextarea;
