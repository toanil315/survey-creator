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
        d='M18 8H6a3 3 0 0 0-3 3v6h2v3h14v-3h2v-6a3 3 0 0 0-3-3Zm-1 10H7v-4h10v4Zm.5-5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5Zm.5-8H6v2h12V5Z'
        fill-rule='nonzero'
      ></path>
    </svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
