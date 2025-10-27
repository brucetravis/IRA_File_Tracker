import React from 'react'
import './RecentActivity.css'
import { FileMinus, FilePlus, UserPlus, CheckCircle } from 'lucide-react'

export default function RecentActivity() {

    // Example activity data (later can come from API/database)
    const activities = [
        { id: 1, action: "File #123 taken by Bruce", time: "2 mins ago", icon: FileMinus, color: "#e74c3c" },
        { id: 2, action: "File #89 returned by Alice", time: "10 mins ago", icon: FilePlus, color: "#27ae60" },
        { id: 3, action: "New user John added", time: "1 hour ago", icon: UserPlus, color: "#2980b9" },
        { id: 4, action: "File #456 approved", time: "Yesterday", icon: CheckCircle, color: "#f39c12" }
    ]

  return (
    <div className="recent-activity-card">
        <h3 className='activity-title'>Recent Activity</h3>
        
        <ul className="activity-list">
            {activities.map(item => {
                const Icon = item.icon
                return (
                    <li key={item.id} className="activity-item">
                    <div className="activity-left">
                        <div className="activity-icon" style={{ backgroundColor: item.color + "20" }}>
                        <Icon size={18} color={item.color} />
                        </div>
                        <span className="activity-text">{item.action}</span>
                    </div>
                    <span className="activity-time">{item.time}</span>
                    </li>
                )
            })}
        </ul>
    </div>
  )
}
