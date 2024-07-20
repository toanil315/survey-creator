import * as React from 'react';

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='18'
      height='16'
      viewBox='0 0 18 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M8.95831 4.63452L7.77998 5.81285L5.66665 3.69952V14.6762H3.99998V3.69952L1.88748 5.81285L0.708313 4.63452L4.83331 0.509521L8.95831 4.63452ZM17.2916 11.3845L13.1666 15.5095L9.04165 11.3845L10.22 10.2062L12.3341 12.3195L12.3333 1.34285H14V12.3195L16.1133 10.2062L17.2916 11.3845Z'
        fill='#353636'
      />
    </svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
