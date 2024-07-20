import * as React from 'react';

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='14'
      height='14'
      viewBox='0 0 14 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M7.83331 10.4766L12.3033 6.00658L13.4816 7.18492L6.99998 13.6666L0.518311 7.18492L1.69664 6.00658L6.16664 10.4766V0.333252H7.83331V10.4766Z'
        fill='#353636'
      />
    </svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
