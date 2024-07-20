import * as React from 'react';

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='16'
      height='18'
      viewBox='0 0 16 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M15.5 14H3C2.77899 14 2.56702 14.0878 2.41074 14.2441C2.25446 14.4003 2.16667 14.6123 2.16667 14.8333C2.16667 15.0543 2.25446 15.2663 2.41074 15.4226C2.56702 15.5789 2.77899 15.6667 3 15.6667H15.5V17.3333H3C2.33696 17.3333 1.70107 17.0699 1.23223 16.6011C0.763392 16.1322 0.5 15.4964 0.5 14.8333V2.33332C0.5 1.8913 0.675595 1.46737 0.988155 1.15481C1.30072 0.842251 1.72464 0.666656 2.16667 0.666656H15.5V14ZM2.16667 12.375C2.30167 12.3475 2.44083 12.3333 2.58333 12.3333H13.8333V2.33332H2.16667V12.375ZM11.3333 6.49999H4.66667V4.83332H11.3333V6.49999Z'
        fill='#444646'
      />
    </svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
