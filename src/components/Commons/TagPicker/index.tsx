import * as React from 'react';
import {
  TagPicker as FuiTagPicker,
  TagPickerList,
  TagPickerInput,
  TagPickerControl,
  TagPickerOption,
  TagPickerGroup,
  TagPickerOptionGroup,
  mergeClasses,
} from '@fluentui/react-components';
import { Tag, Field } from '@fluentui/react-components';
import { TagPickerOptionItem, TagPickerProps } from './types';
import { flatten } from '@/utils';
import { useTagPickerFilter } from './useTagPickerFilter';
import { useTagPickerBaseStyles, useTagPickerStyles } from './style';

export const TagPicker = ({
  size = 'medium',
  options,
  error,
  label,
  required,
  value = [],
  onChange,
  ...restProps
}: TagPickerProps) => {
  const tagPickerBaseClassName = useTagPickerBaseStyles();
  const tagPickerClassNames = useTagPickerStyles();

  const [query, setQuery] = React.useState<string>('');
  const handleChange: TagPickerProps['onOptionSelect'] = (_, data) => {
    if (data.value === 'no-matches') {
      return;
    }
    onChange && onChange(data.selectedOptions);
    setQuery('');
  };

  const flattenedOptions = React.useMemo(() => {
    return flatten(
      options.map((option) => {
        if (option.group) {
          return option.group.options.map((subOption) => ({
            ...subOption,
            inGroup: option.group?.label,
          }));
        }
        return option;
      }),
    ).filter(Boolean) as TagPickerOptionItem[];
  }, [options]);

  const mapOptions = React.useMemo(() => {
    return new Map(flattenedOptions.map((option) => [option.value, option]));
  }, [flattenedOptions]);

  const filteredOptions = useTagPickerFilter({
    query,
    options: flattenedOptions,
    value,
  });

  const renderOptions = () => {
    const remainingOptions = options.filter(
      (option) => option.group || (option.value && filteredOptions.has(option.value)),
    );

    return remainingOptions.map((option) => {
      if (option.group) {
        return (
          <TagPickerOptionGroup
            key={option.group.label}
            label={option.group.label}
          >
            {option.group.options
              .filter((subOption) => subOption.value && filteredOptions.has(subOption.value))
              .map((subOption) => {
                return (
                  <TagPickerOption
                    value={subOption.value!}
                    key={subOption.value}
                    text={subOption.label || ''}
                  >
                    {subOption.renderFunction?.(subOption) || subOption.label || subOption.value}
                  </TagPickerOption>
                );
              })}
          </TagPickerOptionGroup>
        );
      }

      if (option)
        return (
          <TagPickerOption
            value={option.value!}
            key={option.value}
            text={option.label || ''}
          >
            {option.renderFunction?.(option) || option.label || option.value}
          </TagPickerOption>
        );
    });
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
      <FuiTagPicker
        onOptionSelect={handleChange}
        selectedOptions={value}
        {...restProps}
      >
        <TagPickerControl
          className={mergeClasses(
            tagPickerBaseClassName,
            size === 'small' && tagPickerClassNames.small,
            size === 'medium' && tagPickerClassNames.medium,
            size === 'large' && tagPickerClassNames.large,
            Boolean(error) && tagPickerClassNames.error,
          )}
        >
          <TagPickerGroup>
            {value.map((selectedOptionValue) => {
              const option = mapOptions.get(selectedOptionValue);

              if (!option) return null;

              return (
                <Tag
                  key={selectedOptionValue}
                  value={selectedOptionValue}
                >
                  {option.renderFunction?.(option) || option.label || option.value}
                </Tag>
              );
            })}
          </TagPickerGroup>
          <TagPickerInput
            placeholder=''
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </TagPickerControl>

        <TagPickerList>
          {Array.from(filteredOptions).length === 0 ? (
            <TagPickerOption value='no-matches'>We couldn't find any matches</TagPickerOption>
          ) : (
            renderOptions()
          )}
        </TagPickerList>
      </FuiTagPicker>
    </Field>
  );
};
