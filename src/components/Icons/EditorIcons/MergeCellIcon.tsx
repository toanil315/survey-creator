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
        d='M19 4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h14ZM5 15.5V18h3v-2.5H5Zm14-5h-9V18h9v-7.5ZM19 6h-4v2.5h4V6ZM8 6H5v2.5h3V6Zm5 0h-3v2.5h3V6Zm-8 7.5h3v-3H5v3Z'
      ></path>
    </svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
