import React, { useState, useEffect } from "react";
import { getPriorityBgColor, getPriorityColor } from "../assets/assets";
import { Calendar, User, Flag, Tag, Clock, X, Save, AlertCircle, ArrowLeft } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from "../feature/auth/authSlice";
import { getUserHouse } from "../feature/house/houseSlice";
import { createTask, clearError, clearSuccess } from "../feature/task/taskSlice"; // Import task actions
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const TaskForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    priority: "medium",
    dueDate: "",
    categories: [],
  });

  const [newCategory, setNewCategory] = useState("");
  const [errors, setErrors] = useState({});
  const [members, setMembers] = useState([]);
  const [house, setHouse] = useState({});
  const { houseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get state from Redux
  const { user } = useSelector((state) => state.auth);
  const { houses } = useSelector((state) => state.house);
  const { loading, error, success, createdTask } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getUserHouse());
  }, [dispatch]);

  useEffect(() => {
    if (!houses || houses.length === 0) return;

    const selectedHouse = houses.find((h) => h._id === houseId);

    if (selectedHouse) {
      setHouse(selectedHouse);
      setMembers(selectedHouse.members || []);
    } else {
      console.warn("⚠️ No house found with ID:", houseId);
      toast.error("House not found");
      navigate("/dashboard");
    }
  }, [houses, houseId, navigate]);

  // Handle success and error messages
  useEffect(() => {
    if (success && createdTask) {
      toast.success(`Task "${createdTask.title}" created successfully!`);
      // Redirect to tasks page or reset form
      setTimeout(() => {
        navigate(`/house/${houseId}/tasks`);
      }, 1500);
    }

    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [success, error, createdTask, navigate, houseId, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !formData.categories.includes(newCategory.trim())) {
      setFormData((prev) => ({
        ...prev,
        categories: [...prev.categories, newCategory.trim()],
      }));
      setNewCategory("");
    }
  };

  const handleRemoveCategory = (categoryToRemove) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.filter((cat) => cat !== categoryToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the errors in the form");
      return;
    }

    // Prepare data for API
    const submitData = {
      title: formData.title,
      description: formData.description,
      assignedTo: formData.assignedTo,
      priority: formData.priority,
      dueDate: formData.dueDate || undefined,
      categories: formData.categories
    };

    // Dispatch createTask action
    dispatch(createTask({ houseId, taskData: submitData }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.title.trim()) {
      errors.title = "Title is required";
    }

    if (!formData.assignedTo) {
      errors.assignedTo = "Please assign this task to a member";
    }

    if (formData.dueDate && new Date(formData.dueDate) < new Date().setHours(0, 0, 0, 0)) {
      errors.dueDate = "Due date cannot be in the past";
    }

    return errors;
  };

  const onCancel = () => {
    navigate(`/house/${houseId}/tasks`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCategory();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onCancel}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
            disabled={loading}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Tasks
          </button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Create New Task
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Create a new task for your household members
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Household:{" "}
                <strong className="text-gray-700 dark:text-gray-300">
                  {house.name || "Loading..."}
                </strong>
              </span>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form - 2/3 width */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title & Description Row */}
                <div className="grid grid-cols-1 gap-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Task Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter task title..."
                      disabled={loading}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 text-lg ${
                        errors.title
                          ? "border-red-500 dark:border-red-400"
                          : "border-gray-300 dark:border-gray-600"
                      } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    />
                    {errors.title && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {errors.title}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Add detailed description, instructions, or notes..."
                      disabled={loading}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 resize-none"
                    />
                  </div>
                </div>

                {/* Assignment & Details Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Assigned To */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Assign To *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                      <select
                        name="assignedTo"
                        value={formData.assignedTo}
                        onChange={handleChange}
                        disabled={loading}
                        className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white appearance-none ${
                          errors.assignedTo
                            ? "border-red-500 dark:border-red-400"
                            : "border-gray-300 dark:border-gray-600"
                        } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <option value="">Select a household member</option>
                        {members?.map((member) => (
                          <option key={member.user._id} value={member.user._id}>
                            {member.user.name}{" "}
                            {member.role === "admin" && "(Admin)"}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.assignedTo && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {errors.assignedTo}
                      </p>
                    )}
                  </div>

                  {/* Priority */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Priority
                    </label>
                    <div className="relative">
                      <Flag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                      <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white appearance-none"
                      >
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                      </select>
                    </div>
                    <div
                      className={`mt-3 px-4 py-2 rounded-lg text-sm font-medium ${getPriorityBgColor(
                        formData.priority
                      )} ${getPriorityColor(
                        formData.priority
                      )} border text-center`}
                    >
                      {formData.priority.charAt(0).toUpperCase() +
                        formData.priority.slice(1)}{" "}
                      Priority
                    </div>
                  </div>
                </div>

                {/* Due Date & Categories Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Due Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Due Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                      <input
                        type="date"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleChange}
                        min={new Date().toISOString().split("T")[0]}
                        disabled={loading}
                        className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                          errors.dueDate
                            ? "border-red-500 dark:border-red-400"
                            : "border-gray-300 dark:border-gray-600"
                        } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      />
                    </div>
                    {errors.dueDate && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {errors.dueDate}
                      </p>
                    )}
                  </div>

                  {/* Categories */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Categories
                    </label>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Add a category..."
                          disabled={loading}
                          className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                        />
                        <button
                          type="button"
                          onClick={handleAddCategory}
                          disabled={loading}
                          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Tag className="w-4 h-4" />
                          Add
                        </button>
                      </div>

                      {/* Category Tags */}
                      {formData.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {formData.categories.map((category, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-lg text-sm"
                            >
                              {category}
                              <button
                                type="button"
                                onClick={() => handleRemoveCategory(category)}
                                disabled={loading}
                                className="hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-50"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={onCancel}
                    disabled={loading}
                    className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-lg font-medium disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-3 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Creating...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        Create Task
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Task Information
              </h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Created By
                  </h4>
                  <p className="text-gray-900 dark:text-white">
                    {user?.name || "Loading..."}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Household
                  </h4>
                  <p className="text-gray-900 dark:text-white">
                    {house.name || "Loading..."}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Status
                  </h4>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
                    Pending
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;