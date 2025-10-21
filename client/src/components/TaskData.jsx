import React from 'react'
import { tasksData, getPriorityColor, getPriorityBgColor } from '../assets/assets'

const TaskData = () => {
  return (
    <div className="space-y-4">
      {tasksData.map((task) => (
        <div 
          key={task.id} 
          className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-gray-300 dark:hover:border-gray-600 transition-colors duration-200"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                {task.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {task.description}
              </p>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityBgColor(task.priority)} ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                {task.assigneeIcon}
                <span>{task.assignee}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
              {task.dueDateIcon}
              <span>Due {task.dueDate}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskData;