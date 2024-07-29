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
      aria-hidden='true'
      {...props}
    >
      <rect
        width='18'
        height='18'
        x='3'
        y='3'
        rx='2'
      ></rect>
      <path d='M3 9h18'></path>
      <path d='M3 15h18'></path>
      <path d='M9 3v18'></path>
      <path d='M15 3v18'></path>
    </svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
