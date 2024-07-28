import { Controller, useFormContext } from 'react-hook-form';
import { Rating, RatingProps } from '../Commons';

const RHFRating = (props: Omit<RatingProps, 'onChange'> & { name: string }) => {
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field, fieldState }) => (
        <Rating
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

export default RHFRating;
