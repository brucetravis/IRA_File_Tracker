import React from 'react'
import './Audit.css'

export default function Audit() {

    return (
        <section className="audit-page">
            <h2>Audit Trail</h2>
            <p>Track all file activities and user actions.</p>

            {/* Filters */}
            <div className="filters">
                <input type="text" placeholder="Search by file or user..." />
                <select>
                    <option value="">All Actions</option>
                    <option>Upload</option>
                    <option>Update</option>
                    <option>Approve</option>
                    <option>Archive</option>
                    <option>Delete</option>
                    <option>Restore</option>
                </select>
                <input type="date" />
                <input type="date" />
                <button className="filter-btn">Apply</button>
            </div>

            {/* Audit Log Table */}
            <div className="audit-log">
                <table>
                <thead>
                    <tr>
                    <th>Timestamp</th>
                    <th>User</th>
                    <th>File</th>
                    <th>Action</th>
                    <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>2025-09-16 10:32</td>
                    <td>Jane Doe</td>
                    <td>HR Policy.docx</td>
                    <td>Upload</td>
                    <td>Uploaded new version</td>
                    </tr>
                    <tr>
                    <td>2025-09-15 15:20</td>
                    <td>Admin</td>
                    <td>Finance Report 2023.pdf</td>
                    <td>Archive</td>
                    <td>Auto-archived after retention</td>
                    </tr>
                </tbody>
                </table>
            </div>

            {/* Export */}
            <div className="export-actions">
                <button className="export-btn">Export CSV</button>
                <button className="export-btn">Export PDF</button>
            </div>
        </section>

    )
}