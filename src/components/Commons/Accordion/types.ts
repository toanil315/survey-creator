import {
  AccordionHeaderProps,
  AccordionProps as FuiAccordionProps,
} from '@fluentui/react-components';

export interface AccordionItem {
  key: string;
  title: React.ReactNode;
  container: React.ReactNode;
  headerIcon?: AccordionHeaderProps['icon'];
  helperText?: React.ReactNode;
}

export interface AccordionProps extends Omit<FuiAccordionProps<string>, 'title'> {
  items: AccordionItem[];
  accordionIcon?: {
    expand: React.ReactNode;
    collapse: React.ReactNode;
  };
}
