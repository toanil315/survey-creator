import { useColBaseStyles } from './style';
import { ColProps } from './types';

const GRID_SYSTEM = 24;

export const Col = ({ children, span, ...restProps }: ColProps) => {
  const colBaseClassName = useColBaseStyles();
  const widthPercent = Number((span / GRID_SYSTEM).toFixed(2)) * 100;

  return (
    <div
      {...restProps}
      className={colBaseClassName}
      style={{
        ...(restProps.style || {}),
        maxWidth: `${widthPercent}%`,
        flex: `0 0 ${widthPercent}%`,
      }}
    >
      {children}
    </div>
  );
};
