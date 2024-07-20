import * as React from 'react';

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='24'
      height='24'
      focusable='false'
      {...props}
    >
      <path
        fill-rule='nonzero'
        d='M19 4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a1 1 0 0 1-1-1v-2a1 1 0 0 1 2 0v1h8V6H5v1a1 1 0 1 1-2 0V5c0-.6.4-1 1-1h15Zm0 9h-4v5h4v-5ZM8 8c.5 0 1 .4 1 .9V11h2a1 1 0 0 1 .1 2H9v2a1 1 0 0 1-2 .1V13H5a1 1 0 0 1-.1-2H7V9c0-.6.4-1 1-1Zm11-2h-4v5h4V6Z'
      ></path>
    </svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
