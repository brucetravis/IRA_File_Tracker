import React from 'react'
import './Department.css'
import {
    BarChart, Bar,
    XAxis, YAxis, CartesianGrid, 
    Tooltip, ResponsiveContainer
} from "recharts";

export default function Department() {

    // Dummy chart data
    const uploadsData = [
        { dept: "HR", uploads: 400 },
        { dept: "Finance", uploads: 300 },
        { dept: "Legal", uploads: 200 },
        { dept: "Procurement", uploads: 280 },
        { dept: "General", uploads: 150 }
    ];

    return (
        <div className="chart-card">
            <h4>Uploads per Department</h4>
            <ResponsiveContainer width="100%" height={250}>
            <BarChart data={uploadsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dept" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="uploads" fill="#8884d8" />
            </BarChart>
            </ResponsiveContainer>
        </div>
    )
}