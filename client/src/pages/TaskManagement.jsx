import React, { useEffect, useState } from "react";
import { getPriorityColor, getPriorityBgColor } from "../assets/assets";
import { SquareDashedTopSolid, Trash2, SquareCheckBig } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getUserHouse } from "../feature/house/houseSlice";
import { getTask, completeTask, deleteTask } from "../feature/task/taskSlice";
import toast from "react-hot-toast";

const TaskManagement = () => {
  const [taskD, setTaskD] = useState([]);
  const [house, setHouses] = useState([]);
  const [selectedHouse, setSelectedHouse] = useState(null); // <-- selected house state
  const dispatch = useDispatch();
  const { houses } = useSelector((state) => state.house);
  const { tasks, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(getUserHouse());
    // optional: load all tasks initially if you want
    // dispatch(getTask());
  }, [dispatch]);

  useEffect(() => {
    setHouses(houses);
    setTaskD(tasks);
  }, [houses, tasks]);

  const onHouseClick = (h) => {
    // toggle selectedHouse: if clicking same house again, unselect
    const toSelect = selectedHouse && selectedHouse._id === h._id ? null : h;
    setSelectedHouse(toSelect);

    if (toSelect) {
      // fetch tasks for that house
      dispatch(getTask({ houseId: h._id }));
    } else {
      // if you want to show all tasks again you can:
      // dispatch(getTask()); // uncomment if backend supports fetching all tasks
      // or simply clear tasks (if tasks come from house-specific query)
      setTaskD([]); // or leave as-is depending on your backend logic
    }
  };

  // If you are *filtering client-side* (i.e. tasks contains all houses tasks),
  // you can use this filteredTasks instead of relying on backend fetch:
  // const filteredTasks = selectedHouse
  //   ? taskD.filter(t => t.houseId === selectedHouse._id)
  //   : taskD;

  const toggleStatus = async (id) => {
    try {
      const resultAction = await dispatch(completeTask({ taskId: id }));

      if (completeTask.fulfilled.match(resultAction)) {
        toast.success(
          resultAction.payload?.message || "Task marked as completed!"
        );
      } else if (completeTask.rejected.match(resultAction)) {
        toast.error(error || "You are not assigned for this task");
      }
    } catch (error) {
      toast.error("You are not assigned to this task");
    }
  };

  const toggleDelete = async (id) => {
    try {
      const resultAction = await dispatch(deleteTask({ taskId: id }));

      if (deleteTask.fulfilled.match(resultAction)) {
        toast.success(
          resultAction.payload?.message || "Task deleted successfully!"
        );
      } else if (deleteTask.rejected.match(resultAction)) {
        toast.error(resultAction.payload?.message || "Failed to delete task!");
      }
    } catch (error) {
      toast.error("Something went wrong while deleting task");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // choose tasks to show: (if server returns tasks for selected house then taskD is already correct)
  const tasksToShow = taskD; // or use filteredTasks for client-side filtering

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      {/* Header */}
      <div className="mb-8 ">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          Select house
        </h2>

        {selectedHouse === null ? (
          // show ALL houses (top to bottom)
          <div className="flex flex-col gap-2 w-full ">
            {house.map((h) => (
              <button
                key={h._id}
                onClick={() => onHouseClick(h)}
                className="border border-gray-200 dark:border-gray-700 dark:text-white px-4 py-2 rounded-md cursor-pointer hover:text-yellow-400 transition-colors w-full text-left"
              >
                <h1>{h.name}</h1>
              </button>
            ))}
          </div>
        ) : (
          // show ONLY the selected house
          <div className="flex flex-col gap-2 w-full">
            <button
              key={selectedHouse._id}
              onClick={() => setSelectedHouse(null)} // reset to show all again
              className="border border-gray-200 dark:border-gray-700 dark:text-white px-4 py-2 rounded-md cursor-pointer  w-full text-left shadow-mds"
            >
              <h1>{selectedHouse.name} <span className="bg-violet-950 p-1 rounded text-gray-500 font-medium hover:text-white transition-colors  ">Select All</span> </h1>
            </button>
          </div>
        )}
      </div>

      {/* Tasks List */}
      <div className="h-[70vh] overflow-y-scroll space-y-4">
        {tasksToShow.length === 0 && (
          <div className="text-white px-3 py-2 bg-blue-400 items-center text-center">
            There is no task
          </div>
        )}
        {tasksToShow.map((task, index) => (
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
