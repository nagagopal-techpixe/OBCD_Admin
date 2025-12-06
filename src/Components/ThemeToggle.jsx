import React, { useState } from 'react';
import { useTheme } from '../Context/ThemeContext';

const ThemeToggle = () => {
  
const { theme, toggleTheme } = useTheme();


  return (
    <label className="switch inline-block ">
      <input
        type="checkbox"
        checked={theme === 'dark'}
        onChange={toggleTheme}
        className="hidden "
      />
      <span
        className={`slider block cursor-pointer w-[3.5em] h-[2em] md:w-[3.5em] md:h-[2em]  bg-white dark:bg-gray-900 rounded-full transition-all duration-400 relative ${
          theme === 'dark' ? 'bg-gray-900 border-2 border-sky-200' : 'bg-white'
        }`}
      >
        <span
          className={`absolute top-1/2 transform -translate-y-1/2 w-[1.4em] h-[1.4em] rounded-full transition-all duration-400 ${
           theme === 'dark'
              ? 'left-[calc(100%-(1.4em+0.3em))] bg-gray-800'
              : 'left-[0.3em] bg-yellow-400'
          }`}
          style={{
            boxShadow: theme === 'dark'
              ? 'inset -3px -2px 5px -2px #8983f7, inset -10px -4px 0 0 #a3dafb'
              : 'none',
          }}
        ></span>
      </span>
    </label>
  );
};

export default ThemeToggle;