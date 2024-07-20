import { MenuProps, MenuItemProps } from '@fluentui/react-components';

export interface OverflowMenuItem {
  key: string;
  label: React.ReactNode;
  icon?: MenuItemProps['icon'];
  onClick?: MenuItemProps['onClick'];
}

export interface OverflowMenuProps extends Omit<MenuProps, 'children'> {
  items: OverflowMenuItem[];
  children: React.ReactNode;
}
