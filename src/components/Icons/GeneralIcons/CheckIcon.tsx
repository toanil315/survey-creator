import * as React from 'react';

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden='true'
      width='12'
      height='12'
      viewBox='0 0 12 12'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M9.76 3.2c.3.29.32.76.04 1.06l-4.25 4.5a.75.75 0 0 1-1.08.02L2.22 6.53a.75.75 0 0 1 1.06-1.06l1.7 1.7L8.7 3.24a.75.75 0 0 1 1.06-.04Z'
        fill={props.fill || 'currentColor'}
      ></path>
    </svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
