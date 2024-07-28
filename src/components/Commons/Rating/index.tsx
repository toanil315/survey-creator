import {
  Field,
  Rating as FuiRating,
  RatingProps as FuiRatingProps,
} from '@fluentui/react-components';
import { RatingProps } from './types';

export const Rating = ({
  label,
  required,
  size = 'medium',
  error,
  value,
  onChange,
  ...restProps
}: RatingProps) => {
  const handleChange: FuiRatingProps['onChange'] = (_, data) => {
    onChange && onChange(String(data.value));
  };

  return (
    <Field
      label={label}
      required={required}
      size={size}
      {...(Boolean(error)
        ? {
            validationState: 'error',
            validationMessage: error,
          }
        : {})}
    >
      <FuiRating
        {...restProps}
        onChange={handleChange}
        value={Number(value)}
      />
    </Field>
  );
};
