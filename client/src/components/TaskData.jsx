import React from 'react'
import {tasksData , getPriorityColor, getPriorityBgColor} from '../assets/assets'

const TaskData = () => {
  return (
    <div className="flex-1 overflow-y-auto pb-20 sm:pb-2 ">
        <div className="space-y-4 pb-6 ">
          <h3 className="text-xl font-semibold dark:text-white">Tasks</h3>
          {tasksData.map((task) => (
            <div key={task.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow dark:bg-gradient-to-r dark:from-gray-700 dark:to-surface-dark">
              <div className="flex items-center justify-between">
                <h4 className="font-medium dark:text-green-500">{task.title}</h4>
                <div className={`px-2 py-1 rounded text-xs font-medium ${getPriorityBgColor(task.priority)} ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                {task.description}
              </p>
              
              <div className="flex items-center justify-between mt-3 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  {task.assigneeIcon}
                  <span>{task.assignee}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  {task.dueDateIcon}
                  <span>Due {task.dueDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  )
}

export default TaskData