import React, { useState, useEffect } from "react";
import {
  LogOut,
  Moon,
  Sun,
  Bell,
  Globe,
  Users,
  Copy,
  Check,
  Settings,
  User,
  Home,
  Shield,
  Mail,
  Phone,
  Building,
  Calendar,
  ChevronRight,
  Camera,
  Edit,
  X,
  Plus,
  Search
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProfile, login, updateProfile } from "../feature/auth/authSlice";
import { getUserHouse } from "../feature/house/houseSlice";
import toast from "react-hot-toast";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success, message, user } = useSelector((state) => state.auth);
  const { currentHouse, houses } = useSelector((state) => state.house);
  const [copied, setCopied] = useState(false);
  const [members, setMembers] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getUserHouse());
  }, [dispatch]);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const applyTheme = (newTheme) => {
    const root = window.document.documentElement;
    if (newTheme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    toast.success(`Switched to ${newTheme} mode`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(login());
    navigate("/");
    toast.success("Logged out successfully");
  };

  useEffect(() => {
    if (houses && houses.length > 0) {
      const allMembers = houses.flatMap(house => house.members || []);
      setMembers(allMembers);
    }
  }, [houses]);

  useEffect(() => {
    if (!houses?.length || !user?._id) return;

    let found = false;
    for (const house of houses) {
      const member = house.members?.find(
        (m) => String(m.user._id) === String(user._id)
      );
      if (member) {
        found = true;
        setIsAdmin(member.role === "admin");
        break;
      }
    }
    if (!found) {
      setIsAdmin(false);
    }
  }, [houses, user]);

  const copyInviteCode = (joinCode) => {
    navigator.clipboard.writeText(joinCode);
    setCopied(true);
    toast.success("Invite code copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const switchToHome = () => {
    navigate("/");
  };

  // Image Upload Handlers
  const handleImageEdit = () => {
    setIsEditingImage(true);
  };

  const handleImageCancel = () => {
    setIsEditingImage(false);
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error("Please select an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateProfile(imagePreview)).unwrap();
      toast.success("Profile picture updated successfully");
      setIsEditingImage(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredMembers = members.filter(member =>
    member.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
                Profile
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your account and households</p>
            </div>
            <button
              onClick={switchToHome}
              className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Home size={18} />
              Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Row - Profile Card & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Profile Card - Takes 2/3 on large screens */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="relative group">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 p-1 shadow-lg">
                      <img
                        src={imagePreview || user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'user'}`}
                        alt="Profile"
                        className="w-full h-full rounded-xl object-cover border-2 border-white dark:border-gray-800"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 shadow-lg"></div>
                    
                    <button
                      onClick={handleImageEdit}
                      className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <Camera className="text-white" size={20} />
                    </button>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {user?.name || "User"}
                    </h2>
                    <button
                      onClick={handleImageEdit}
                      className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                      title="Edit profile"
                    >
                      <Edit size={16} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50/50 dark:bg-gray-700/50 rounded-lg">
                      <Mail className="text-blue-600 dark:text-blue-400" size={18} />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">{user?.email || "user@example.com"}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-gray-50/50 dark:bg-gray-700/50 rounded-lg">
                      <Phone className="text-green-600 dark:text-green-400" size={18} />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">+1 (555) 123-4567</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions - Takes 1/3 on large screens */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
            
            <div className="space-y-3">
              <button
                onClick={switchToHome}
                className="w-full flex items-center gap-3 p-3 text-left bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 group"
              >
                <div className="p-2 bg-blue-500 rounded-lg">
                  <Home className="text-white" size={18} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">Dashboard</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Main dashboard</p>
                </div>
                <ChevronRight size={16} className="text-blue-500" />
              </button>
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 p-3 text-left bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg hover:border-red-300 dark:hover:border-red-600 transition-all duration-200 group"
              >
                <div className="p-2 bg-red-500 rounded-lg">
                  <LogOut className="text-white" size={18} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">Sign Out</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Secure sign out</p>
                </div>
                <ChevronRight size={16} className="text-red-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Middle Row - Households & Settings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Households Section */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Building className="text-blue-600 dark:text-blue-400" size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">Your Households</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Manage your shared spaces</p>
                </div>
              </div>
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                {houses?.length || 0}
              </span>
            </div>

            <div className="space-y-4">
              {houses?.map((house, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 bg-white/50 dark:bg-gray-700/50"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {house.name}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                      <Users size={14} />
                      <span>{house.members?.length || 0}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Invite Code</span>
                      <div className="flex items-center gap-2">
                        <code className="font-mono text-xs bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded border">
                          {house.joinCode}
                        </code>
                        <button
                          onClick={() => copyInviteCode(house.joinCode)}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors"
                          title="Copy invite code"
                        >
                          {copied ? (
                            <Check size={14} className="text-green-500" />
                          ) : (
                            <Copy size={14} className="text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate(`/task/${house._id}`)}
                      className="w-full flex items-center justify-center gap-2 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 text-sm font-medium"
                    >
                      <Plus size={16} />
                      Create Task
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Settings Section */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Settings className="text-purple-600 dark:text-purple-400" size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Preferences</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Customize your experience</p>
              </div>
            </div>

            <div className="space-y-3">
              <div
                onClick={toggleTheme}
                className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-200 cursor-pointer bg-white/50 dark:bg-gray-700/50"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                    {theme === "dark" ? (
                      <Sun className="text-orange-600 dark:text-orange-400" size={18} />
                    ) : (
                      <Moon className="text-orange-600 dark:text-orange-400" size={18} />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Theme</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {theme === "dark" ? "Dark mode" : "Light mode"}
                    </p>
                  </div>
                </div>
                <div className="text-sm px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-gray-700 dark:text-gray-300">
                  {theme === "dark" ? "Dark" : "Light"}
                </div>
              </div>

              {[
                { icon: Bell, label: "Notifications", description: "Manage alerts", color: "yellow" },
                { icon: Globe, label: "Language", description: "App language", color: "blue" },
                { icon: Shield, label: "Privacy", description: "Security settings", color: "green" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-200 cursor-pointer bg-white/50 dark:bg-gray-700/50"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 bg-${item.color}-100 dark:bg-${item.color}-900/30 rounded-lg`}>
                      <item.icon className={`text-${item.color}-600 dark:text-${item.color}-400`} size={18} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row - Members & Account Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Members Section */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Users className="text-green-600 dark:text-green-400" size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">Household Members</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">All members across households</p>
                </div>
              </div>
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                {members.length}
              </span>
            </div>

            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
              />
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto">
              {filteredMembers.map((member, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 bg-white/50 dark:bg-gray-700/50"
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 p-0.5">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.user?.name}`}
                        alt={member.user?.name}
                        className="w-full h-full rounded-md object-cover"
                      />
                    </div>
                    {member.role === "admin" && (
                      <div className="absolute -top-1 -right-1">
                        <Shield size={12} className="text-blue-600 bg-white rounded-full p-0.5" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
                        {member.user?.name}
                      </p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        member.role === "admin"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                          : "bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-300"
                      }`}>
                        {member.role}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <Calendar size={12} />
                      Joined {formatDate(member.joinedAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Account Status */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 dark:bg-gray-700  ">
  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Account Overview</h2>
  
  <div className="grid grid-cols-2 gap-4">
    <div className="text-center p-4 bg-gray-50 rounded-xl dark:bg-white/10">
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{members.length}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300">Total Members</p>
    </div>
    <div className="text-center p-4 bg-gray-50 rounded-xl dark:bg-white/10">
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{houses?.length || 0}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300">Households</p>
    </div>
    <div className="text-center p-4 bg-gray-50 rounded-xl col-span-2 dark:bg-white/10">
      <p className="text-xl font-bold text-green-600 dark:text-green-400">Active</p>
      <p className="text-sm text-gray-600 dark:text-gray-300">Account Status</p>
    </div>
  </div>

  <div className="mt-6 p-4 bg-gray-50 rounded-xl dark:bg-white/10">
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm text-gray-600 dark:text-gray-300">Profile Completion</span>
      <span className="text-sm font-bold text-gray-900 dark:text-white">85%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-white/20">
      <div className="bg-blue-500 h-2 rounded-full dark:bg-white" style={{ width: '85%' }}></div>
    </div>
  </div>
</div>
        </div>
      </div>

      {/* Image Upload Modal */}
      {isEditingImage && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Update Profile Picture
              </h3>
              <button
                onClick={handleImageCancel}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="w-32 h-32 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-700">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Camera className="text-gray-400" size={40} />
                  )}
                </div>
              </div>
              
              <div className="text-center">
                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                  <span className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl">
                    <Camera size={20} />
                    Choose Image
                  </span>
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                  JPG, PNG or GIF (max 5MB)
                </p>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleImageCancel}
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleImageUpload}
                  disabled={!selectedImage}
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:shadow-none"
                >
                  Update Photo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;