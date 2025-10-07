import React from "react";
import { features } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Features = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 sm:px-20 xl:px-32 mx-auto max-w-6xl bg-white">
      <div className="text-center">
        <h2 className="text-green-700 text-[42px] font-semibold">FEATURES</h2>
        <p className="text-gray-600 max-w-lg mx-auto">
          Everything you need to create, enhance, and optimize your content
          with cutting-edge AI technology.
        </p>
      </div>

      <div className="flex flex-wrap justify-center m-10">
        {features.map((item) => (
          <div
            key={item.id}
            className="p-8 m-4 max-w-xs rounded-lg bg-gray-100 border border-gray-100 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            onClick={() => navigate(item.path)}
          >
            <item.icon
              className={`w-12 h-12 p-3  rounded-xl ${item.color}`}
            />
            <h3 className="mt-6 mb-3 text-lg font-semibold">{item.title}</h3>
            <p className="text-gray-400 text-sm max-w-[95%]">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
