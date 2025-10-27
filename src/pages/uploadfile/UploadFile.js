import React, { useState } from "react";
import "./UploadFile.css";
import { Save, Upload, X } from "lucide-react";

export default function UploadFile() {
  // An array of all the departments
  const departments = ["HR", "Finance", "Legal", "Procurement", "General"];

  const status = ["Active", "Pending", "Archived", "Returned"];

  // state to handle the file change
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // function to handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("File added successfully");
  };

  return (
    <section className="upload-file-page">
      <h2>Upload File</h2>

      <form className="upload-file-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>File Name *</label>
          <input
            type="text"
            placeholder="Enter File name"
            name="fileName"
            required
          />
        </div>

        <div className="form-group">
          <label>File Number / Reference Number *</label>
          <input
            type="text"
            placeholder="Unique file number"
            name="fileNumber"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category *</label>
            <select required>
              <option value="">-- Select Category --</option>
              {departments.map((department, index) => (
                <option key={index}>{department}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Status *</label>
            <select required>
              <option value="">-- Select Status --</option>
              {status.map((stat, index) => (
                <option key={index}>{stat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea placeholder="Brief description about the file"></textarea>
        </div>

        <div className="form-group upload-group">
            <label>Upload File (optional)</label>
            <div className="file-upload">
                <input type="file" id="fileInput" onChange={handleFileChange} />
                <label htmlFor="fileInput" className="upload-label">
                    <Upload size={18} /> {file ? file.name : "Choose File"}
                </label>
            </div>
        </div>

        <div className="form-row">
            <div className="row-one">
                <div className="form-group">
                    <label>Recipient</label>
                    <input
                        type="text"
                        placeholder="e.g John Doe / HR Department"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Due Date</label>
                    <input type="date" />
                </div>
            </div>
        </div>

        <div className="form-actions">
            <button type="button" className="btn cancel">
                <X size={18} /> Cancel
            </button>

            <button type="submit" className="btn submit">
                <Save size={18} /> Save File
            </button>
        </div>
      </form>
    </section>
  );
}
