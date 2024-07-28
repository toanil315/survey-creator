import { RatingProps as FuiRatingProps } from '@fluentui/react-components';

export type RatingSize = 'small' | 'medium' | 'large';

export interface RatingProps extends Omit<FuiRatingProps, 'value' | 'onChange'> {
  label?: string;
  required?: boolean;
  size?: RatingSize;
  error?: string;
  value?: number;
  onChange?: (value: string) => void;
}
