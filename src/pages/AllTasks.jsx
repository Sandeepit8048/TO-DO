import { IoMdAdd } from "react-icons/io";
import { TbReportAnalytics } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import AddTodo from "../Components/AddTood";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import EditTodo from "../Components/EditTool";
import { deleteTask, setFilter } from "../redux/TaskSlice";
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
// import Nav from "../components/Nav";
import { Link } from "react-router-dom";

function AllTasks() {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.tasks);
    const filter = useSelector((state) => state.tasks.filter);
    const [isAddboxopen, setisAddboxopen] = useState(false);
    const [isEditboxopen, setisEditboxopen] = useState(false);
    const [currentTaskId, setcurrentTaskId] = useState();

    const todoTasks = tasks.filter((t) => t.status === "Todo");
    const pendingTasks = tasks.filter((t) => t.status === "Pending");
    const completedTasks = tasks.filter((t) => t.status === "Completed");

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            dispatch(deleteTask(id));
            toast.error("Task Removed.");
        }
    };

    const handleEditTask = (id) => {
        setisEditboxopen(true);
        setcurrentTaskId(id);
    };

    const closeEditModal = () => {
        setcurrentTaskId(null);
        setisEditboxopen(false);
    };

    const handleAddTask = () => {
        setisAddboxopen(false);
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return `${date.getDate()} ${months[date.getMonth()]}`;
    }

    const handleFilterChange = (event) => {
        dispatch(setFilter(event.target.value));
    };

    const filteredTasks = tasks.filter((task) => {
        switch (filter) {
            case "Completed": return task.status === "Completed";
            case "Pending": return task.status === "Pending";
            case "Overdue": return new Date(task.dueDate) < new Date();
            default: return true;
        }
    });

    return (
        <div className="taskmanager p-4">
            {/* <Nav /> */}
            <div className="flex flex-wrap justify-between items-center mb-4">
                <div className="text-xl md:text-2xl font-bold">Task Manager</div>
                <button onClick={() => setisAddboxopen(true)} className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg">
                    <IoMdAdd size={20} />
                    <p className="text-sm md:text-[16px]">Add Task</p>
                </button>
            </div>

            {/* Dashboard View */}
            <div className="grid grid-cols-1 md:grid-cols-8 gap-4">
                <div className="col-span-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[{ title: "Wishlist", color: "blue-400", data: todoTasks },
                      { title: "Pending", color: "orange-400", data: pendingTasks },
                      { title: "Completed", color: "green-400", data: completedTasks }].map(({ title, color, data }) => (
                        <div key={title} className=" rounded-lg shadow">
                            <div className={`p-4 rounded-t-lg flex justify-between items-center font-bold bg-${color} `}>
                            
                                <h1 className="text-xl">{title}</h1>
                                {title === "Wishlist" && <IoMdAdd size={20} className=" rounded-full cursor-pointer" onClick={() => setisAddboxopen(true)} />}
                            </div>
                            <div className="p-4 overflow-auto max-h-96">
                                
                                {data.map((task) => (
                                    <div key={task.id} className="border rounded-md p-3 mb-3 shadow-sm hover:shadow-lg">
                                        <h2 className="text-lg font-semibold ">{task.task}</h2>
                                        <div className="flex justify-between mt-3 text-sm">
                                            <span>{formatDate(task.dueDate)}</span>
                                            <div className="flex gap-2">
                                                <FaEdit onClick={() => handleEditTask(task.id)} className="cursor-pointer" />
                                                <RiDeleteBinLine onClick={() => handleDelete(task.id)} className="cursor-pointer" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    
                </div>

                {/* Analytics */}
                <div className="col-span-6 md:col-span-2 bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center gap-2 mb-4">
                        <TbReportAnalytics size={24} />
                        <h2 className="text-2xl font-bold">Analytics</h2>
                    </div>
                    <div className="space-y-6">
                        <div className="text-blue-900">
                            <p className="text-sm">Total Tasks</p>
                            <h1 className="text-5xl font-bold">{todoTasks.length}</h1>
                        </div>
                        <div className="text-red-600">
                            <p className="text-sm">Pending Tasks</p>
                            <h1 className="text-5xl font-bold">{pendingTasks.length}</h1>
                        </div>
                        <div className="text-green-500">
                            <p className="text-sm">Completed</p>
                            <h1 className="text-5xl font-bold">{completedTasks.length}</h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter + All Tasks */}
            <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4">All Tasks</h2>
                <div className="flex flex-wrap justify-between gap-2 mb-4">
                    <select
                        value={filter}
                        onChange={handleFilterChange}
                        className="p-2 border rounded-md bg-gray-100"
                    >
                        <option value="ALL">All Tasks</option>
                        <option value="Completed">Completed Tasks</option>
                        <option value="Pending">Pending Tasks</option>
                        <option value="Overdue">Overdue Tasks</option>
                    </select>
                </div>

                <div className="tasks flex gap-4 flex-wrap">
                    {filteredTasks.length > 0 ? filteredTasks.map((task) => (
                        <div key={task.id} className={`task w-72 h-72 flex flex-col justify-between bg-white p-4 rounded-lg shadow-md border ${task.status.toLowerCase()}`}>
                            <h2 className="text-2xl font-semibold">{task.task}</h2>
                            <div className="flex justify-between items-center mt-12">
                                <span>{formatDate(task.dueDate)}</span>
                                <span className="font-semibold">{task.status}</span>
                                <div className="flex gap-2">
                                    <FaEdit onClick={() => handleEditTask(task.id)} className="cursor-pointer" />
                                    <RiDeleteBinLine onClick={() => handleDelete(task.id)} className="cursor-pointer" />
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="text-gray-500 text-center w-full">No tasks available. Add some tasks to get started!</div>
                    )}
                </div>
            </div>

            {isAddboxopen && <AddTodo isOpen={isAddboxopen} onClose={handleAddTask} />}
            {isEditboxopen && <EditTodo id={currentTaskId} closeEditModal={closeEditModal} />}
            <Toaster />
        </div>
    );
}

export default AllTasks;