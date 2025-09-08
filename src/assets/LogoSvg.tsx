import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Rect, Circle, Text as SvgText, Path } from 'react-native-svg';

const LogoSvg = ({ size = 120, color = '#007AFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 120 120" fill="none">
    <Defs>
      <LinearGradient id="bg" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
        <Stop stopColor={color} stopOpacity="1" offset="0%" />
        <Stop stopColor="#00C6FB" stopOpacity="1" offset="100%" />
      </LinearGradient>
    </Defs>
    <Rect x="10" y="10" width="100" height="100" rx="24" fill="url(#bg)" />
    <Circle cx="60" cy="60" r="32" fill="#fff" />
    <SvgText
      x="60"
      y="68"
      fontSize="28"
      fontWeight="bold"
      fill={color}
      textAnchor="middle"
      fontFamily="Arial"
    >
      TFW
    </SvgText>
    {/* Stylized booth/table below the text */}
    <Path
      d="M44 80 Q60 90 76 80"
      stroke={color}
      strokeWidth="4"
      fill="none"
    />
    <Rect x="52" y="80" width="16" height="6" rx="2" fill={color} />
  </Svg>
);

export default LogoSvg; 