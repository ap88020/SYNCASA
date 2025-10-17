import React, { useEffect } from "react";
import { LogOut, Moon, Bell, Globe } from "lucide-react";
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { getProfile, login } from "../feature/auth/authSlice";


const Profile = () => {
  
  const userDuplicate = {
    name: "Alex Johnson",
    email: "alex@example.com",
    phone: "+1 (555) 123-4567",
    household: {
      name: "Downtown Apartment",
      inviteCode: "SYNC–7899",
      members: [
        { name: "Alex Johnson", role: "Owner", joined: "1/15/2023" },
        { name: "Sarah Miller", role: "Member", joined: "2/20/2023" },
        { name: "Sarah Miller", role: "Member", joined: "3/10/2023" },
      ],
    },
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {loading,success,message,user} = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProfile())
  },[dispatch])

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(login());
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-2 sm:px-4 md:px-8 dark:bg-primary-dark">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6 sm:p-8 space-y-6 dark:bg-gray-600">
        {/* Profile Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Profile</h2>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <img
              src={user.avatar || "https://i.pravatar.cc/100?img=3"}
              alt="profile"
              className="w-20 h-20 rounded-full border"
            />
            <div>
              <h3 className="text-lg font-semibold dark:text-white">{user.name}</h3>
              <p className="text-gray-500 dark:text-gray-50">{user.email}</p>
            </div>
          </div>

          <div className="mt-6 space-y-4 text-gray-700 dark:text-gray-50">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-50">Phone Number</p>
              <input
                type="text" 
                readOnly
                value={userDuplicate.phone}
                className="w-full border rounded-lg p-2 mt-1 bg-gray-50 text-gray-700"
              />
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-50">Household</p>
              <div className="mt-2 space-y-1 dark:text-gray-50">
                <p className="dark:text-gray-50">🏠 {userDuplicate.household.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-50">
                  Invite code: {userDuplicate.household.inviteCode}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2 dark:text-gray-50">Members</p>
              <ul className="space-y-2">
                {userDuplicate.household.members.map((member, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-gray-50 rounded-lg px-3 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={`https://i.pravatar.cc/40?img=${index + 5}`}
                        alt={member.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-gray-800">
                          {member.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {member.role} • Joined {member.joined}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={handleLogout} 
              className="w-full border border-gray-300 dark:border-green-500 text-gray-700 py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-gray-100 dark:bg-slate-800 hover:dark:bg-slate-900 cursor-pointer transition-colors dark:text-green-500">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {/* Settings Section */}
        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Settings</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium dark:text-white">Dark Mode</p>
                <p className="text-sm text-gray-500">
                  Switch between light and dark themes
                </p>
              </div>
              <Moon className="text-gray-500 dark:text-green-400" />
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium dark:text-white">Notifications</p>
                <p className="text-sm text-gray-500">
                  Enable or disable notifications
                </p>
              </div>
              <Bell className="text-gray-500 dark:text-green-500" />
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium dark:text-white">Language</p>
                <p className="text-sm text-gray-500">Change app language</p>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="text-gray-500 dark:text-white" />
                <select className="border rounded-lg px-2 py-1 text-sm">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>Hindi</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
