import { TagPicker, TagPickerProps } from '@/components/Commons';
import { Controller, useFormContext } from 'react-hook-form';

const RHFTagPicker = (props: Omit<TagPickerProps, 'onChange'> & { name: string }) => {
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field, fieldState }) => (
        <TagPicker
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

export default RHFTagPicker;
