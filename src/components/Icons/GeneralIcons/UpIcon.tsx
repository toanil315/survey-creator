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
        d='M7.99999 7.21865L4.69999 10.5186L3.75732 9.57598L7.99999 5.33331L12.2427 9.57598L11.3 10.5186L7.99999 7.21865Z'
        fill='#232525'
      />
    </svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
