import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

// For accessibility: tell Modal which element is your app root
Modal.setAppElement('#root');

const EditTaskModal = ({ isOpen, onRequestClose, task, onTaskUpdated }) => {
  // Local state for the form fields
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [category, setCategory] = useState(task.category);

  // Ensure local state updates if the task prop changes
  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description || '');
    setCategory(task.category);
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send update request to backend
      const response = await axios.put(
        `https://task-management-server-two-lovat.vercel.app/tasks/${task._id}`,
        { title, description, category }
      );
      // Update parent state via callback
      onTaskUpdated(response.data.task);
      onRequestClose();
    } catch (error) {
      console.error('Error updating task:', error);
      // Optionally, display an error notification here
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Task"
      className="bg-white p-6 rounded shadow-lg max-w-md mx-auto mt-20"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <h2 className="text-2xl mb-4">Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title:</label>
          <input
            type="text"
            className="border rounded p-2 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength="50"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description:</label>
          <textarea
            className="border rounded p-2 w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength="200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category:</label>
          <select
            className="border rounded p-2 w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <div className="flex justify-end gap-3">
          <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={onRequestClose}>
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTaskModal;
