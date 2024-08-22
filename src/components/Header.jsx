import React from "react";
import { FaQuestionCircle, FaBuilding, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // Replace with the path to your professional logo

const Header = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/home")
  }

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white flex items-center justify-between p-2 shadow-lg z-10">
      <img
        className="h-14 w-auto sm:h-18"
        src={logo}
        alt="Professional Logo"
        onClick={handleClick}
      />
      <div className="flex items-center space-x-4">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/help")}
        >
          <FaQuestionCircle className="h-6 w-6 sm:h-8 sm:w-8" />
          <span className="ml-1 text-sm sm:text-base">Help</span>
        </div>
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/company")}
        >
          <FaBuilding className="h-6 w-6 sm:h-8 sm:w-8" />
          <span className="ml-1 text-sm sm:text-base">Company</span>
        </div>
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/account")}
        >
          <FaUserCircle className="h-6 w-6 sm:h-8 sm:w-8" />
          <span className="ml-1 text-sm sm:text-base">Account</span>
        </div>
      </div>
    </nav>
  );
};

export default Header;
