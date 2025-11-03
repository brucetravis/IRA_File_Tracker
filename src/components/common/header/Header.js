import React from 'react'
import './Header.css'
import { Bell } from 'lucide-react';
import api from '../../../configs/axios';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

export default function Header() {
    // const [showNotifications, setShowNotifications] = useState(false);
    
    const notifications = [
        'File ABC has been returned',
        'New user registered',
        'File XYZ is pending',
    ];

    // useNavigate to navigate to another page
    const navigate = useNavigate()

    // const toggleNotifications = () => setShowNotifications(!showNotifications);
    
    // function to log out
    const handleLogOut = async () => {
        
        try {
            await api.post('http://localhost:5000/iraApi/logout')
            localStorage.removeItem("userData")
            localStorage.removeItem("accessToken");
            localStorage.removeItem('refreshToken')
            toast.success('Logged out successfully.')
            navigate("/");
        } catch (err) {
            console.error("Logout failed: ", err)
            toast.error('Logout failed.')
        }
    }

    // Get the user data from the localStorage
    const userData = JSON.parse(localStorage.getItem("userData"))

  return (
    <div 
        className='header'
    >
        <div
            className='header-profile'
        >
            <div
                className='header-email'
            >
                <p className='profile-text'>{userData?.email}</p>

                <i className="chevron-down bi bi-caret-down-fill"></i>                
                {/* <button
                    onClick={handleLogOut}
                >
                    Logout
                </button> */}
            </div>

            {/* <p className='profile-text'>Welcome Romeo Gustavo</p> */}
            {/* <p className='profile-text'>{userData?.email}</p> */}

            {/* <div
                className={`notification-bell`}
                // onClick={toggleNotifications}
            >
                <Bell size={25}  className='bell-icon' fill='yellow' />
                {notifications.length > 0 && <span className='badge'>{notifications.length}</span>}

                <div
                    className='notification-dropdown'
                >
                    {notifications.map((note, index) => (
                        <p 
                            key={index} 
                            className='notification-item'
                        >
                            {note}
                        </p>
                    ))}
                </div>
            </div> */}

            {/* <div
                className='notification-dropdown'
            >
                {notifications.map((note, index) => (
                    <p 
                        key={index} 
                        className='notification-item'
                    >
                        {note}
                    </p>
                ))}
            </div> */}

            {/* {showNotifications && (
                <div
                    className='notification-dropdown'
                >
                    {notifications.map((note, index) => (
                        <p 
                            key={index} 
                            className='notification-item'
                        >
                            {note}
                        </p>
                    ))}
                </div>
            )} */}
        </div>

    </div>
  )
}
