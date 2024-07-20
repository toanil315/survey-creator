import * as React from 'react';

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='14'
      height='17'
      viewBox='0 0 14 17'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M8.66671 9.67619V14.6762L5.33337 16.3429V9.67619L0.333374 2.17619V0.509521H13.6667V2.17619L8.66671 9.67619ZM2.33671 2.17619L7.00004 9.17119L11.6634 2.17619H2.33671Z'
        fill={props.fill || '#353636'}
      />
    </svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
