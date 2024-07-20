import { TagPickerOptionItem, UseTagPickerFilterParams } from './types';

export const useTagPickerFilter = ({ query = '', options, value }: UseTagPickerFilterParams) => {
  const filterFunction = (option: TagPickerOptionItem) => {
    return (
      !value.includes(option.value || '') &&
      Boolean(option.label?.toLowerCase()?.includes(query.toLowerCase()))
    );
  };

  return new Set(
    options
      .filter(filterFunction)
      .map((option) => option.value || '')
      .filter(Boolean),
  );
};
