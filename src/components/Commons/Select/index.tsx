import { SelectProps } from './types';
import {
  Combobox,
  ComboboxProps,
  Field,
  Option,
  OptionGroup,
  mergeClasses,
} from '@fluentui/react-components';
import { useSelectBaseStyles, useSelectStyles } from './style';
import { useMemo } from 'react';

export const Select = <T extends string | string[]>({
  label,
  required,
  error,
  size = 'medium',
  options,
  value,
  onChange,
  ...restProps
}: SelectProps<T>) => {
  const selectBaseClassName = useSelectBaseStyles();
  const selectClassNames = useSelectStyles();

  const handleChange: ComboboxProps['onOptionSelect'] = (_, data) => {
    if (restProps.multiselect) {
      onChange && onChange(data.selectedOptions as T);
      return;
    }
    onChange && onChange(data.optionValue as T);
  };

  const mapOptions = useMemo(() => {
    return new Map(options.map((option) => [option.value, option]));
  }, [options]);

  const renderOptions = () => {
    return options.map((option, index) => {
      if (option.group) {
        return (
          <OptionGroup
            key={option.group.label}
            label={option.group.label}
          >
            {option.group.options.map((subOption, subIndex) => {
              const alternativeKey = `${index}-${subIndex}`;

              return (
                <Option
                  className={mergeClasses(
                    size === 'small' && selectClassNames.optionSmall,
                    size === 'medium' && selectClassNames.optionMedium,
                    size === 'large' && selectClassNames.optionLarge,
                  )}
                  text={subOption.value || alternativeKey}
                  value={subOption.value || alternativeKey}
                  key={subOption.value}
                  disabled={subOption.disabled}
                >
                  {subOption.label || 'Empty Label'}
                </Option>
              );
            })}
          </OptionGroup>
        );
      }

      return (
        <Option
          className={mergeClasses(
            size === 'small' && selectClassNames.optionSmall,
            size === 'medium' && selectClassNames.optionMedium,
            size === 'large' && selectClassNames.optionLarge,
          )}
          text={option.label || String(index)}
          value={option.value}
          key={option.value}
          disabled={option.disabled}
        >
          {option.renderFunction?.(option) || option.label || 'Empty Label'}
        </Option>
      );
    });
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
      <Combobox
        className={mergeClasses(
          selectBaseClassName,
          size === 'small' && selectClassNames.small,
          size === 'medium' && selectClassNames.medium,
          size === 'large' && selectClassNames.large,
          Boolean(error) && selectClassNames.error,
        )}
        {...restProps}
        onOptionSelect={handleChange}
        selectedOptions={Array.isArray(value) ? value : [value || '']}
        {...(restProps.multiselect && Array.isArray(value)
          ? { value: value.map((v) => mapOptions.get(v)?.label).join(', ') }
          : { value: value ? mapOptions.get(value as string)?.label : '' })}
      >
        {renderOptions()}
      </Combobox>
    </Field>
  );
};
