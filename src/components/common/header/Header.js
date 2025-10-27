import React from 'react'
import './Header.css'
import { Bell } from 'lucide-react';

export default function Header() {
    // const [showNotifications, setShowNotifications] = useState(false);
    
    const notifications = [
        'File ABC has been returned',
        'New user registered',
        'File XYZ is pending',
    ];

    // const toggleNotifications = () => setShowNotifications(!showNotifications);

  return (
    <div 
        className='header'
    >
        <div
            className='header-profile'
        >
            <p className='profile-text'>Welcome Romeo Gustavo</p>
            <img
                src={require('../../../images/profile.jpg')}
                alt='profile pic'
                className='profile-pic'
            />

            <div
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
            </div>

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
