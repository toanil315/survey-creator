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
      <path d='M16 3h5v5'></path>
      <path d='M8 3H3v5'></path>
      <path d='M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3'></path>
      <path d='m15 9 6-6'></path>
    </svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
