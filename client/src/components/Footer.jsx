import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center text-center">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3 mb-6">
            <img 
              src={assets.logo} 
              alt="SyncCasa" 
              className="w-28 h-8 dark:hidden" 
            />
            <img 
              src={assets.green_logo} 
              alt="SyncCasa" 
              className="w-28 h-8 hidden dark:block" 
            />
            <span className="text-xl font-semibold text-gray-900 dark:text-white">
              SyncCasa
            </span>
          </div>

          {/* Copyright */}
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            © 2025 SyncCasa. All rights reserved.
          </p>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors text-sm font-medium"
            >
              Privacy Policy
            </a>
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors text-sm font-medium"
            >
              Terms of Service
            </a>
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors text-sm font-medium"
            >
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;