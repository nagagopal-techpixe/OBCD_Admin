import React from 'react'
import Sidebar from '../Components/Sidebar'
import Header from '../Components/Header'
import { Outlet } from 'react-router-dom'
import { useTheme } from '../Context/ThemeContext'

const DashboardLayout = () => {
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-[#EEF1F7] text-black'} `}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-3">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
