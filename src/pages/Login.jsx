import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import logo from "../assets/logo.png";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://taskmonitor.azurewebsites.net/api/auth/login', formData);
      if (response.status === 200) {
        // Set the JWT token in local storage
        localStorage.setItem('jwtToken', response.data.token);
        // Navigate to the home page on successful login
        navigate('/home');
      }
    } catch (error) {
      alert('Login failed!' + (error.response?.data?.message || 'An error occurred'));
    }
  };

  return (
    <div className="fixed inset-0 flex min-h-screen">
      <div className="w-1/2 flex flex-col justify-center px-16">
        <h1 className="text-4xl font-bold mb-6 text-black">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-black"
              placeholder="Email Address"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-black"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-200"
          >
            Log In
          </button>
        </form>

        <div className="mt-4 text-sm text-gray-600">
          New user? <Link to="/registration" className="text-indigo-500 hover:underline">Create an account</Link>
        </div>
      </div>

      <div className="w-1/2 bg-gradient-to-br from-blue-900 to-black flex flex-col justify-center items-center text-center text-white px-16">
        <h1 className="text-3xl font-bold mb-4">Welcome to <span className="text-green-400">Agile World Technologies</span></h1>
        <p className="text-lg mb-8">
          Agile World Technologies is a service-based company dedicated to delivering top-notch solutions across various industries. Our expertise helps businesses achieve their goals with innovative and efficient services.
        </p>
        <img src={logo} alt="Agile World Technologies Logo" className="w-1/3"/>
      </div>
    </div>
  );
};

export default Login;
