import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import logo from "../assets/logo.png";

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyId: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://taskmonitor.azurewebsites.net/api/auth/register', formData);
      if (response.status === 201) {
        // Navigate to the login page on successful registration
        navigate('/');
      }
    } catch (error) {
      console.error('Registration failed!', error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className=" fixed inset-0 flex min-h-screen bg-gray-50">
      {/* Left side (form) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 lg:px-8 space-y-4">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold mb-6 text-gray-900">Create Account</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form Fields */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full h-12 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white text-black"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-3">
            <div className="mb-3 flex-1">
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full h-12 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white text-black"
                placeholder="First Name"
              />
            </div>
            <div className="mb-3 flex-1">
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full h-12 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white text-black"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full h-12 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white text-black"
              placeholder="Password"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full h-12 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white text-black"
              placeholder="Confirm Password"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">Company Id</label>
            <input
              type="text"
              name="companyId"
              value={formData.companyId}
              onChange={handleChange}
              className="mt-1 block w-full h-12 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white text-black"
              placeholder="Company ID"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
          >
            Register
          </button>
        </form>

        <div className="mt-4 text-center text-gray-600">
          Already have an account? <Link to="/" className="text-indigo-500 hover:underline">Log in</Link>
        </div>
      </div>

      {/* Right side (branding) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-900 to-black flex-col justify-center items-center text-center text-white px-16">
        <h1 className="text-4xl font-bold mb-6">Welcome to <span className="text-green-400">Agile World Technologies</span></h1>
        <p className="text-lg mb-8">
          Agile World Technologies is a service-based company dedicated to delivering top-notch solutions across various industries. Our expertise helps businesses achieve their goals with innovative and efficient services.
        </p>
        <img src={logo} alt="Agile World Technologies Logo" className="w-1/3"/>
      </div>
    </div>
  );
};

export default Registration;
