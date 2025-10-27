import React, { useState } from 'react'
import './RequestModal.css'
import ReactDOM from "react-dom"
import { XCircle } from 'lucide-react'

export default function RequestModal({ onClose }) {
  
  // state to handle the form data
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    fileName: ""
  })


  // function to handle the change in characters
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  
  return ReactDOM.createPortal(
    <div
      className="ira-request-file-modal"
    >
      <XCircle
        size={20}
        color='#f50e0e'
        onClick={onClose}
        className='x-close-modal'
      />

      <form
        className='request-form-modal'
      >
        <h3>Request File</h3>

        <div
          className='request-input-one'
        >
          <input 
            type='text'
            name='userName'
            placeholder='John Doe'
            value={formData.name}
            onChange={() => handleChange()}
            required          
          />


          <input
            type='text'
            name='department'
            placeholder='Intermediaries'
            value={formData.department}
            onChange={() => handleChange()}
            required
          />
        </div>

        <div
          className='request_file_name'
        >
          <input
            type='text'
            name='fileName'
            placeholder='AI advancement.docs'
            value={formData.fileName}
            onChange={() => handleChange()}
            required
          />
        </div>


        <div
            className='request-modal-buttons'
        >
          <button 
              type='submit'
              className='request-btn'
              // onClick={handleSubmit}
          >
            Request
          </button>

          <button 
            type='button'
            className='cancel-btn'
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>,
    document.body
  )
}