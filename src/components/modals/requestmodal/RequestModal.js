import React, { useState } from 'react'
import './RequestModal.css'
import ReactDOM from "react-dom"
import { useRequest } from '../../contexts/requestProvider'
import { useFile } from '../../contexts/FileProvider'
import { XCircle } from 'lucide-react'

export default function RequestModal({ onClose, fileId }) {
  
  // import the necessart functions from the request context
  const { handleSubmit } = useRequest()

  const { files } = useFile()

  const file = files.find(f => f.id === fileId)

  // state to hold the status of a specific file
  // const [ taken, isTaken ] = useState()
  
  return ReactDOM.createPortal(
    <div
      className="ira-request-file-modal"
    >
      {file.status === "Taken" ? (
        <div className='request-form-modal text-center position-relative'>
          <XCircle 
            size={18}
            stroke='#ff0303'
            style={{ position: "absolute", top: "10px", right: "20px", cursor: "pointer" }}
            onClick={onClose}
          />
          
          <h2>File Taken</h2>
          <h3>Contact Admin for Further Assistance.</h3>
        </div>
      ) : (
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
      )}
      
      
    </div>,
    document.body
  )
}