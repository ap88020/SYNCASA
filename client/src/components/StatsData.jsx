import React from "react";
import { statsData } from "../assets/assets";

const StatsData = () => {
  return (
    <div className="grid sm:grid-cols-4 gap-2 grid-cols-2">
      {statsData.quickStats.map((stat, index) => (
        <div
          key={index}
          className="bg-white dark:bg-surface-dark p-4 rounded-lg shadow"
        >
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-300">
              {stat.name}
            </span>
            <stat.icon 
                className={`w-12 h-12 p-3 rounded-xl ${stat.color} ${stat.bg}`} 
            />
          </div>
          <p className="text-2xl font-bold mt-2 dark:text-white">{stat.count}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsData;
