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
        fillRule='nonzero'
        d='M19 4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h14ZM5 14v4h6v-4H5Zm14 0h-6v4h6v-4Zm0-6h-6v4h6V8ZM5 12h6V8H5v4Z'
      ></path>
    </svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
