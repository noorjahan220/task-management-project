import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import axios from 'axios';
import { useState } from 'react';
import EditTaskModal from './EditTaskModal';

const TaskBoard = ({ tasks, setTasks }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const updatedTasks = [...tasks];
    const draggedTask = updatedTasks.find(task => task._id === result.draggableId);
    if (!draggedTask) return;

    draggedTask.category = destination.droppableId;
    setTasks(updatedTasks);

    try {
      await axios.put(`https://task-management-server-two-lovat.vercel.app/tasks/${draggedTask._id}`, 
        { category: draggedTask.category }
      );
    } catch (error) {
      console.error("Error updating task category:", error);
    }
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setModalIsOpen(true);
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`https://task-management-server-two-lovat.vercel.app/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(tasks.map(task => (task._id === updatedTask._id ? updatedTask : task)));
  };

  const categories = ['To-Do', 'In Progress', 'Done'];

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
          {categories.map((category) => (
            <div key={category} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">{category}</h3>
              <Droppable droppableId={category}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="min-h-[200px] space-y-2 border border-dashed border-gray-300 dark:border-gray-600 p-2 rounded-md"
                  >
                    {tasks.filter(task => task.category === category).length > 0 ? (
                      tasks.filter(task => task.category === category).map((task, index) => (
                        <Draggable key={task._id} draggableId={task._id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white dark:bg-gray-700 p-4 rounded-md shadow hover:shadow-lg transition-all"
                            >
                              <h4 className="font-medium text-gray-800 dark:text-gray-100">{task.title}</h4>
                              <p className="text-gray-600 dark:text-gray-300 text-sm">{task.description}</p>
                              <div className="mt-3 flex gap-2">
                                <button
                                  className="px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                  onClick={() => handleEdit(task)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                  onClick={() => handleDelete(task._id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))
                    ) : (
                      <div className="flex justify-center items-center h-32 text-gray-500 dark:text-gray-400 text-sm">
                        No tasks in this column
                      </div>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {selectedTask && (
        <EditTaskModal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          task={selectedTask}
          onTaskUpdated={handleTaskUpdated}
        />
      )}
    </>
  );
};

export default TaskBoard;
