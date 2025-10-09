import React, { useEffect, useState } from "react";
import {
  tasksData,
  getPriorityColor,
  getPriorityBgColor,
} from "../assets/assets";
import { SquareDashedTopSolid,Trash2 , SquareCheckBig } from "lucide-react";

const TaskManagement = () => {

  const [taskD, setTaskD] = useState(tasksData)

  const toggleStatus = (id) => {
    setTaskD((prev) => prev.map((task) => task.id === id ? {...task, status: task.status === "pending" ? "don" : "pending"} : task ))
  }

  const toggleDelete = (id) => {
    setTaskD((prev) => prev.filter((task) => task.id != id))
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          Tasks
        </h2>
      </div>

      {/* Tasks List */}
      <div className="h-[70vh] overflow-y-scroll space-y-4">
        {taskD.map((task) => (
          <div
            key={task.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4"
          >
            {/* Task Header */}
            <div className="flex justify-between items-center text-center mb-3">
              
                <h3 className="flex items-center text-center gap-4 font-semibold text-gray-900 dark:text-white cursor-pointer">  
                  {task.status == "pending" ? < SquareDashedTopSolid className=" rounded-xl text-yellow-400 " onClick={()=>toggleStatus(task.id)} /> : <  SquareCheckBig className=" text-green-500" onClick={()=>toggleStatus(task.id)} />}
                  {task.title}
                </h3>
                <div className="flex gap-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium`}
                  >
                    <Trash2 className="dark:text-white cursor-pointer" onClick={()=>toggleDelete(task.id)} />
                  </span>
                  <span
                    className={`px-2 rounded text-xs font-medium flex items-center ${getPriorityBgColor(
                      task.priority
                    )} ${getPriorityColor(task.priority)}`}
                  >
                    {task.priority}
                  </span>
                </div>
              
            </div>

            {/* Task Description */}
            <p className={`text-gray-600 dark:text-gray-400 text-sm mb-3 ${task.status == "pending" ? "" : "line-through decoration-red-400 dark:decoration-green-500" }`}>
              {task.description}
            </p>

            {/* Task Meta Information */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                {/* Assignee */}
                <div className="flex items-center space-x-1">
                  <span>👤</span>
                  <span>{task.assignee}</span>
                </div>

                {/* Due Date */}
                <div className="flex items-center space-x-1">
                  <span>📅</span>
                  <span>Due {formatDate(task.dueDate)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskManagement;
