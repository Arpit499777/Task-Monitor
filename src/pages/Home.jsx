import React, { useState, useEffect } from "react";
import moment from "moment";
import { InlineWidget } from "react-calendly";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate, Link } from 'react-router-dom';


function Home() {
  const [rows, setRows] = useState([
    {
      project: "",
      notes: Array(7).fill({ hours: "", task: "" }),
    },
  ]);

  const navigate = useNavigate();

  const [value, setValue] = useState(new Date());

  const [popup, setPopup] = useState({
    isVisible: false,
    rowIndex: null,
    dayIndex: null,
    note: "",
    fieldType: "",
  });

  const [timesheets, setTimesheets] = useState([]);

  useEffect(() => {
    const fetchTimesheets = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (token) {
          const response = await axios.get(
            "https://taskmonitor.azurewebsites.net/api/timesheets/list",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setTimesheets(response.data);
          const populatedRows = populateRows(response.data);
          setRows(populatedRows);
        }
      } catch (error) {
        console.error(
          "Failed to fetch timesheets:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchTimesheets();
  }, []);

  const populateRows = (timesheets) => {
    const newRows = timesheets.reduce((acc, entry) => {
      const dateIndex = moment(entry.date).weekday() - 1; // Adjust for zero-based index, starting Monday
      let rowIndex = acc.findIndex((row) => row.project === entry.projectName);

      if (rowIndex === -1) {
        rowIndex = acc.length;
        acc.push({
          project: entry.projectName,
          notes: Array(7).fill({ hours: "", task: "" }),
        });
      }

      acc[rowIndex].notes[dateIndex] = {
        hours: entry.hours || "",
        task: entry.task || "",
      };

      return acc;
    }, []);

    return newRows.length
      ? newRows
      : [{ project: "", notes: Array(7).fill({ hours: "", task: "" }) }];
  };

  const addNewRow = () => {
    setRows([
      ...rows,
      { project: "", notes: Array(7).fill({ hours: "", task: "" }) },
    ]);
  };

  const handleInputChange = (rowIndex, dayIndex, event) => {
    const { name, value } = event.target;

    if (name === "project") {
      const updatedRows = rows.map((row, i) =>
        i === rowIndex ? { ...row, project: value } : row
      );
      setRows(updatedRows);
    } else {
      const updatedRows = rows.map((row, i) =>
        i === rowIndex
          ? {
              ...row,
              notes: row.notes.map((note, j) =>
                j === dayIndex ? { ...note, [name]: value } : note
              ),
            }
          : row
      );
      setRows(updatedRows);
    }
  };

  const handleDeleteRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const handleNoteClick = (rowIndex, dayIndex, fieldType) => {
    setPopup({
      isVisible: true,
      rowIndex,
      dayIndex,
      note: rows[rowIndex].notes[dayIndex][fieldType],
      fieldType,
    });
  };

  const handleSave = () => {
    const updatedRows = rows.map((row, i) =>
      i === popup.rowIndex
        ? {
            ...row,
            notes: row.notes.map((note, j) =>
              j === popup.dayIndex
                ? { ...note, [popup.fieldType]: popup.note }
                : note
            ),
          }
        : row
    );
    setRows(updatedRows);
    setPopup({
      isVisible: false,
      rowIndex: null,
      dayIndex: null,
      note: "",
      fieldType: "",
    });
  };

  const handleCancel = () => {
    setPopup({
      isVisible: false,
      rowIndex: null,
      dayIndex: null,
      note: "",
      fieldType: "",
    });
  };

  const handleNewProject = () => {
    navigate('/project');  
  }

  const startOfWeek = moment().startOf("week").add(1, "day");
  const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
    startOfWeek.clone().add(i, "days")
  );

  const handleSaveOrSubmit = async () => {
    const token = localStorage.getItem("jwtToken");

    console.log("Token:", token);

    for (let row of rows) {
      for (let i = 0; i < daysOfWeek.length; i++) {
        const date = daysOfWeek[i].format("YYYY-MM-DD");
        const { hours, task } = row.notes[i];

        if (row.project && (hours || task)) {
          try {
            await axios.post(
              "https://taskmonitor.azurewebsites.net/api/timesheets/create",
              {
                projectName: row.project,
                date,
                hours: parseInt(hours, 10),
                task,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            console.log(
              `Data for ${row.project} on ${date} saved successfully!`
            );
          } catch (error) {
            console.error(
              `Failed to save data for ${row.project} on ${date}:`,
              error.response ? error.response.data : error.message
            );
          }
        }
      }
    }
  };

  return (
    <>
      <Header />
      <div className="pt-20 pb-16 min-h-screen bg-slate-100 mb-10">
        <div className="bg-white text-black flex justify-center items-center">
          <Calendar onChange={setValue} value={value} />
        </div>
        <div className="w-full h-full my-4 border-separate border-spacing-0 border-y-4">
          <div className="w-full h-full flex flex-col items-center">
            <div className="overflow-x-auto w-full">
              <table className="min-w-full border-separate border-spacing-0 border-t-4 border-blue-400">
                <thead>
                  <tr>
                    <th className="p-1"></th>
                    {daysOfWeek.map((day) => (
                      <th
                        key={day.format("YYYY-MM-DD")}
                        className="border-r-2 border-gray-500 w-28 p-1 text-xs text-black"
                      >
                        <div className="flex flex-col items-center">
                          <div>{day.format("ddd")}</div>
                          <div className="text-xs">
                            {day.format("D-MMM")}
                          </div>
                        </div>
                      </th>
                    ))}
                    <th className="border w-28 p-1"></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      <td className="border p-1 text-xs text-black">
                        <div className="relative">
                          <select
                            className="shadow appearance-none border rounded w-28 py-1 px-1 text-xs text-black bg-white leading-tight focus:outline-none focus:shadow-outline pr-4"
                            name="project"
                            value={row.project}
                            onChange={(e) =>
                              handleInputChange(rowIndex, null, e)
                            }
                          >
                            <option value="">Select</option>
                            <option value="project1">Project 1</option>
                            <option value="project2">Project 2</option>
                            <option value="project3">Project 3</option>
                            <option value="project4">Project 4</option>
                            <option value="project5">Project 5</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <svg
                              className="w-3 h-3 text-black"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>
                        </div>
                      </td>
                      {daysOfWeek.map((day, dayIndex) => (
                        <td
                          key={day.format("YYYY-MM-DD")}
                          className="border p-1 text-xs text-black"
                        >
                          <input
                            className="shadow appearance-none border rounded w-28 py-1 my-1 px-1 text-xs text-black bg-white leading-tight focus:outline-none focus:shadow-outline"
                            type="number"
                            placeholder="Hours"
                            name="hours"
                            value={row.notes[dayIndex].hours}
                            onChange={(e) =>
                              handleInputChange(rowIndex, dayIndex, e)
                            }
                            onClick={() =>
                              handleNoteClick(rowIndex, dayIndex, "hours")
                            }
                          />
                          <textarea
                            className="shadow appearance-none border rounded w-28 py-1 px-1 text-xs text-black bg-white leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Task"
                            name="task"
                            value={row.notes[dayIndex].task}
                            onChange={(e) =>
                              handleInputChange(rowIndex, dayIndex, e)
                            }
                            onClick={() =>
                              handleNoteClick(rowIndex, dayIndex, "task")
                            }
                          />
                        </td>
                      ))}
                      <td className="border p-1">
                        <button
                          className="bg-red-500 text-white text-xs font-semibold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                          onClick={() => handleDeleteRow(rowIndex)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              <button
                onClick={addNewRow}
                className="bg-green-500 text-white text-xs font-semibold py-2 px-4 rounded"
              >
                Add Row
              </button>
              <button
                onClick={handleSaveOrSubmit}
                className="bg-blue-500 text-white text-xs font-semibold py-2 px-4 rounded"
              >
                Save
              </button>
              <button
                onClick={handleNewProject}
                className="bg-gray-700 text-white text-xs font-semibold py-2 px-4 rounded"
              >
                New Project
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {popup.isVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-lg mb-2">Edit {popup.fieldType}</h3>
            <textarea
              className="border p-2 rounded w-full"
              value={popup.note}
              onChange={(e) =>
                setPopup({ ...popup, note: e.target.value })
              }
            />
            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
