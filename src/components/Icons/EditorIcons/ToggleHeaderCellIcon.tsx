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
        d='M19 4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h14Zm-8 9H5v5h6v-5Zm8 0h-6v5h6v-5Zm-8-7H5v5h6V6Z'
      ></path>
    </svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
