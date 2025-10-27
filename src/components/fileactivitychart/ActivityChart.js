import React from 'react'
import './ActivityChart.css'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function ActivityChart() {

    // chart data
    const data = [
        { month: "Jan", taken: 40, returned: 24 },
        { month: "Feb", taken: 30, returned: 13 },
        { month: "Mar", taken: 20, returned: 98 },
        { month: "Apr", taken: 27, returned: 39 },
        { month: "May", taken: 18, returned: 48 },
        { month: "Jun", taken: 23, returned: 38 },
        { month: "Jul", taken: 50, returned: 43 },
        { month: "Aug", taken: 27, returned: 51 },
        { month: "Sept", taken: 32, returned: 43 },
        { month: "Oct", taken: 49, returned: 67 },
        { month: "Nov", taken: 21, returned: 81 },
        { month: "Dec", taken: 36, returned: 34 }
    ]

  return (
    <div
        style={{ width: '100%', height: 300 }}
        className='activity-chart-card'
    >
        <h3 className='chart-title'>File Activity</h3>
        <ResponsiveContainer>
            <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="taken" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="returned" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
        </ResponsiveContainer>
    </div>
  )
}
