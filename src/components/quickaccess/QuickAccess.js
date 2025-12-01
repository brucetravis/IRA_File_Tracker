import React from 'react'
import './QuickAccess.css'
import { useNavigate } from 'react-router'
import { useUser } from '../contexts/UserProvider'

export default function QuickAccess() {
  
  // import thr useNavigate hook from react
  const  navigate = useNavigate()

  // get the user data from the the user context
  const { userData } = useUser()

  return (
    <div className="quick-access">
      <h3>Quick Access</h3>
      <div className="quick-buttons">
        <button 
          className="qa-btn"
          onClick={() => navigate('/fileregistry')}
        >
          File Registry
        </button>

        <button 
          className="qa-btn"
          onClick={userData?.role === "admin" ? () => navigate('/fileregistry') : () => alert('This is an admin only activity')}
        >
          Add New File
        </button>

        <button 
          className="qa-btn"
          onClick={userData?.role === "admin" ? () => navigate('/users') : () => alert('This is an admin only page.')}
        >
          Users
        </button>
        
        <button 
          className="qa-btn"
          onClick={userData?.role === "admin" ? () => navigate('/audit') : () => alert('This is an admin only page.')}
        >
          Audit Trail
        </button>
      </div>
    </div>
  )
}
