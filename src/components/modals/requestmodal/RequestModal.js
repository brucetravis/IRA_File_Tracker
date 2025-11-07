import React from 'react'
import './RequestModal.css'
import ReactDOM from "react-dom"
import { useRequest } from '../../contexts/requestProvider'
import { useFile } from '../../contexts/FileProvider'

export default function RequestModal({ onClose, fileId }) {
  
  // import the necessart functions from the request context
  const { handleSubmit } = useRequest()

  const { files } = useFile()

  const file = files.find(f => f.id === fileId)
  
  return ReactDOM.createPortal(
    <div
      className="ira-request-file-modal"
    >
      <div className='request-form-modal'>
        <h3>Request Confirmation</h3>
        <h2>You are about to request for</h2>
        <p className='text-center fw-bold text-success'>{file ? file.name : ''}</p>
        <h3>Confirm Your Request</h3>

        <div
          className='request-modal-buttons'
        >
          <button 
            type='submit'
            className='request-btn'
            onClick={() => {
              handleSubmit(fileId)
              onClose()
            }}
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
      </div>

      
    </div>,
    document.body
  )
}