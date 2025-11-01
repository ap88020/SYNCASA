import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createHouse, joinHouse } from '../feature/house/houseSlice.js';
import { toast } from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'

const HouseholdCreation = () => {
  const [householdName, setHouseholdName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const navigate = useNavigate()

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.house);

  
  const handleCreateSubmit = (e) => {
    e.preventDefault();
    dispatch(createHouse({ name: householdName, address, description }))
      .unwrap()
      .then(() => toast.success('House created successfully!'))
      .catch((err) => toast.error(err || 'Failed to create house'));
  };


  const handleJoinSubmit = (e) => {
    e.preventDefault();
    if (!joinCode) return toast.error('Join code is required!');
    dispatch(joinHouse({ joinCode }))
      .unwrap()
      .then(() => {
        toast.success('Joined house successfully!')
        navigate('/profile')
      })
      .catch((err) => toast.error(err || 'Failed to join house'));
  };

  return (  
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {isJoining ? 'Join Household' : 'Create Household'}
          </h1>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          {isJoining ? (
            // ✅ Join by joinCode only
            <form onSubmit={handleJoinSubmit}>
              <div className="mb-6">
                <label className="block mb-1 text-gray-700 dark:text-gray-300">
                  Join Code
                </label>
                <input
                  type="text"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  className="w-full border px-3 py-2 rounded-md uppercase dark:text-green-500 dark:border-white"
                  placeholder="Enter join code"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-md"
              >
                {loading ? 'Joining...' : 'Join Household'}
              </button>
            </form>
          ) : (
            // ✅ Create House
            <form onSubmit={handleCreateSubmit}>
              <div className="mb-4">
                <label className="block mb-1 text-gray-700 dark:text-gray-300">
                  Household Name
                </label>
                <input
                  type="text"
                  value={householdName}
                  onChange={(e) => setHouseholdName(e.target.value)}
                  className="w-full border px-3 py-2 rounded-md dark:text-green-500 dark:border-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-gray-700 dark:text-gray-300">
                  Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border px-3 py-2 rounded-md dark:text-green-500 dark:border-white"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block mb-1 text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border px-3 py-2 rounded-md dark:text-green-500 dark:border-white"
                  rows="3"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-md"
              >
                {loading ? 'Creating...' : 'Create Household'}
              </button>
            </form>
          )}
        </div>

        <div className="text-center">
          {isJoining ? (
            <button
              onClick={() => setIsJoining(false)}
              className="underline text-blue-600"
            >
              Create New Household
            </button>
          ) : (
            <button
              onClick={() => setIsJoining(true)}
              className="underline text-blue-600"
            >
              Join with Code
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HouseholdCreation;
