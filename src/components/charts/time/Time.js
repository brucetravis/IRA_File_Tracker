import React from 'react'
import './Time.css'
import {
    LineChart, Line, XAxis,
    YAxis, CartesianGrid, 
    Tooltip, ResponsiveContainer
} from "recharts";


export default function Time() {

    const usageData = [
        { month: "Jan", usage: 100 },
        { month: "Feb", usage: 300 },
        { month: "Mar", usage: 200 },
        { month: "Apr", usage: 500 },
        { month: "May", usage: 400 },
        { month: "Jun", usage: 600 }
    ];

    return (
        <div className="chart-card">
            <h4>Usage Over Time</h4>
            <ResponsiveContainer width="100%" height={250}>
            <LineChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="usage" stroke="#82ca9d" />
            </LineChart>
            </ResponsiveContainer>
        </div>
    )
}