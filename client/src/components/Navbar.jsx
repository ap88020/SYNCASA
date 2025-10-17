import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import DarkToggle from "./DarkToggle";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, logout } from "../feature/auth/authSlice";
import { User, LogOut, UserCircle2 } from "lucide-react";

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 md:py-4 max-w-7xl mx-auto w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-green-500/20 rounded">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <img src={assets.logo} alt="logo" className="w-32 block dark:hidden" />
        <img src={assets.green_logo} alt="logo" className="w-32 hidden dark:block" />
      </Link>

      {/* Right section */}
      <div className="flex items-center space-x-4 relative">
        {/* Dark Mode Toggle */}
        <DarkToggle />

        {/* User or Login */}
        {isUser ? (
          <div className="relative">
            {/* User Icon */}
            <User
              onClick={handleProfileClick}
              size={28}
              className="text-gray-700 dark:text-green-200 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 p-2 rounded-full cursor-pointer transition-colors"
            />

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 z-50">
                <button
                  onClick={goToProfile}
                  className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <UserCircle2 className="mr-2" size={18} />
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <LogOut className="mr-2" size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            className="hidden md:flex bg-green-600 text-white px-5 py-2 rounded text-sm font-medium hover:bg-green-700 transition"
            to="/login"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
