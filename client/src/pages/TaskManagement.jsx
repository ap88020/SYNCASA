import React, { useEffect, useState } from "react";
import {
  tasksData,
  getPriorityColor,
  getPriorityBgColor,
} from "../assets/assets";
import { SquareDashedTopSolid, Trash2, SquareCheckBig } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getUserHouse } from "../feature/house/houseSlice";
import { getTask , completeTask} from "../feature/task/taskSlice";
import toast from "react-hot-toast";

const TaskManagement = () => {
  const [taskD, setTaskD] = useState([]);
  const [house, setHouses] = useState([]);
  const dispatch = useDispatch();
  const { houses } = useSelector((state) => state.house);
  const { tasks , error} = useSelector((state) => state.tasks);
  useEffect(() => {
    dispatch(getUserHouse());
    // dispatch(getTask())
  }, [dispatch]);

  useEffect(() => {
    setHouses(houses);
    setTaskD(tasks);
  }, [houses, tasks]);

  // console.log(taskD)

  const toggleStatus = async (id) => {
  try {
    const resultAction = await dispatch(completeTask({ taskId: id }));

    if (completeTask.fulfilled.match(resultAction)) {
      toast.success(resultAction.payload?.message || "Task marked as completed!");
    } 
    else if (completeTask.rejected.match(resultAction)) {
      toast.error(error || "You are not assigned for this task");
    }
  } catch (error) {
    toast.error("You are not assigned to this task");
  }
};


  const toggleDelete = (id) => {
    // dispatch(completeTask({taskId:id}))
  };

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
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          Tasks
        </h2>
        <div className="flex gap-2 items-center justify-center flex-wrap">
          {house && house.length > 0 ? (
            house.map((house) => (
              <button
                key={house._id}
                onClick={() => dispatch(getTask({ houseId: house._id }))}
                className="border dark:border-yellow-300 border-dashed dark:text-white px-4 py-2 rounded-md cursor-pointer hover:text-red-400 transition-colors"
              >
                <h1>{house.name}</h1>
              </button>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No houses found</p>
          )}
        </div>
      </div>

      {/* Tasks List */}
      <div className="h-[70vh] overflow-y-scroll space-y-4">
        {taskD.length === 0 && <div className="text-white px-3 py-2 bg-blue-400 items-center text-center">There is no task</div>}
        {taskD.map((task, index) => (
          <div
            key={task._id || task.id || index}
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 task-animate`}
            style={{ animationDelay: `${index * 0.05}s` }} 
          >
            {/* Task Header */}
            <div className="flex justify-between items-center text-center mb-3">
              <h3 className="flex items-center text-center gap-4 font-semibold text-gray-900 dark:text-white cursor-pointer">
                {task.status == "pending" ? (
                  <SquareDashedTopSolid
                    className="rounded-xl text-yellow-400"
                    onClick={() => toggleStatus(task._id)}
                  />
                ) : (
                  <SquareCheckBig
                    className="text-green-500"
                    onClick={() => toggleStatus(task._id)}
                  />
                )}
                {task.title}
              </h3>
              <div className="flex gap-2">
                <Trash2
                  className="dark:text-white cursor-pointer"
                  onClick={() => toggleDelete(task._id)}
                />
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
            <p
              className={`text-gray-600 dark:text-gray-400 text-sm mb-3 ${
                task.status === "pending"
                  ? ""
                  : "line-through decoration-red-400 dark:decoration-green-500"
              }`}
            >
              {task.description}
            </p>

            {/* Task Meta Information */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <span>👤</span>
                  <span>{task.assignedTo?.name}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>📅</span>
                  <span>Due {formatDate(task.updatedAt)}</span>
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
