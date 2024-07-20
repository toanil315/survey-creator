import { SliderProps as FuiSliderProps } from '@fluentui/react-components';

export type SliderSize = 'small' | 'medium' | 'large';

export interface SliderProps extends Omit<FuiSliderProps, 'value' | 'onChange' | 'size'> {
  size?: SliderSize;
  label?: string;
  required?: boolean;
  error?: string;
  value?: number;
  onChange?: (value: number) => void;
  milestone?: number;
  showMilestoneValue?: boolean;
}
