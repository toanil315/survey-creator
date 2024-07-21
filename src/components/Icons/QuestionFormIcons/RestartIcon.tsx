import * as React from 'react';

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
      {...props}
    >
      <path d='m2 9 3-3 3 3'></path>
      <path d='M13 18H7a2 2 0 0 1-2-2V6'></path>
      <path d='m22 15-3 3-3-3'></path>
      <path d='M11 6h6a2 2 0 0 1 2 2v10'></path>
    </svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;