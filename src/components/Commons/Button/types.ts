import { ButtonProps as FuiButtonProps } from '@fluentui/react-components';

type ButtonSize = 'small' | 'medium' | 'large';

export type ButtonProps = FuiButtonProps & {
  size?: ButtonSize;
  loading?: boolean;
};
