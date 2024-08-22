import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "@heroicons/react/24/solid"; // Make sure to install heroicons or use any icon library you prefer
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";

const CustomDateInput = ({ value, onClick }) => (
  <div className="relative">
    <input
      type="text"
      value={value}
      onClick={onClick}
      readOnly
      className="border border-gray-300 bg-white text-gray-900 rounded-lg w-full py-2 px-4 pr-10"
    />
    <CalendarIcon
      className="absolute right-3 top-2 h-5 w-5 text-gray-500 cursor-pointer"
      onClick={onClick}
    />
  </div>
);

const Project = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        console.log("token", token);
        const response = await axios.get(
          "https://taskmonitor.azurewebsites.net/api/auth/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setUserDetails(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleClick = () => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mb-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-gray-900">Projects</h1>
          <div className="flex space-x-4">
            <h6 className="text-gray-700">Project</h6>
            <h6 className="text-gray-700">Variation</h6>
          </div>
        </div>

        <div className="bg-purple-500 text-white p-4 rounded-lg mb-6">
          <p className="text-xl">
            {/* Edit Variation - Project <input className="bg-white text-black"></input> : {""} */}
            {userDetails?.firstName || "Username"}
          </p>
        </div>

        <div className="border border-gray-300 p-6 rounded-lg bg-gray-50">
          <p className="bg-blue-100 p-3 text-blue-800 rounded-lg mb-4">
            Variation
          </p>

          <div className="space-y-6">
            <div className="flex gap-6">
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-1">
                  Title
                </label>
                <input
                  type="text"
                  className="border border-gray-300 bg-white text-gray-900 rounded-lg w-full py-2 px-4"
                />
              </div>
              <div className="flex-1">
                <label className="block text-black font-medium mb-1">
                  Status
                </label>
                <div className="flex gap-6">
                  <div className="flex items-center">
                    <input
                      name="status"
                      type="radio"
                      className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-black"
                      id="active"
                    />
                    <label className="ml-2 text-black" htmlFor="active">
                      Active
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      name="status"
                      type="radio"
                      className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-black"
                      id="inactive"
                    />
                    <label className="ml-2 text-gray-700" htmlFor="inactive">
                      Inactive
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-1">
                  Start Date
                </label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  customInput={<CustomDateInput />}
                  dateFormat="yyyy/MM/dd"
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-1">
                  End Date
                </label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  customInput={<CustomDateInput />}
                  dateFormat="yyyy/MM/dd"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleClick}>
            Submit
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Project;
