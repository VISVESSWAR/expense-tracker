import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons"; 

export default function Header({ setMode }) {
  const changeMode = async (e) => {
    setMode("add");
  };

  return (
    <nav className="bg-gray-800 p-4 flex items-center justify-between">
      <div className="ml-10 text-white text-xl font-bold flex items-center">
        <FontAwesomeIcon icon={faBriefcase} className="mr-3" />
        <Link to="/">
        Expense Tracker
        </Link>
      </div>
      <div className="flex space-x-4">
        <Link
          to="/add"
          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
          onClick={changeMode}
        >
          Add Expense
        </Link>
        <Link
          to="/"
          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
          onClick={changeMode}
        >
          View All Expenses
        </Link>
      </div>
    </nav>
  );
}
