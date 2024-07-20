import { Textarea, TextareaProps } from '@/components/Commons';
import { Controller, useFormContext } from 'react-hook-form';

const RHFTextarea = (props: Omit<TextareaProps, 'onChange'> & { name: string }) => {
  const { control } = useFormContext();

  return (
    <Controller
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
