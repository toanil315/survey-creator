import { Button as FuiButton, mergeClasses, Spinner } from '@fluentui/react-components';
import { useButtonBaseStyles, useButtonStyles } from './style';
import { ButtonProps } from './types';

export const Button = ({ size = 'medium', loading, ...restProps }: ButtonProps) => {
  const buttonBaseClassName = useButtonBaseStyles();
  const buttonClassNames = useButtonStyles();

  return (
    <FuiButton
      className={mergeClasses(
        buttonBaseClassName,
        size === 'small' && buttonClassNames.buttonSmall,
        size === 'medium' && buttonClassNames.buttonMedium,
        size === 'large' && buttonClassNames.buttonLarge,
        loading && buttonClassNames.buttonLoading,
      )}
      {...restProps}
      icon={loading ? <Spinner size='tiny' /> : restProps.icon}
      onClick={loading ? undefined : (restProps.onClick as any)}
    />
  );
};
