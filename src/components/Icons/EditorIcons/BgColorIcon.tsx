import * as React from 'react';

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='24'
      height='24'
      focusable='false'
      {...props}
    >
      <g fill-rule='evenodd'>
        <path
          d='M3 18h18v3H3z'
          fill='#000000'
        ></path>
        <path
          fill-rule='nonzero'
          d='M7.7 16.7H3l3.3-3.3-.7-.8L10.2 8l4 4.1-4 4.2c-.2.2-.6.2-.8 0l-.6-.7-1.1 1.1zm5-7.5L11 7.4l3-2.9a2 2 0 0 1 2.6 0L18 6c.7.7.7 2 0 2.7l-2.9 2.9-1.8-1.8-.5-.6'
        ></path>
      </g>
    </svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
