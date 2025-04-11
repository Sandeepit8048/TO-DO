import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AllTasks from './pages/AllTasks';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './redux/authSlice';

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <>
      {isAuthenticated && (
        <div className="flex justify-between items-center p-4 bg-gray-200">
          <h1 className="text-xl">Welcome, {user.name}</h1>
          <button
            onClick={() => dispatch(logout())}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Navigate to={isAuthenticated ? "/alltasks" : "/login"} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/alltasks"
          element={isAuthenticated ? <AllTasks /> : <Navigate to="/login" />}
        />
      </Routes>

      <Toaster />
    </>
  );
};

export default App;
