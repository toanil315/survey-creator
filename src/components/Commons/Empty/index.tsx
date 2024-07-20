import React from 'react';
import { EmptyProps } from './types';
import {
  useEmptyBaseStyles,
  useEmptyDescriptionBaseStyles,
  useEmptyHeaderBaseStyles,
} from './style';

export const Empty = ({ header, description, primaryAction, icon }: EmptyProps) => {
  const emptyBaseClassName = useEmptyBaseStyles();
  const emptyHeaderBaseClassName = useEmptyHeaderBaseStyles();
  const emptyDescriptionBaseClassName = useEmptyDescriptionBaseStyles();

  return (
    <div className={emptyBaseClassName}>
      {icon}
      <div className={emptyHeaderBaseClassName}>{header}</div>
      <div className={emptyDescriptionBaseClassName}>{description}</div>
      {primaryAction}
    </div>
  );
};
