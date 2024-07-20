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
        d='M14.4 3H7a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h10a2 2 0 0 0 2-2V7.6L14.4 3ZM17 19H7V5h6v4h4v10Z'
        fill-rule='nonzero'
      ></path>
    </svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
