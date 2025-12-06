import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";
import { navItems } from "../routes/AppRoutes";
import logoicon from '../assets/icons/logo.png';

//import bellIcon from "../assets/icons/bell.png"; // ✅ imported bell image

const Sidebar = ({ isOpen = false, onClose }) => {
  const { theme } = useTheme();
  const [openMenu, setOpenMenu] = useState(null); // ✅ only one open at a time
  const navigate = useNavigate();

  // Helper: toggle menu
  const toggleMenu = (menu, path) => {
    setOpenMenu((prev) => (prev === menu ? null : menu)); 
    navigate(path);
    if (onClose) onClose();
  };

  const linkClass = ({ isActive }) =>
    `flex items-center p-3 rounded-lg transition-all duration-200 ${isActive && theme === "dark"
      ? "bg-blue-700 text-white shadow-lg"
      : isActive
        ? "bg-blue-100 text-blue-700 font-medium shadow-md"
        : theme === "dark"
          ? "bg-gray-700 hover:bg-gray-500 text-gray-200 border border-gray-500"
          : "bg-gray-300 hover:bg-gray-100 text-gray-700"
    }`;

  return (
    <>
      {/* Mobile backdrop */}
      {/* <div
        className={`fixed inset-0 bg-black/40 z-[999] md:hidden transition-opacity ${isOpen ? "opacity-0 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => onClose && onClose()}
      /> */}
      <div
  className={`fixed inset-0 bg-black/40 z-30 md:hidden transition-opacity
    ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
  `}
  onClick={() => onClose && onClose()}
/>

      <aside
        className={`w-64 rounded-tr-xl text-xl h-screen overflow-hidden ${theme === "dark" ? "bg-black text-white" : " text-black"
          } flex flex-col border border-gray-400 p-4
        fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:static md:translate-x-0 md:z-auto`}
        style={{
          backgroundImage: `url("src/assets/SideBarCloud1.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay to ensure content readability */}
        <div
          className={`absolute inset-0 rounded-tr-lg ${theme === "dark" ? "bg-black/80" : "bg-[#EEF1F7]/90"
            }`}
        ></div>

        {/* Content container with relative positioning */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Close button for small screens */}
          <div className="lg:hidden flex justify-end mb-4">
            <button
              type="button"
              onClick={() => onClose && onClose()}
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100"
              aria-label="Close sidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/* Logo */}
          <div className="mb-6 flex justify-center py-4">
            <img
              src={logoicon}
              alt="Logo"
              className="h-24 max-h-28 w-auto object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/200x50?text=Logo+Here";
              }}
            />
          </div>


          {/* Navigation */}
          <nav className="flex-1 space-y-4 overflow-y-auto pr-2">
            <NavLink to="/" end className={linkClass}>
              <span className="ml-3" onClick={() => onClose && onClose()}>Dashboard</span>
            </NavLink>

            {navItems.map((item) => {
              const key = item.path || item.meta?.label;
              const isOpen = openMenu === item.path;
              const hasChildren = (item.children || []).length > 0;
              return (
                <div key={key}>
                  {hasChildren ? (
                    <>
                      <button
                        onClick={() => toggleMenu(item.path, `/${item.path}`)}
                        className={`w-full bg-slate-300 text-left ${linkClass({
                          isActive: false,
                        })}`}
                      >
                        {item.meta?.icon || ""}{" "}
                        <span className="ml-3">
                          {item.meta?.label || item.path}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="ml-6 mt-2 space-y-4 text-lg italic">
                          {(item.children || []).map((child) => {
                            const childPath = child.index
                              ? `/${item.path}`
                              : `/${item.path}/${child.path}`;
                            return (
                              <NavLink
                                to={childPath}
                                key={childPath}
                                className={linkClass}
                                end={!!child.index}
                                onClick={() => onClose && onClose()}
                              >
                                {child.meta?.icon || ""}{" "}
                                <span className="ml-2 ">
                                  {child.meta?.label || child.path}
                                </span>
                              </NavLink>
                            );
                          })}
                        </div>
                      )}
                    </>
                  ) : (
                    <NavLink to={`/${item.path}`} key={key} className={linkClass} onClick={() => onClose && onClose()}>
                      {item.meta?.icon || ""}{" "}
                      <span className="ml-3">
                        {item.meta?.label || item.path}
                      </span>
                    </NavLink>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};

// ✅ Updated Avatar component with bell image
function ProfileAvatar() {
  const [imgError, setImgError] = useState(false);
  const name = "NextAdmin";
  const initials = name
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();


  if (!imgError) {
    return (
      <img
        src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png"
        alt={name}
        onError={() => setImgError(true)}
        className="w-16 h-16 rounded-full object-cover border border-gray-200"
      />
    );
  }

  return (
    <div className="w-12 h-12 rounded-l-full border bg-gray-300 flex items-center justify-center text-sm font-semibold text-gray-700">
      {initials}
    </div>
  );
}

export default Sidebar;