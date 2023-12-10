import React, { useState } from 'react';

const CustomButton = ({ label, color, bgColor, width, height, hoverColor }) => {

  const [isHovered, setIsHovered] = useState(false);

  // Default styles
  const defaultStyles = {
    color: color || 'white',
    // backgroundColor: bgColor || '#BF3127',
    backgroundColor: isHovered ? (hoverColor || 'darkred') : (bgColor || '#BF3127'),
    width: width || '150px',
    height: height || '50px',
    borderRadius: '50px',
    fontWeight: '700',
    textTransform: 'uppercase',
    textAlign: 'center',
    // transition: 'background-color 0.3s ease'
  };


  return (
    <button 
      style={defaultStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      
    >
      {label}
    </button>
  );
};

export default CustomButton;