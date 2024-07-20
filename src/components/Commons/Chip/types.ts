import { TagProps } from '@fluentui/react-components';

export type ChipColor = 'default' | 'intro' | 'success' | 'warning' | 'error';

export type ChipSize = 'small' | 'medium' | 'large';

export interface ChipProps extends Omit<TagProps, 'children' | 'size'> {
  color?: ChipColor;
  size?: ChipSize;
  children: React.ReactNode;
}
