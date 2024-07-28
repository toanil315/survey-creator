import {
  Field,
  Radio,
  RadioGroup as FuiRadioGroup,
  RadioGroupProps as FuiRadioGroupProps,
  mergeClasses,
} from '@fluentui/react-components';
import { RadioGroupProps } from './types';
import { useRadioGroupBaseStyles, useRadioGroupStyles } from './style';

export const RadioGroup = ({
  items,
  size = 'medium',
  value,
  onChange,
  label,
  required,
  error,
  appearance = 'default',
  ...restProps
}: RadioGroupProps) => {
  const radioGroupBaseClassName = useRadioGroupBaseStyles();
  const radioGroupClassNames = useRadioGroupStyles();

  const handleChange: FuiRadioGroupProps['onChange'] = (_, data) => {
    onChange && onChange(data.value);
  };

  const renderItems = () => {
    return items.map((item) => (
      <Radio
        key={item.value}
        value={item.value}
        label={item.render ? item.render(item) : item.label}
        checked={item.value === value}
        className={mergeClasses(
          radioGroupBaseClassName,
          size === 'small' && radioGroupClassNames.small,
          size === 'medium' && radioGroupClassNames.medium,
          size === 'large' && radioGroupClassNames.large,
          appearance === 'border' && radioGroupClassNames.radioBorder,
          value === item.value && appearance === 'border' && radioGroupClassNames.radioBorderActive,
          Boolean(error) && radioGroupClassNames.error,
        )}
      />
    ));
  };

  return (
    <Field
      size={size}
      label={label}
      required={required}
      {...(Boolean(error)
        ? {
            validationState: 'error',
            validationMessage: error,
          }
        : {})}
    >
      <FuiRadioGroup
        {...restProps}
        onChange={handleChange}
        value={value}
      >
        {renderItems()}
      </FuiRadioGroup>
    </Field>
  );
};
