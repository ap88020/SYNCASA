import { useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import DarkToggle from "./darkToggle";

const Navbar = () => {
  return (
    <header className="flex items-center justify-between px-6 py-3 md:py-4 max-w-7xl rounded mx-auto w-full bg-white dark:bg-surface-dark border-b border-gray-200  dark:shadow-green-500/50">
      <Link to="/">
  <img src={assets.logo} alt="logo" className="w-32 block dark:hidden" />
  <img src={assets.green_logo} alt="logo" className="w-32 hidden dark:block" />
</Link>


      <div className="flex items-center space-x-4">
        < DarkToggle />
        <Link
          className="hidden md:flex bg-green-600 text-white px-5 py-2 rounded text-sm font-medium hover:bg-green-700 transition"
          to="/syn"
        >
          Login
        </Link>
        
      </div>
    </header>
  );
};

export default Navbar;
