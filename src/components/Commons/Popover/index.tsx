import React, { forwardRef } from 'react';
import { PopoverProps } from './types';
import {
  Popover as FuiPopover,
  PopoverSurface,
  PopoverTrigger,
  PopoverTriggerChildProps,
  mergeClasses,
} from '@fluentui/react-components';
import { usePopoverActionsBaseStyles, usePopoverBaseStyles, usePopoverStyles } from './style';

export const Popover = ({
  children,
  content,
  title,
  actions,
  size = 'medium',
  ...restProps
}: PopoverProps) => {
  const popoverBaseClassName = usePopoverBaseStyles();
  const popoverActionsBaseClassName = usePopoverActionsBaseStyles();
  const popoverClassNames = usePopoverStyles();

  return (
    <FuiPopover
      positioning={{
        offset: {
          crossAxis: 0,
          mainAxis: 10,
        },
      }}
      withArrow
      {...restProps}
    >
      <PopoverTrigger disableButtonEnhancement>
        <CustomMenuTrigger>{children}</CustomMenuTrigger>
      </PopoverTrigger>
      <PopoverSurface
        className={mergeClasses(
          popoverBaseClassName,
          size === 'small' && popoverClassNames.small,
          size === 'medium' && popoverClassNames.medium,
          size === 'large' && popoverClassNames.large,
        )}
      >
        {title && (
          <h3
            className={mergeClasses(
              (size === 'small' || size === 'medium') && popoverClassNames.titleSmall,
              size === 'large' && popoverClassNames.titleLarge,
            )}
          >
            {title}
          </h3>
        )}
        {content}
        {actions && (
          <div
            className={mergeClasses(
              popoverActionsBaseClassName,
              size === 'small' && popoverClassNames.actionsSmall,
              size === 'medium' && popoverClassNames.actionsMedium,
              size === 'large' && popoverClassNames.actionsLarge,
            )}
          >
            {actions}
          </div>
        )}
      </PopoverSurface>
    </FuiPopover>
  );
};

const CustomMenuTrigger = forwardRef<
  HTMLDivElement,
  Partial<PopoverTriggerChildProps> & { children: React.ReactNode }
>(({ children, ...restProps }, ref) => {
  return (
    <div
      {...restProps}
      ref={ref}
    >
      {children}
    </div>
  );
});
