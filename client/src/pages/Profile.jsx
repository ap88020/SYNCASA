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
  Key,
  Calendar,
  ChevronRight,
  Camera,
  Edit,
  X
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProfile, login , updateProfile} from "../feature/auth/authSlice";
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
  const [isAdmin,setIsAdmin] = useState(false);

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
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(login());
    navigate("/");
  };

  useEffect(() => {
    if (houses && houses.length > 0) {
      const allMembers = houses.flatMap(house => house.members || []);
      setMembers(allMembers);
    }
  }, [houses]);


  useEffect(() => {
  if (!houses?.length || !user?._id) return;

  // Find the house where the current user is a member
  let found = false;

  for (const house of houses) {
    const member = house.members?.find(
      (m) => String(m.user._id) === String(user._id)
    );

    if (member) {
      found = true;
      setIsAdmin(member.role === "admin");
      console.log("🧩 Found user in house:", house.name);
      console.log("Role:", member.role);
      break;
    }
  }

  if (!found) {
    console.warn("⚠️ User not found in any house members list");
    setIsAdmin(false);
  }
}, [houses, user]);



  const copyInviteCode = (joinCode) => {
    navigator.clipboard.writeText(joinCode);
    setCopied(true);
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
      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      setSelectedImage(file);
      
      // Create preview
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
      toast.success("Image updated successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Format date for professional display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your account and households</p>
            </div>
            <button
              onClick={switchToHome}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              <Home size={16} />
              Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Left Column - Profile & Households */}
          <div className="xl:col-span-2 space-y-8">
            
            {/* Profile Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="relative group">
                    <img
                      src={imagePreview || user?.avatar || "https://i.pravatar.cc/100?img=3"}
                      alt="Profile"
                      className="w-20 h-20 rounded-full border-2 border-blue-100 dark:border-blue-900 object-cover"
                    />
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                    
                    {/* Edit Image Overlay */}
                    <button
                      onClick={handleImageEdit}
                      className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <Camera className="text-white" size={20} />
                    </button>
                  </div>
                  
                  {/* Image Upload Modal */}
                  {isEditingImage && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Update Profile Picture
                          </h3>
                          <button
                            onClick={handleImageCancel}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          >
                            <X size={20} />
                          </button>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex justify-center">
                            <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center overflow-hidden">
                              {imagePreview ? (
                                <img
                                  src={imagePreview}
                                  alt="Preview"
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <Camera className="text-gray-400" size={32} />
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
                              <span className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                <Camera size={16} />
                                Choose Image
                              </span>
                            </label>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                              JPG, PNG or GIF (max 5MB)
                            </p>
                          </div>
                          
                          <div className="flex gap-3 pt-4">
                            <button
                              onClick={handleImageCancel}
                              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleImageUpload}
                              disabled={!selectedImage}
                              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
                            >
                              Update Photo
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {user?.name || "User"}
                    </h2>
                    <button
                      onClick={handleImageEdit}
                      className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      title="Edit profile picture"
                    >
                      <Edit size={16} />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Mail size={14} />
                      {user?.email || "user@example.com"}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone size={14} />
                      +1 (555) 123-4567
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Households Section */}
            import { useNavigate } from "react-router-dom";

// Inside your component
const navigate = useNavigate();

return (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
    <div className="flex items-center gap-3 mb-6">
      <Building className="text-blue-600 dark:text-blue-400" size={24} />
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        Your Households
      </h2>
      <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm px-2 py-1 rounded-full">
        {houses?.length || 0}
      </span>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {houses?.map((house, idx) => (
        <div
          key={idx}
          className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
        >
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-medium text-gray-900 dark:text-white">
              {house.name}
            </h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Invite Code
              </span>
              <div className="flex items-center gap-2">
                <code className="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  {house.joinCode}
                </code>
                <button
                  onClick={() => copyInviteCode(house.joinCode)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors"
                  title="Copy invite code"
                >
                  {copied ? (
                    <Check size={14} className="text-green-600" />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Users size={14} />
              <span>{house.members?.length || 0} members</span>
            </div>
          </div>

          <button
            onClick={() => navigate(`/task/${house._id}`)}
            className="w-full mt-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md transition-colors"
          >
            Create Task
          </button>
          
        </div>
      ))}
    </div>
  </div>
);


            {/* Members Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-6">
                <Users className="text-green-600 dark:text-green-400" size={24} />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Household Members</h2>
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm px-2 py-1 rounded-full">
                  {members.length}
                </span>
              </div>
              
              <div className="space-y-3">
                {members.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 border border-gray-100 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="relative">
                      <img
                        src={`https://i.pravatar.cc/40?img=${index + 5}`}
                        alt={member.user?.name}
                        className="w-10 h-10 rounded-full"
                      />
                      {member.role === "admin" && (
                        <div className="absolute -top-1 -right-1">
                          <Shield size={12} className="text-blue-600 bg-white rounded-full p-0.5" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900 dark:text-white truncate">
                          {member.user?.name}
                        </p>
                        <span className={`text-xs px-2 py-1 rounded ${
                          member.role === "admin"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                        }`}>
                          {member.role}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                        <Calendar size={12} />
                        Joined {formatDate(member.joinedAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Settings & Actions */}
          <div className="space-y-8">
            
            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
              
              <div className="space-y-3">
                <button
                  onClick={switchToHome}
                  className="w-full flex items-center justify-between p-3 text-left border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <Home className="text-blue-600 dark:text-blue-400" size={18} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Dashboard</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Return to main dashboard</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                </button>
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-between p-3 text-left border border-gray-200 dark:border-gray-600 rounded-lg hover:border-red-300 dark:hover:border-red-600 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <LogOut className="text-red-600 dark:text-red-400" size={18} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Sign Out</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Secure sign out from your account</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-400 group-hover:text-red-600 transition-colors" />
                </button>
              </div>
            </div>

            {/* Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="text-gray-600 dark:text-gray-400" size={20} />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Preferences</h2>
              </div>

              <div className="space-y-3">
                <div
                  onClick={toggleTheme}
                  className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-gray-300 dark:hover:border-gray-500 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      {theme === "dark" ? (
                        <Sun className="text-gray-600 dark:text-gray-400" size={18} />
                      ) : (
                        <Moon className="text-gray-600 dark:text-gray-400" size={18} />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Theme</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {theme === "dark" ? "Dark mode" : "Light mode"}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {theme === "dark" ? "Dark" : "Light"}
                  </div>
                </div>

                {[
                  { icon: Bell, label: "Notifications", description: "Manage alerts and notifications" },
                  { icon: Globe, label: "Language", description: "App language and region" },
                  { icon: Shield, label: "Privacy", description: "Privacy and security settings" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-gray-300 dark:hover:border-gray-500 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <item.icon className="text-gray-600 dark:text-gray-400" size={18} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            {/* Account Status */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Status</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{members.length}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Members</p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{houses?.length || 0}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Households</p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg col-span-2">
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">Active</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Account Status</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;