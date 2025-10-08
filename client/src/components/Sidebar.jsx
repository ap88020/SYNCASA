import React from "react";
import { NavLink } from "react-router-dom";
import { navItmes } from "../assets/assets";

const Sidebar = () => {
  return (
    <div
      className={`fixed sm:static z-20
                  bottom-0 sm:top-14 sm:bottom-0 left-0  
                  bg-white dark:bg-surface-dark border-t sm:border-t-0 sm:border-r border-gray-200 dark:border-gray-700
                  flex sm:flex-col justify-around sm:justify-start items-center sm:items-stretch
                  w-full sm:w-56 lg:w-64
                  h-14 sm:h-auto
                  transition-all duration-300 ease-in-out`}
    >
      <div className="flex sm:flex-col w-full h-full justify-around sm:justify-start text-sm font-medium text-gray-600 dark:text-gray-300">
        {navItmes.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/syn"}
            className={({ isActive }) =>
              `flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-3 px-2 sm:px-4 py-1.5 sm:py-2.5 rounded-md sm:rounded-none ${
                isActive
                  ? "bg-gradient-to-r from-[#9234EA] to-[#473f4e] text-white sm:bg-transparent sm:text-green-500"
                  : ""
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className={`w-5 h-5 sm:w-4 sm:h-4 ${
                    isActive ? "text-white sm:text-green-500" : ""
                  }`}
                />
                <span className="text-[11px] sm:text-sm">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
