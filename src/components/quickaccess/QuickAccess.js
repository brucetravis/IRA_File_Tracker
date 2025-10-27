import React from 'react'
import './QuickAccess.css'

export default function QuickAccess() {
  return (
    <div className="quick-access">
      <h3>Quick Access</h3>
      <div className="quick-buttons">
        <button className="qa-btn">File Registry</button>
        <button className="qa-btn">Add New File</button>
        <button className="qa-btn">Users</button>
        <button className="qa-btn">Reports</button>
      </div>
    </div>
  )
}
