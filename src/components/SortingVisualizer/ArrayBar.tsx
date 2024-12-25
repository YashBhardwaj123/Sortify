import React from 'react';
import { ArrayBarProps } from './types';

const ArrayBar: React.FC<ArrayBarProps> = ({ value, maxValue, isActive, isComparing }) => {
  return (
    <div
      style={{ height: `${(value / maxValue) * 100}%` }}
      className={`w-12 transition-all duration-500 flex items-center justify-center text-white
        ${isActive ? 'bg-red-500' : 
          isComparing ? 'bg-yellow-500' : 'bg-blue-500'}`}
    >
      {value}
    </div>
  );
}

export default ArrayBar;