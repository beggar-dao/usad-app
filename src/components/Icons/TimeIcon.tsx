import React from 'react';

interface Props {
  isActive?: boolean;
}

const TimeIcon: React.FC<React.SVGProps<SVGSVGElement> & Props> = ({
  isActive,
}) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 1.40625C14.7462 1.40625 18.5938 5.25381 18.5938 10C18.5938 14.7462 14.7462 18.5938 10 18.5938C5.25381 18.5938 1.40625 14.7462 1.40625 10C1.40625 5.25381 5.25381 1.40625 10 1.40625ZM10 2.71066C5.97422 2.71066 2.71066 5.9742 2.71066 10C2.71066 14.0258 5.9742 17.2893 10 17.2893C14.0258 17.2893 17.2893 14.0258 17.2893 10C17.2893 5.97422 14.0258 2.71066 10 2.71066ZM10 5.12766L10.0108 5.12773C10.366 5.1335 10.6522 5.42324 10.6522 5.77986V9.60193L12.9165 11.8663L12.9241 11.874C13.1712 12.1293 13.1687 12.5365 12.9165 12.7887C12.6618 13.0433 12.2489 13.0433 11.9942 12.7887L9.53883 10.3333L9.53182 10.3262C9.41379 10.2045 9.34779 10.0416 9.34779 9.87211V5.77988L9.34789 5.76908C9.35365 5.41387 9.6434 5.12766 10 5.12766Z"
      fill={isActive ? 'url(#paint_linear)' : '#666666'}
    />
    <defs>
      <linearGradient
        id="paint_linear"
        x1="1.40625"
        y1="10"
        x2="18.5938"
        y2="10"
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
export default TimeIcon;
