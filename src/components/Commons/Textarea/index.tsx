import {
  Field,
  Textarea as FuiTextarea,
  mergeClasses,
  TextareaProps as FuiTextareaProps,
} from '@fluentui/react-components';
import { TextareaProps } from './types';
import { useTextareaBaseStyles, useTextareaStyles } from './style';

export const Textarea = ({
  label,
  required,
  size = 'medium',
  error,
  value,
  onChange,
  ...restProps
}: TextareaProps) => {
  const textareaBaseClassName = useTextareaBaseStyles();
  const textareaClassNames = useTextareaStyles();

  const handleChange: FuiTextareaProps['onChange'] = (_, data) => {
    onChange && onChange(data.value);
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
      <FuiTextarea
        className={mergeClasses(
          textareaBaseClassName,
          size === 'small' && textareaClassNames.textareaSmall,
          size === 'medium' && textareaClassNames.textareaMedium,
          size === 'large' && textareaClassNames.textareaLarge,
          Boolean(error) && textareaClassNames.textareaError,
        )}
        {...restProps}
        onChange={handleChange}
        value={value}
      />
    </Field>
  );
};
