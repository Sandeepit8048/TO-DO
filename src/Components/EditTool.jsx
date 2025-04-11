import { motion } from 'framer-motion';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/TaskSlice';
import { MdPlaylistAdd } from "react-icons/md";
import toast from 'react-hot-toast';

const AddTaskDialog = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState('');
  const [taskStatus, setTaskStatus] = useState('Todo');
  const [dueDate, setDueDate] = useState('');

  const handleAddTask = () => {
    if (!taskName.trim()) {
      toast.error("Task name cannot be empty");
      return;
    }

    dispatch(addTask({
      id: Date.now(),
      task: taskName,
      status: taskStatus,
      dueDate: dueDate
    }));

    toast.success("Task added successfully!");
    setTaskName('');
    setTaskStatus('Todo');
    setDueDate('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      <motion.div
        className="relative bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-md"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
          <MdPlaylistAdd size={28} />
          Add New Task
        </h2>

        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">Task Name</label>
          <input
            type="text"
            placeholder="Enter task name"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">Due Date</label>
          <input
            type="date"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700">Status</label>
          <select
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={taskStatus}
            onChange={(e) => setTaskStatus(e.target.value)}
          >
            <option value="Todo">Todo</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg text-gray-800 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleAddTask}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium"
          >
            Add Task
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AddTaskDialog;
