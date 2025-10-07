import { useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 md:py-4 max-w-7xl shadow rounded mx-auto w-full bg-white">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="w-32" />
      </Link>


      <div className="flex items-center space-x-4">
        <button className="size-8 flex items-center justify-center hover:bg-gray-100 transition border border-slate-300 rounded-md">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 10.39a2.889 2.889 0 1 0 0-5.779 2.889 2.889 0 0 0 0 5.778M7.5 1v.722m0 11.556V14M1 7.5h.722m11.556 0h.723m-1.904-4.596-.511.51m-8.172 8.171-.51.511m-.001-9.192.51.51m8.173 8.171.51.511"
              stroke="#353535"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <Link
          className="hidden md:flex bg-green-600 text-white px-5 py-2 rounded text-sm font-medium hover:bg-indigo-700 transition"
          to="/signup"
        >
          Login
        </Link>
        <button onClick={toggleMenu} className="md:hidden text-gray-600">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
