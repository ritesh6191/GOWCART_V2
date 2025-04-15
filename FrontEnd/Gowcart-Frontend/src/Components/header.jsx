import React, { useState } from 'react';
import Logo from '../assests/gowcart-logo.png';
import { FaUserCircle } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();


  const logoutUser = async () => {
    try {
      await axios.post(
        "/user/logout",
        {},
        { withCredentials: true }
      );
      toast.success("Logged out successfully");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);
      toast.error("Logout failed");
    }
  };

  return (
    <>
      <header className="bg-green-700 text-white shadow-md sticky top-0 z-50 h-20">
        <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-center relative">
          {/* Profile Icon */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer">
            <FaUserCircle size={30} onClick={() => setSidebarOpen(true)} />
          </div>

          {/* Centered Logo + Title */}
          <div className="flex items-center space-x-3">
            <img src={Logo} alt="GOWCART logo" className="h-40 w-45 object-contain" />
          </div>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white text-black shadow-lg transform transition-transform duration-300 z-50 ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">User Profile</h2>
          <IoClose size={24} className="cursor-pointer" onClick={() => setSidebarOpen(false)} />
        </div>
        <div className="p-4 space-y-2">
          <Link to="/profile">
          <button className="mt-4 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 w-full">
            Go To Profile
          </button>
          </Link>
          <button
            onClick={logoutUser}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-800 w-full"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
