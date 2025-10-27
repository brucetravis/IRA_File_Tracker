import React, { useState } from "react";
import "./Settings.css";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <section className="settings-page">
      <aside className="settings-sidebar">
        <button onClick={() => setActiveTab("general")}>General</button>
        <button onClick={() => setActiveTab("users")}>User Management</button>
        <button onClick={() => setActiveTab("roles")}>Roles & Permissions</button>
        <button onClick={() => setActiveTab("notifications")}>Notifications</button>
        <button onClick={() => setActiveTab("security")}>Security</button>
        <button onClick={() => setActiveTab("integrations")}>Integrations</button>
      </aside>

      <main className="settings-content">
        {activeTab === "general" && (
          <div>
            <h2>General Settings</h2>
            <form className="form">
              <label>Organization Name</label>
              <input type="text" placeholder="Enter organization name" />

              <label>Default Language</label>
              <select>
                <option>English</option>
                <option>French</option>
                <option>Spanish</option>
              </select>

              <label>Timezone</label>
              <select>
                <option>GMT</option>
                <option>EAT</option>
                <option>PST</option>
              </select>

              <button type="submit">Save Changes</button>
            </form>
          </div>
        )}

        {activeTab === "users" && (
          <div>
            <h2>User Management</h2>
            <p>Here you can add, edit, or remove users.</p>
            {/* table of users would go here */}
          </div>
        )}

        {activeTab === "roles" && (
          <div>
            <h2>Roles & Permissions</h2>
            <p>Assign permissions to roles like Admin, Manager, Staff.</p>
          </div>
        )}

        {activeTab === "notifications" && (
          <div>
            <h2>Notifications</h2>
            <label>
              <input type="checkbox" /> Email Notifications
            </label>
            <label>
              <input type="checkbox" /> SMS Notifications
            </label>
            <label>
              <input type="checkbox" /> In-app Notifications
            </label>
          </div>
        )}

        {activeTab === "security" && (
          <div>
            <h2>Security Settings</h2>
            <label>Password Minimum Length</label>
            <input type="number" min="6" defaultValue="8" />
            <label>
              <input type="checkbox" /> Enable Two-Factor Authentication
            </label>
          </div>
        )}

        {activeTab === "integrations" && (
          <div>
            <h2>Integrations</h2>
            <p>Connect with external services like Google Drive, OneDrive, or APIs.</p>
          </div>
        )}
      </main>
    </section>
  );
}
