import React from "react";
import { features } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Features = () => {
  const navigate = useNavigate();

  return (
    <div className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Simple Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Streamline Your Household
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Powerful tools designed to make shared living simpler and more organized
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(item.path)}
              className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 cursor-pointer"
            >
              {/* Icon with Feature Color */}
              <div 
                className="inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 transition-colors duration-300"
                style={{ 
                  backgroundColor: `${item.bg.from}15`,
                  border: `1px solid ${item.bg.from}30`
                }}
              >
                <item.icon 
                  className="w-6 h-6" 
                  style={{ color: item.bg.from }}
                />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {item.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                {item.description}
              </p>

              {/* CTA */}
              <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:translate-x-1 transition-transform duration-300">
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          ))}
        </div>

        {/* Simple Bottom CTA */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/house")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-8 py-3 transition-colors duration-300"
          >
            Start Managing Your Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Features;