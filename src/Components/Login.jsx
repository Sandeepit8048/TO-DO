// Components/Login.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const[password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registeredUser = useSelector((state) => state.auth.registeredUser);

  const handleLogin = () => {
    if (username.trim() === '') {
      alert("Enter a username!");
      return;
    }

    if (!registeredUser || username !== registeredUser.name) {
      alert("Invalid username! Please check or register.");
      return; // Do NOT redirect
    }

    dispatch(login({ name: username }));
    navigate('/alltasks'); // ✅ Redirect only if valid
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded"
        />
        <input
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
