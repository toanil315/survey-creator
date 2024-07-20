import { DetailedHTMLProps } from 'react';

export interface RowProps
  extends DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  gutter?: number | [number, number];
  children: React.ReactNode;
}
