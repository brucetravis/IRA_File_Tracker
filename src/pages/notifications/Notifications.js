import React, { useState } from "react";
import "./Notifications.css";
import { CheckCircle, AlertTriangle, Info, Bell } from "lucide-react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "Critical",
      message: "Document #123 has expired and requires archiving.",
      category: "Retention",
      date: "2025-09-15 14:20",
      read: false,
    },
    {
      id: 2,
      type: "Info",
      message: "Your password will expire in 5 days.",
      category: "System",
      date: "2025-09-14 10:05",
      read: false,
    },
    {
      id: 3,
      type: "Warning",
      message: "Pending approval for Procurement File #456.",
      category: "Approval",
      date: "2025-09-13 09:15",
      read: true,
    },
  ]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const dismissNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <section className="notifications-page">
      <header className="notifications-header">
        <h2>
          <Bell size={22} /> Notifications & Alerts
        </h2>
        <button 
          className="btn-mark" 
          onClick={markAllAsRead}
        >
          Mark all as read
        </button>
      </header>

      <div className="notifications-list">
        {notifications.length === 0 ? (
          <p className="empty">🎉 No new notifications</p>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`notification-card ${n.type.toLowerCase()} ${
                n.read ? "read" : "unread"
              }`}
            >
              <div className="icon">
                {n.type === "Critical" && <AlertTriangle size={20} />}
                {n.type === "Warning" && <AlertTriangle size={20} />}
                {n.type === "Info" && <Info size={20} />}
              </div>

              <div className="details">
                <p className="message">{n.message}</p>
                <small>
                  {n.category} • {n.date}
                </small>
              </div>

              <div className="actions">
                {!n.read && (
                  <button
                    className="btn-small read-btn"
                    onClick={() => markAsRead(n.id)}
                  >
                    <CheckCircle size={16} /> Mark Read
                  </button>
                )}
                <button
                  className="btn-small dismiss-btn"
                  onClick={() => dismissNotification(n.id)}
                >
                  ✖
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
