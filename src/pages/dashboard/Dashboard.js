import React from 'react'
import './Dashboard.css'
import DashCards from '../../components/cards/dashcards/DashCards'
import ActivityChart from '../../components/fileactivitychart/ActivityChart'
import RecentActivity from '../../components/recentactivity/RecentActivity'
import QuickAccess from '../../components/quickaccess/QuickAccess'

export default function Dashboard() {
  return (
    <div
      className='dashboard'
    >
      <DashCards />
      <div
        className='section-one'
      >
        <ActivityChart />
        <RecentActivity />
      </div>

      <div
        className='section-two'
      >
        <QuickAccess />
      </div>
    </div>
  )
}
