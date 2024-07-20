import * as React from 'react';

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 16 16'
      {...props}
    >
      <path
        fill={props.fill || 'currentColor'}
        d='M3 6h2v1H3zm3 0h7v1H6zM3 8h2v1H3zm3 0h7v1H6zm-3 2h2v1H3zm3 0h7v1H6z'
      />
      <path
        fill={props.fill || 'currentColor'}
        d='M0 1v14h16V1zm15 13H1V4h14zm0-11h-1V2h1z'
      />
    </svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
