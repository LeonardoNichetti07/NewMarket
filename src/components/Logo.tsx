import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  mdSize?: number;
  variant?: 'red' | 'black' | 'white';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 40, mdSize, variant = 'red' }) => {
  const colors = {
    red: {
      icon: '#FF2800', // Using the primary red from theme
      text: '#FF2800'
    },
    black: {
      icon: '#000000',
      text: '#000000'
    },
    white: {
      icon: '#FFFFFF',
      text: '#FFFFFF'
    }
  };

  const activeColors = colors[variant];

  return (
    <div className={className}>
      {/* Mobile Logo */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={mdSize ? 'md:hidden' : ''}
      >
        {/* Outer Cycle Arrows */}
        <path
          d="M75 50C75 63.8071 63.8071 75 50 75C43.0964 75 36.8464 72.2015 32.3223 67.6777"
          stroke={activeColors.icon}
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M25 50C25 36.1929 36.1929 25 50 25C56.9036 25 63.1536 27.7985 67.6777 32.3223"
          stroke={activeColors.icon}
          strokeWidth="8"
          strokeLinecap="round"
        />
        
        {/* Arrow Heads */}
        <path
          d="M28 68L32.5 72.5L37 68"
          stroke={activeColors.icon}
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M72 32L67.5 27.5L63 32"
          stroke={activeColors.icon}
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Stylized "nm" in the center */}
        <text
          x="50"
          y="58"
          fill={activeColors.text}
          fontSize="28"
          fontWeight="900"
          fontFamily="Syne, sans-serif"
          textAnchor="middle"
          style={{ letterSpacing: '-1px', textTransform: 'lowercase' }}
        >
          nm
        </text>
      </svg>

      {/* Desktop Logo */}
      {mdSize && (
        <svg
          width={mdSize}
          height={mdSize}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="hidden md:block"
        >
          {/* Outer Cycle Arrows */}
          <path
            d="M75 50C75 63.8071 63.8071 75 50 75C43.0964 75 36.8464 72.2015 32.3223 67.6777"
            stroke={activeColors.icon}
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M25 50C25 36.1929 36.1929 25 50 25C56.9036 25 63.1536 27.7985 67.6777 32.3223"
            stroke={activeColors.icon}
            strokeWidth="8"
            strokeLinecap="round"
          />
          
          {/* Arrow Heads */}
          <path
            d="M28 68L32.5 72.5L37 68"
            stroke={activeColors.icon}
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M72 32L67.5 27.5L63 32"
            stroke={activeColors.icon}
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Stylized "nm" in the center */}
          <text
            x="50"
            y="58"
            fill={activeColors.text}
            fontSize="28"
            fontWeight="900"
            fontFamily="Syne, sans-serif"
            textAnchor="middle"
            style={{ letterSpacing: '-1px', textTransform: 'lowercase' }}
          >
            nm
          </text>
        </svg>
      )}
    </div>
  );
};

export default Logo;
