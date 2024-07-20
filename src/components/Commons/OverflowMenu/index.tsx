import {
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  MenuTriggerChildProps,
} from '@fluentui/react-components';
import { OverflowMenuProps } from './types';
import { forwardRef, useMemo } from 'react';
import { useOverflowMenuItemBaseStyle } from './style';

export const OverflowMenu = ({ items, children, ...restProps }: OverflowMenuProps) => {
  const menuItemBaseClassName = useOverflowMenuItemBaseStyle();

  const MenuItems = useMemo(() => {
    return items.map(({ key, label, ...restItem }) => (
      <MenuItem
        className={menuItemBaseClassName}
        key={key}
        {...restItem}
      >
        {label}
      </MenuItem>
    ));
  }, [items]);

  return (
    <Menu {...restProps}>
      <MenuTrigger disableButtonEnhancement>
        <CustomMenuTrigger>{children}</CustomMenuTrigger>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>{MenuItems}</MenuList>
      </MenuPopover>
    </Menu>
  );
};

const CustomMenuTrigger = forwardRef<
  HTMLDivElement,
  Partial<MenuTriggerChildProps> & { children: React.ReactNode }
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
