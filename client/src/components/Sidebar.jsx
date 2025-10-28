import React from "react";
import { NavLink } from "react-router-dom";
import { navItmes } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="fixed sm:static z-20 bottom-0 sm:top-0 left-0 bg-white dark:bg-gray-800 border-t sm:border-t-0 sm:border-r border-gray-200 dark:border-gray-700 w-full sm:w-64 h-14 sm:h-screen flex sm:flex-col">
      {/* Desktop Sidebar */}
      <div className="hidden sm:flex flex-col w-full py-6 px-4">
        {/* Sidebar Header */}
        <div className="px-4 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Navigation
          </h2>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-2">
          {navItmes.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/syn"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-5 h-5 ${
                      isActive 
                        ? "text-blue-600 dark:text-blue-400" 
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                  />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="sm:hidden flex w-full justify-around items-center bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        {navItmes.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/syn"}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center p-2 flex-1 min-w-0 ${
                isActive
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className={`w-5 h-5 mb-1 ${
                    isActive 
                      ? "text-blue-600 dark:text-blue-400" 
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                />
                <span className="text-xs font-medium truncate hidden border-r border-white">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;