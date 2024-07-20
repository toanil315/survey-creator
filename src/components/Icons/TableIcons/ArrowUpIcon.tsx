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
        d='M7.83331 3.52325V13.6666H6.16664V3.52325L1.69664 7.99325L0.518311 6.81492L6.99998 0.333252L13.4816 6.81492L12.3033 7.99325L7.83331 3.52325Z'
        fill='#353636'
      />
    </svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
