import React, { useContext, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

const TaskForm = () => {
  const { user } = useContext(AuthContext);
  const [task, setTask] = useState({
    title: '',
    description: '',
    category: 'To-Do',
  });
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate title
    if (task.title.trim() === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Title is required',
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#4f46e5',
      });
      return;
    }

    try {
      // Submit task to backend
      await axios.post('https://task-management-server-two-lovat.vercel.app/tasks', {
        ...task,
        userEmail: user.email,
      });

      // Reset form and show success
      setTask({ title: '', description: '', category: 'To-Do' });
      Swal.fire({
        icon: 'success',
        title: 'Task Added',
        text: 'Task added successfully!',
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#4f46e5',
      });

      // Navigate to home after adding task
      navigate('/');
    } catch (error) {
      console.error('Error adding task:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response ? error.response.data.message : 'Unknown error',
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#4f46e5',
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md transition-colors duration-300">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 text-center">
        Add a New Task
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label 
            htmlFor="title" 
            className="block text-gray-700 dark:text-gray-300 mb-1"
          >
            Task Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
            maxLength="50"
            placeholder="Enter task title"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
              bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 
              focus:ring-2 focus:ring-indigo-500 focus:border-transparent
              transition-colors duration-200"
          />
        </div>

        {/* Description Textarea */}
        <div>
          <label 
            htmlFor="description" 
            className="block text-gray-700 dark:text-gray-300 mb-1"
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            maxLength="200"
            placeholder="Enter task description (optional)"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
              bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 
              focus:ring-2 focus:ring-indigo-500 focus:border-transparent
              transition-colors duration-200 resize-none h-32"
          />
        </div>

        {/* Category Select */}
        <div>
          <label 
            htmlFor="category" 
            className="block text-gray-700 dark:text-gray-300 mb-1"
          >
            Category:
          </label>
          <select
            id="category"
            name="category"
            value={task.category}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
              bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 
              focus:ring-2 focus:ring-indigo-500 focus:border-transparent
              transition-colors duration-200"
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 dark:bg-indigo-700 text-white 
            rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-800 
            transition-colors duration-200 font-medium"
        >
          Add Task
        </button>

        {/* Home Button */}
        <button
          type="button"
          onClick={() => navigate('/')}
          className="w-full py-3 mt-4 bg-gray-600 dark:bg-gray-700 text-white 
            rounded-lg hover:bg-gray-700 dark:hover:bg-gray-800 
            transition-colors duration-200 font-medium"
        >
          Go to Home
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
