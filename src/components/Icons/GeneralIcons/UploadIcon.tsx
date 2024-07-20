import * as React from 'react';

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='40'
      height='40'
      viewBox='0 0 40 40'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M6.66667 31.6667H33.3333V20H36.6667V33.3333C36.6667 33.7754 36.4911 34.1993 36.1785 34.5118C35.866 34.8244 35.442 35 35 35H5C4.55797 35 4.13405 34.8244 3.82149 34.5118C3.50893 34.1993 3.33333 33.7754 3.33333 33.3333V20H6.66667V31.6667Z'
        fill='#1D766E'
      />
      <path
        d='M23.3333 14.9999V24.9999H16.6667V14.9999H8.33333L20 3.33325L31.6667 14.9999H23.3333Z'
        fill='#1D766E'
      />
    </svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
