// Components/Signup.jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = () => {
    if (username.trim() === '') return alert("Enter a username!");
    dispatch(register({ name: username }));
    alert('Registered successfully. Please login!');
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

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
          className="w-full mb-4 px-4 py-2 border rounded"
        />
        <button
          onClick={handleSignup}
          className="w-full bg-green-500 text-white px-4 py-2 rounded"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signup;
