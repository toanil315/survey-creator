import * as React from 'react';

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='24'
      height='24'
      focusable='false'
      {...props}
    >
      <g fill-rule='nonzero'>
        <path d='M19 4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h14ZM5 6v12h14V6H5Z'></path>
        <path d='m14.4 8.6 1.1 1-2.4 2.4 2.4 2.4-1.1 1.1-2.4-2.4-2.4 2.4-1-1.1 2.3-2.4-2.3-2.4 1-1 2.4 2.3z'></path>
      </g>
    </svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
