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
        d='M19 4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h14Zm-4 4h-2V6h-2v2H9V6H5v12h4v-2h2v2h2v-2h2v2h4V6h-4v2Zm.3.5 1 1.2-3 2.3 3 2.3-1 1.2L12 13l-3.3 2.6-1-1.2 3-2.3-3-2.3 1-1.2L12 11l3.3-2.5Z'
      ></path>
    </svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
