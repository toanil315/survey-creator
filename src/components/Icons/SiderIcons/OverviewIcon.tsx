import * as React from 'react';

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M0.5 0.5H7.16667V7.16667H0.5V0.5ZM0.5 8.83333H7.16667V15.5H0.5V8.83333ZM8.83333 0.5H15.5V7.16667H8.83333V0.5ZM8.83333 8.83333H15.5V15.5H8.83333V8.83333ZM10.5 2.16667V5.5H13.8333V2.16667H10.5ZM10.5 10.5V13.8333H13.8333V10.5H10.5ZM2.16667 2.16667V5.5H5.5V2.16667H2.16667ZM2.16667 10.5V13.8333H5.5V10.5H2.16667Z'
        fill='#444646'
      />
    </svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
