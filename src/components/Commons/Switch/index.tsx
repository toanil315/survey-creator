import * as React from 'react';
import { Field, Switch as FuiSwitch } from '@fluentui/react-components';
import { SwitchProps } from './types';
import { useSwitchBaseStyles } from './style';

export const Switch = ({
  size = 'medium',
  label,
  required,
  error,
  checkedText,
  unCheckedText,
  value,
  onChange,
  ...restProps
}: SwitchProps) => {
  const switchBaseClassName = useSwitchBaseStyles();

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(ev.currentTarget.checked);
  };

  return (
    <Field
      label={label}
      size={size}
      required={required}
      {...(Boolean(error)
        ? {
            validationState: 'error',
            validationMessage: error,
          }
        : {})}
    >
      <Field>
        <FuiSwitch
          className={switchBaseClassName}
          checked={Boolean(value)}
          onChange={handleChange}
          label={Boolean(value) ? checkedText : unCheckedText}
          {...restProps}
        />
      </Field>
    </Field>
  );
};
