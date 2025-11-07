import React from 'react'
import './QuickAccess.css'
import { useNavigate } from 'react-router'

export default function QuickAccess() {
  
  // import thr useNavigate hook from react
  const  navigate = useNavigate()


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
          onClick={() => navigate('/fileregistry')}
        >
          Add New File
        </button>

        <button 
          className="qa-btn"
          onClick={() => navigate('/users')}
        >
          Users
        </button>
        
        <button 
          className="qa-btn"
          onClick={() => navigate('/audit')}
        >
          Audit Trail
        </button>
      </div>
    </div>
  )
}
