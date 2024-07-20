import React from 'react';
import { useRowBaseStyles } from './style';
import { RowProps } from './types';

export const Row = ({ gutter, children, style }: RowProps) => {
  const rowBaseClassName = useRowBaseStyles();
  const isGutterArray = Array.isArray(gutter);
  const columnGutter = isGutterArray ? gutter[0] : gutter || 0;
  const rowGutter = isGutterArray ? gutter[1] : 0;

  return (
    <div
      className={rowBaseClassName}
      style={{
        ...(style || {}),
        rowGap: rowGutter,
        marginLeft: (-1 * columnGutter) / 2,
        marginRight: (-1 * columnGutter) / 2,
      }}
    >
      {React.Children.map(children, (c: any) => {
        if (c) {
          return React.cloneElement(c, {
            style: {
              ...c?.props?.style,
              paddingRight: columnGutter / 2,
              paddingLeft: columnGutter / 2,
            },
          });
        }
        return null;
      })}
    </div>
  );
};
