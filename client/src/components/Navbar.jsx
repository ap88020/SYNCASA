import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import DarkToggle from "./DarkToggle";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, logout } from "../feature/auth/authSlice";
import { User, LogOut, UserCircle2, Settings, ChevronDown, Home } from "lucide-react";

const Navbar = () => {
  const [isUser, setIsUser] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const { user, success } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Fetch user profile
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  // Update isUser based on response
  useEffect(() => {
    if (success && (user?.data || user?.email || user?.name)) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  }, [user, success]);

  const handleProfileClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const goToProfile = () => {
    setDropdownOpen(false);
    navigate("/profile");
  };

  const goToHome = () => {
    setDropdownOpen(false);
    navigate("/syn");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    setDropdownOpen(false);
    navigate("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest('.user-dropdown')) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/60 dark:border-gray-700/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <img 
                  src={assets.logo} 
                  alt="Logo" 
                  className="w-28 h-8 block dark:hidden transition-transform group-hover:scale-105" 
                />
                <img 
                  src={assets.green_logo} 
                  alt="Logo" 
                  className="w-28 h-8 hidden dark:block transition-transform group-hover:scale-105" 
                />
              </div>
            </Link>

            {/* Navigation Links - Only show when user is logged in */}
            {isUser && (
              <nav className="hidden md:flex items-center space-x-6">
                <Link
                  to="/syn"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <Home size={16} />
                  Dashboard
                </Link>
              </nav>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <div className="hidden sm:block">
              <DarkToggle />
            </div>

            {/* User Menu */}
            {isUser ? (
              <div className="relative user-dropdown">
                <button
                  onClick={handleProfileClick}
                  className="flex items-center space-x-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2 hover:shadow-md transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-500"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="text-white" size={16} />
                    </div>
                    <div className="text-left hidden sm:block">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user?.name?.split(' ')[0] || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user?.email?.split('@')[0] || 'Account'}
                      </p>
                    </div>
                  </div>
                  <ChevronDown 
                    size={16} 
                    className={`text-gray-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} 
                  />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg py-2 z-50 backdrop-blur-lg">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {user?.name || 'User'}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {user?.email || 'user@example.com'}
                      </p>
                    </div>

                    {/* Menu Items */}
                    <button
                      onClick={goToHome}
                      className="flex items-center w-full px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left"
                    >
                      <Home className="mr-3" size={18} />
                      <div>
                        <p className="text-sm font-medium">Dashboard</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Go to main dashboard</p>
                      </div>
                    </button>

                    <button
                      onClick={goToProfile}
                      className="flex items-center w-full px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left"
                    >
                      <UserCircle2 className="mr-3" size={18} />
                      <div>
                        <p className="text-sm font-medium">Profile</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Manage your account</p>
                      </div>
                    </button>

                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left border-t border-gray-100 dark:border-gray-700 mt-1"
                    >
                      <LogOut className="mr-3" size={18} />
                      <div>
                        <p className="text-sm font-medium">Sign Out</p>
                        <p className="text-xs text-red-500 dark:text-red-400">Secure sign out</p>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 text-sm font-medium transition-colors hidden sm:block"
                >
                  Sign In
                </Link>
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;