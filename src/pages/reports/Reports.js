import React, { useState } from "react";
import "./Reports.css";
import Department from "../../components/charts/department/Department";
import Time from "../../components/charts/time/Time";
import Categories from "../../components/charts/categories/Categories";
import { useUser } from "../../components/contexts/UserProvider";
import { useRequest } from "../../components/contexts/requestProvider";

export default function Reports() {
  const [filters, setFilters] = useState({
    dateRange: "",
    department: "",
    reportType: ""
  });

  // Get the number of users from the user context
  const { users } = useUser()
  // Get the number of pending Requests from the file context
  const { filteredRequests } = useRequest()
  

  // Dummy KPI data
  const kpis = [
    { label: "Total Uploads", value: 1250 },
    { label: "Pending Approvals", value: filteredRequests.length },
    { label: "Archived Docs", value: 430 },
    { label: "Active Users", value: users.length }
  ];


  // Dummy reports table
  const reports = [
    { id: 1, name: "Monthly Uploads", dept: "HR", date: "2025-09-01" },
    { id: 2, name: "Compliance Overview", dept: "Finance", date: "2025-09-05" },
    { id: 3, name: "Audit Review", dept: "Legal", date: "2025-09-10" }
  ];

  const handleApply = () => {
    console.log("Filters applied:", filters);
    // fetch real data here
  };
  

  return (
    <div className="reports-page">
      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Date Range"
          value={filters.dateRange}
          onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
        />
        <select
          value={filters.department}
          onChange={(e) => setFilters({ ...filters, department: e.target.value })}
        >
          <option value="">All Departments</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Legal">Legal</option>
          <option value="Procurement">Procurement</option>
        </select>
        <select
          value={filters.reportType}
          onChange={(e) => setFilters({ ...filters, reportType: e.target.value })}
        >
          <option value="">Report Type</option>
          <option value="Usage">Usage</option>
          <option value="Compliance">Compliance</option>
          <option value="Uploads">Uploads</option>
        </select>
        <button className="apply-btn" onClick={handleApply}>Apply</button>
        <button
          className="reset-btn"
          onClick={() => setFilters({ dateRange: "", department: "", reportType: "" })}
        >
          Reset
        </button>
      </div>

      {/* KPI Cards */}
      <div className="kpi-cards">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="kpi-card">
            <h3>{kpi.value}</h3>
            <p>{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        <Department />
        <Time />
        <Categories />
      </div>

      {/* Reports Table */}
      <div className="reports-table">
        <h4>Detailed Reports</h4>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Report Name</th>
              <th>Department</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.name}</td>
                <td>{r.dept}</td>
                <td>{r.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="export-buttons">
          <button className="csv-btn">Export CSV</button>
          <button className="pdf-btn">Export PDF</button>
          <button className="excel-btn">Export Excel</button>
        </div>
      </div>
    </div>
  );
}
