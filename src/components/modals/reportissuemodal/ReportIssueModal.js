import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { toast } from 'react-toastify';
import './ReportIssueModal.css';
import api from '../../../configs/axios';

export default function ReportIssueModal({ isOpen, onClose }) {
  const [issue, setIssue] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!issue.trim()) return;

    try {
      setLoading(true);
      const res = await api.post('http://localhost:5000/iraAPI/issues', { issue });
      toast.success(res.data.message || 'Issue reported successfully!');
      setIssue('');
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to report issue');
    } finally {
      setLoading(false);
    }
  };

  return ReactDOM.createPortal(
    <div className="ira-modal-overlay">
      <div className="ira-modal">
        <div className="ira-modal-header">
          <h3>Report Issue</h3>
          <button className="ira-modal-close" onClick={onClose}>✖</button>
        </div>
        <form className="ira-modal-form" onSubmit={handleSubmit}>
          <textarea
            placeholder="Describe your issue..."
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            required
          />
          <button type="submit" className="ira-modal-submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}
