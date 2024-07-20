import * as React from 'react';

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='12'
      height='12'
      viewBox='0 0 12 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M6 4.82178L10.125 0.696777L11.3033 1.87511L7.17834 6.00011L11.3033 10.1251L10.125 11.3034L6 7.17844L1.875 11.3034L0.696671 10.1251L4.82167 6.00011L0.696671 1.87511L1.875 0.696777L6 4.82178Z'
        fill={props.fill || '#232525'}
      />
    </svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
