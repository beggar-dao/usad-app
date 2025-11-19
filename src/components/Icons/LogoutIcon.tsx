import React from 'react';

interface Props {
  isActive?: boolean;
}

const LogoutIcon: React.FC<React.SVGProps<SVGSVGElement> & Props> = ({
  isActive,
}) => (
  <svg
    width="18"
    height="16"
    viewBox="0 0 18 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path
        d="M13.1912 3.51765L11.9512 4.75762L14.2201 7.03529H5.27647V8.79412H14.2201L11.9512 11.063L13.1912 12.3118L17.5882 7.91471L13.1912 3.51765ZM1.75882 1.75882H8.79412V0H1.75882C0.791471 0 0 0.791471 0 1.75882V14.0706C0 15.0379 0.791471 15.8294 1.75882 15.8294H8.79412V14.0706H1.75882V1.75882Z"
        fill={isActive ? 'url(#paint_linear)' : '#666666'}
      />
    </g>
    <defs>
      <linearGradient
        id="paint_linear"
        x1="0"
        y1="6.17596"
        x2="18.9031"
        y2="6.17596"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.0011" stopColor="#C69F58" />
        <stop offset="0.1621" stopColor="#FFEECF" />
        <stop offset="0.5122" stopColor="#A56F2A" />
        <stop offset="0.9979" stopColor="#C69F58" />
      </linearGradient>
    </defs>
  </svg>
);

export default LogoutIcon;
