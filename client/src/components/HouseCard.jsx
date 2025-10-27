import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Home,
  Crown,
  Calendar,
  MoreVertical,
  Settings,
  Trash2,
  MapPin,
  User,
  Edit3,
  ArrowRight
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getUserHouse } from "../feature/house/houseSlice";

const HouseCard = () => {
  const dispatch = useDispatch();
  const [houseData, setHouseData] = useState([]);
  const { houses, loading, error } = useSelector((state) => state.house);

  useEffect(() => {
    dispatch(getUserHouse());
  }, [dispatch]);

  useEffect(() => {
    if (houses && houses.length > 0) {
      setHouseData(houses);
    }
  }, [houses]);

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Handle actions
  const handleEdit = (house) => {
    console.log('Edit house:', house);
    alert(`Edit house: ${house.name}`);
  };

  const handleDelete = (house) => {
    console.log('Delete house:', house);
    if (window.confirm(`Are you sure you want to delete ${house.name}?`)) {
      alert(`Deleted: ${house.name}`);
    }
  };

  // Get admin name
  const getAdminName = (house) => {
    return house.createdBy?.name || 'Unknown Admin';
  };

  // Get user role in the house
  const getUserRole = (house) => {
    return house.userRole || 'member';
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 animate-pulse">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
          <Home className="h-10 w-10 text-red-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Unable to Load Houses
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
          {error || "There was an error loading your houses. Please try again."}
        </p>
        <button
          onClick={() => dispatch(getUserHouse())}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors duration-200"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!houseData || houseData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-3xl flex items-center justify-center mb-6">
          <Home className="h-12 w-12 text-blue-500" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          No Houses Yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md text-lg">
          Create your first house to start managing tasks, bills, and shopping lists with your family or roommates.
        </p>
        <Link
          to="/house"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Home className="h-5 w-5 mr-3" />
          Create Your First House
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
      {houseData.map((house) => (
        <div 
          key={house._id} 
          className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1"
        >
          {/* Gradient Border Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
          
          <div className="relative">
            {/* Header */}
            <div className="p-6 pb-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                    <Home className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                      {house.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                      {house.description || "No description provided"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Address */}
              {house.address && (
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 rounded-lg px-3 py-2">
                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{house.address}</span>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="px-6 pb-4">
              <div className="grid grid-cols-3 gap-3 mb-4">
                {/* Total Members */}
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                  <div className="flex items-center justify-center space-x-1 text-gray-600 dark:text-gray-400 mb-1">
                    <Users className="h-3 w-3" />
                    <span className="text-xs font-medium">Members</span>
                  </div>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {(house.members?.length || 0) + 1}
                  </p>
                </div>

                {/* Admin */}
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                  <div className="flex items-center justify-center space-x-1 text-gray-600 dark:text-gray-400 mb-1">
                    <Crown className="h-3 w-3" />
                    <span className="text-xs font-medium">Admin</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                    {getAdminName(house).split(" ")[0]}
                  </p>
                </div>

                {/* Created Date */}
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                  <div className="flex items-center justify-center space-x-1 text-gray-600 dark:text-gray-400 mb-1">
                    <Calendar className="h-3 w-3" />
                    <span className="text-xs font-medium">Created</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {formatDate(house.createdAt)}
                  </p>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between">
                {/* Role Badge */}
                <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${
                  getUserRole(house) === "admin"
                    ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg"
                    : "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                }`}>
                  {getUserRole(house) === "admin" ? (
                    <>
                      <Crown className="h-3 w-3 mr-1" />
                      Admin
                    </>
                  ) : (
                    <>
                      <User className="h-3 w-3 mr-1" />
                      Member
                    </>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  {/* Edit Button */}
                  <button
                    onClick={() => handleEdit(house)}
                    className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200"
                    title="Edit House"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>

                  {/* View Dashboard Button */}
                  <Link
                    to={`/house/${house._id}/dashboard`}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group/btn"
                  >
                    View
                    <ArrowRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Admin Only Actions */}
          {getUserRole(house) === "admin" && (
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="relative">
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-gray-700 rounded-xl shadow-sm transition-all duration-200">
                  <MoreVertical className="h-4 w-4" />
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 top-12 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 py-2 z-10">
                  <button
                    onClick={() => handleEdit(house)}
                    className="flex items-center w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Settings className="h-4 w-4 mr-3" />
                    Edit House
                  </button>
                  <button
                    onClick={() => handleDelete(house)}
                    className="flex items-center w-full px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <Trash2 className="h-4 w-4 mr-3" />
                    Delete House
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HouseCard;