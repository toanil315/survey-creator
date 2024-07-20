import { TagPickerProps as FuiTagPickerProps } from '@fluentui/react-components';

export type TagPickerSize = 'small' | 'medium' | 'large';

export interface TagPickerOptionItem {
  value?: string;
  label?: string; // use to search/filter option.
  renderFunction?: (option: Omit<TagPickerOptionItem, 'group'>) => React.ReactNode;
  disabled?: boolean;
  group?: {
    label: string;
    options: TagPickerOptionItem[];
  };
}

export interface TagPickerProps
  extends Omit<FuiTagPickerProps, 'value' | 'onChange' | 'size' | 'children'> {
  size?: TagPickerSize;
  label?: string;
  required?: boolean;
  error?: string;
  value?: string[];
  options: TagPickerOptionItem[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
}

export interface UseTagPickerFilterParams {
  query?: string;
  options: TagPickerOptionItem[];
  value: string[];
}
