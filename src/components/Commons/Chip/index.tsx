import { ChipProps } from './types';
import { Tag, mergeClasses } from '@fluentui/react-components';
import { useTagBaseStyles, useTagStyles } from './style';

const Chip = ({ children, size = 'medium', color, ...restProps }: ChipProps) => {
  const tagBaseClassName = useTagBaseStyles();
  const tagClassNames = useTagStyles();

  return (
    <Tag
      className={mergeClasses(
        tagBaseClassName,
        size === 'small' && tagClassNames.small,
        size === 'medium' && tagClassNames.medium,
        size === 'large' && tagClassNames.large,
        color === 'intro' && tagClassNames.intro,
        color === 'success' && tagClassNames.success,
        color === 'warning' && tagClassNames.warning,
        color === 'error' && tagClassNames.error,
      )}
      {...restProps}
    >
      {children}
    </Tag>
  );
};

export default Chip;
