import React, { useState } from 'react'
import './Header.css'
import { Bell, Sun, Moon, Search } from 'lucide-react';
import api from '../../../configs/axios';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

export default function Header() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  const userData = JSON.parse(localStorage.getItem("userData"));

  const handleLogOut = async () => {
    try {
      await api.post('http://localhost:5000/iraApi/logout');
      localStorage.clear();
      toast.success('Logged out successfully.');
      navigate("/");
    } catch (err) {
      console.error("Logout failed: ", err);
      toast.error('Logout failed.');
    }
  };

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <header className="header">
      <div className="header-left">
        {/* <h1 className="brand-name">IRA File Tracker</h1> */}
        <h1 className='brand-name'>Welcome {userData?.name}</h1>
      </div>
{/* 
      <div className="header-center">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search files, users..." />
        </div>
      </div> */}

      <div className="header-right">
        <div className="icon-btn" title="Notifications">
          <Bell size={22} />
          <span className="badge">3</span>
        </div>

        <div className="icon-btn theme-toggle" onClick={toggleTheme}>
          {darkMode ? <Sun size={22} /> : <Moon size={22} />}
        </div>

        <div className="profile-section">
          <p className="profile-email">{userData?.email || "user@email.com"}</p>
          <i className="bi bi-caret-down-fill chevron-down"></i>

          <div className="profile-dropdown">
            {/* <p className="dropdown-item">My Profile</p> */}
            <p className="dropdown-item" onClick={handleLogOut}>Logout</p>
          </div>
        </div>
      </div>
    </header>
  );
}

