import * as React from 'react';

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='18'
      height='19'
      viewBox='0 0 18 19'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M17.3333 15.6667H0.666626V14H1.49996V8.19249C1.49996 4.03582 4.85829 0.666656 8.99996 0.666656C13.1416 0.666656 16.5 4.03582 16.5 8.19249V14H17.3333V15.6667ZM3.16663 14H14.8333V8.19249C14.8333 4.95666 12.2216 2.33332 8.99996 2.33332C5.77829 2.33332 3.16663 4.95666 3.16663 8.19249V14ZM6.91663 16.5H11.0833C11.0833 17.0525 10.8638 17.5824 10.4731 17.9731C10.0824 18.3638 9.55249 18.5833 8.99996 18.5833C8.44743 18.5833 7.91752 18.3638 7.52682 17.9731C7.13612 17.5824 6.91663 17.0525 6.91663 16.5Z'
        fill='#444646'
      />
    </svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
