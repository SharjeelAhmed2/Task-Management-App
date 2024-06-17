import React from 'react';
import '../App.css'; // Import the CSS file for styling
import { useNavigate } from "react-router-dom";
function Navbar() {

  const navigate = useNavigate(); 

  const logout = () =>{
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    // <nav className="navbar">
    //   <ul className="nav-links">
    //     <li><a href="/">Home</a></li>
    //     <li><a href="/about">About</a></li>
    //     <li><a href="/services">Services</a></li>
    //     <li><a href="/contact">Contact</a></li>
    //   </ul>
    // </nav>
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <a href="/profile" className="text-white hover:text-gray-300">Dashboard</a>
            <a href="/details" className="text-white hover:text-gray-300">Details</a>
            <a href="/taskAdd" className="text-white hover:text-gray-300">Add Task</a>
            <a href="/viewTask" className="text-white hover:text-gray-300">ViewTask</a>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-gray-300" onClick={logout}>Logout</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;  