import React from 'react'
import {  statsData,  } from '../assets/assets';
import StatsData from '../components/StatsData';
import TaskData from '../components/TaskData';


const Dashboard = () => {
  return (
    <div className="h-screen flex flex-col p-6 space-y-6 dark:bg-primary-dark">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold">{statsData.welcomeMessage}</h2>
        <p className="text-blue-100">{statsData.tasksToComplete} tasks to complete</p>
      </div>

      < StatsData />

      {/* Scrollable Tasks Section - FIXED */}
      < TaskData />
    </div>
  );
}

export default Dashboard