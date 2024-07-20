import * as React from 'react';

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='6'
      height='8'
      viewBox='0 0 6 8'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M2.85667 4.00001L5.21417 6.35667L4.03583 7.53584L0.5 4.00001L4.03583 0.464172L5.21417 1.64334L2.85667 4.00001Z'
        fill='#707171'
      />
    </svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
