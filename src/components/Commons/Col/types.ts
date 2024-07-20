import { DetailedHTMLProps } from 'react';

export interface ColProps
  extends DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  //24 Grids System.
  span: number;
  children: React.ReactNode;
}
