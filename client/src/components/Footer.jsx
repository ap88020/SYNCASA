import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <>
      <footer className="flex flex-col items-center justify-around w-full py-4 md:py-4 max-w-7xl text-sm mx-auto rounded bg-slate-50 mt-3 text-gray-800/70">
        <img src={assets.logo} alt="logo" className="w-32" />
        <p className="mt-4 text-center">
          Copyright © 2025 SyncCassa. All
          rights reservered.
        </p>
        <div className="flex items-center gap-4 mt-6">
          <a
            href="#"
            className="font-medium text-gray-800 hover:text-black transition-all"
          >
            Brand Guidelines
          </a>
          <div className="h-4 w-px bg-black/20"></div>
          <a
            href="#"
            className="font-medium text-gray-800 hover:text-black transition-all"
          >
            Trademark Policy
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
