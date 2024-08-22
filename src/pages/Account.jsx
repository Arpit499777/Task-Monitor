import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';

const Account = () => {
  const [userDetails, setUserDetails] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        console.log("token",token)
        const response = await axios.get("https://taskmonitor.azurewebsites.net/api/auth/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      
      // Call the logout API
      await axios.post("https://taskmonitor.azurewebsites.net/api/auth/logout", {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Clear the token from local storage
      localStorage.removeItem("jwtToken");
  
      // Navigate to the login page
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Logout failed!");
    }
  };
  

  return (
    <>
      <Header />
      <div className="bg-white p-10 rounded-lg shadow-2xl w-full max-w-3xl flex flex-col items-center">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800">User Profile</h2>
          <p className="text-gray-600">Manage your account information</p>
        </div>
        {userDetails ? (
          <div className="w-3/4">
            <div className="mb-6">
              <span className="block text-gray-700 text-sm font-semibold mb-2">Name</span>
              <p className="text-xl text-gray-800 font-medium">
                {userDetails.firstName} {userDetails.lastName}
              </p>
            </div>
            <div className="mb-6">
              <span className="block text-gray-700 text-sm font-semibold mb-2">Email</span>
              <p className="text-xl text-gray-800 font-medium">{userDetails.email}</p>
            </div>
          </div>
        ) : (
          <p>Loading user details...</p>
        )}
        <button
          onClick={handleLogout}
          className="mt-4 w-3/4 bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition duration-300"
        >
          Logout
        </button>
      </div>
      <Footer />
    </>
  );
};

export default Account;
