import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './../../providers/AuthProvider';
import TaskBoard from './../../Components/TaskBoard';
import { Link } from 'react-router-dom';
import { FiPlus, FiLoader, FiSun, FiMoon } from 'react-icons/fi';

const Home = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (isDarkMode) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Rest of the existing useEffect for fetching tasks remains the same
  useEffect(() => {
    const fetchTasks = async () => {
      if (!user?.email) {
        console.log("No user email found, skipping fetch.");
        setLoading(false);
        return;
      }
  
      try {
        console.log("Fetching tasks for:", user.email);
        const response = await axios.get(
          'https://task-management-server-two-lovat.vercel.app/tasks',
          { params: { userEmail: user.email } }
        );
  
        console.log("Response data:", response.data);
  
        if (!Array.isArray(response.data)) {
          throw new Error("Invalid response format");
        }
  
        setTasks(response.data);
        console.log("Updated tasks state:", response.data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchTasks();
  }, [user?.email]);

  // Add dark mode toggle button to the header
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section with Dark Mode Toggle */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Task Management
            </h1>
            {user?.displayName && (
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Welcome back, {user.displayName} 👋
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              {isDarkMode ? (
                <FiSun className="w-6 h-6 text-yellow-500" />
              ) : (
                <FiMoon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>
            
            <Link
              to="/addTask"
              className="bg-indigo-600 dark:bg-indigo-700 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-800 transition-colors flex items-center gap-2"
            >
              <FiPlus className="w-5 h-5" />
              <span>Add New Task</span>
            </Link>
          </div>
        </div>

        {/* Stats Overview - Updated for dark mode */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {['Total Tasks', 'To Do', 'Completed'].map((stat, index) => (
            <div key={stat} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat}</h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
                {index === 0 ? tasks.length : 
                 index === 1 ? tasks.filter(task => task.category === 'To-Do').length :
                 tasks.filter(task => task.category === 'Done').length}
              </p>
            </div>
          ))}
        </div>

        {/* Main Content */}
        {tasks.length > 0 ? (
          <TaskBoard tasks={tasks} setTasks={setTasks} />
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4 text-gray-300 dark:text-gray-600">📭</div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                No tasks found
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Get started by creating your first task
              </p>
              <Link
                to="/addTask"
                className="bg-indigo-600 dark:bg-indigo-700 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-800 transition-colors inline-flex items-center gap-2"
              >
                <FiPlus className="w-5 h-5" />
                <span>Create Task</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;