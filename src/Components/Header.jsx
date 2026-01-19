import React, { useState, useRef, useEffect } from 'react'
import ThemeToggle from './ThemeToggle'
import { useTheme } from '../Context/ThemeContext';
import bellIcon from '../assets/icons/bell.png';
import logoicon from '../assets/icons/logo.png';

import { useNotifications } from '../Context/NotificationsContext'
import { Search, Settings, LogOut, ChevronDown } from 'lucide-react'

const Header = ({ onMenuClick }) => {
  const { theme } = useTheme();
  const { notifications } = useNotifications();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className={`${theme == "dark" ? "bg-black text-white" : "bg-[#EEF1F7] text-black"} shadow-sm border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex flex-wrap items-center justify-between gap-3`}>
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Hamburger visible on < lg (mobile and tablet); hidden on desktop */}
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100"
          aria-label="Open sidebar"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        <h1 className="text-[18px] sm:text-2xl font-bold">Dashboard</h1>
      </div>

      <div className="flex items-center gap-4 sm:gap-6 ">
        {/* <div className="relative hidden sm:block">
          <input 
            type="text" 
            placeholder="Search"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 w-40 sm:w-56 md:w-72"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
        </div> */}

        <ThemeToggle />

        {/* <button className="relative p-2 rounded-full transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700">
          <img
            src={bellIcon}
            alt="Notifications"
            className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer"
          />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {notifications.length}
          </span>
        </button> */}

        {/* Profile dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-200 "
          >
            <img
              src={logoicon}
              alt="Profile"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover object-center"
            />
            {/* <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'transform rotate-180' : ''}`} /> */}
          </button>

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className={`absolute sm:right-0 -right-[6rem] mt-0 sm:w-80 w-64 rounded-md shadow-lg py-1 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} ring-1 ring-black ring-opacity-5 z-50`}>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
