import React from 'react'
import './Categories.css'
import {
    Tooltip, PieChart, Pie, 
    Cell, Legend, ResponsiveContainer
} from "recharts";


export default function Categories() {

    const categoryData = [
        { name: "Policies", value: 400 },
        { name: "Contracts", value: 300 },
        { name: "Reports", value: 200 },
        { name: "Memos", value: 100 }
    ];

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    return (
        <div className="chart-card">
          <h4>File Categories</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
    )
}