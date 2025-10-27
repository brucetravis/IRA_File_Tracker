import React from 'react'
import './Retention.css'


export default function Retention() {

    return (
        <section className="retention-page">
            <h2>Retention & Archiving</h2>
            <p>Manage file lifecycle, retention periods, and archiving policies.</p>

            {/* Retention Settings */}
            <div className="retention-card">
                <h3>Retention Settings</h3>
                <label>Retention Period *</label>
                <select>
                <option>1 Year</option>
                <option>3 Years</option>
                <option>5 Years</option>
                <option>Permanent</option>
                </select>

                <label>Retention Category</label>
                <select>
                <option>Legal</option>
                <option>Finance</option>
                <option>HR</option>
                <option>General</option>
                </select>

                <p><strong>Expiry Date:</strong> 16 Sept 2030</p>
            </div>

            {/* Archiving Options */}
            <div className="archive-card">
                <h3>Archiving</h3>
                <button className="archive-btn">Archive Now</button>
                <label className="checkbox">
                <input type="checkbox" /> Auto-Archive on expiry
                </label>
            </div>

            {/* Archive Management */}
            <div className="archive-list">
                <h3>Archived Files</h3>
                <input type="text" placeholder="Search archived files..." />
                <ul>
                <li>
                    Finance Report 2022 – Archived on 12 Aug 2025
                    <div className="actions">
                    <button className="restore-btn">Restore</button>
                    <button className="delete-btn">Delete Permanently</button>
                    </div>
                </li>
                </ul>
            </div>
        </section>

    )
}