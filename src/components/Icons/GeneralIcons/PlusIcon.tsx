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
        d='M6 6V0H8V6H14V8H8V14H6V8H0V6H6Z'
        fill={props.fill || '#232525'}
      />
    </svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
