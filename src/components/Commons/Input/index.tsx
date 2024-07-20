import {
  Field,
  Input as FuiInput,
  mergeClasses,
  InputProps as FuiInputProps,
} from '@fluentui/react-components';
import { InputProps } from './types';
import { useInputBaseStyles, useInputStyles } from './style';
import { NumberUtil } from '@/utils';

export const Input = <T extends string | number>({
  label,
  required,
  size = 'medium',
  error,
  value,
  type,
  onChange,
  ...restProps
}: InputProps<T>) => {
  const inputBaseClassName = useInputBaseStyles();
  const inputClassNames = useInputStyles();
  const inputType = type !== 'number' ? type : 'text';

  const handleChange: FuiInputProps['onChange'] = (_, data) => {
    let value = data.value;
    const isUnfinishedNumber = value.at(-1) !== '.' && `${value.at(-2)}${value.at(-1)}` !== '.0';

    if (type === 'number' && isUnfinishedNumber) {
      value = value.replace(/[a-zA-Z]/g, '');
      onChange && onChange(NumberUtil.parserNumber(value || 0) as T);
      return;
    }

    onChange && onChange(value as T);
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
      <FuiInput
        className={mergeClasses(
          inputBaseClassName,
          size === 'small' && inputClassNames.inputSmall,
          size === 'medium' && inputClassNames.inputMedium,
          size === 'large' && inputClassNames.inputLarge,
          Boolean(error) && inputClassNames.inputError,
        )}
        {...restProps}
        onChange={handleChange}
        type={inputType}
        value={type === 'number' ? NumberUtil.formatterNumber(String(value)) : String(value)}
      />
    </Field>
  );
};
