import * as React from 'react';

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16ZM5.76 16C5.76 21.6554 10.3446 26.24 16 26.24C21.6554 26.24 26.24 21.6554 26.24 16C26.24 10.3446 21.6554 5.76 16 5.76C10.3446 5.76 5.76 10.3446 5.76 16Z'
        fill='#C2D5E7'
      />
      <path
        d='M16 2.88C16 1.28942 17.2996 -0.0262604 18.8645 0.258505C19.9789 0.461304 21.0714 0.782362 22.1229 1.21793C24.0641 2.022 25.828 3.20055 27.3137 4.68629C28.7994 6.17203 29.978 7.93586 30.7821 9.87707C31.2176 10.9286 31.5387 12.0211 31.7415 13.1355C32.0263 14.7004 30.7106 16 29.12 16C27.5294 16 26.2791 14.6859 25.8377 13.1578C25.7323 12.793 25.6064 12.4336 25.4605 12.0813C24.9459 10.8389 24.1916 9.7101 23.2408 8.75923C22.2899 7.80836 21.1611 7.05408 19.9187 6.53947C19.5664 6.39357 19.207 6.26775 18.8422 6.16234C17.3141 5.72086 16 4.47058 16 2.88Z'
        fill='#00529D'
      />
    </svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
