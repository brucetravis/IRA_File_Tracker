import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './AddFile.css'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function AddFile({ onClose }) {

    // state to hold the form data
    const [formData, setFormData] = useState({
        name: '',
        department: '',
    })


    // fuction to retrieve the text from the browser
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }


    // function to handle the form submission
    const handleSubmit = async (e) => {
        // prevent the default form behaviour
        e.preventDefault()

        try {
            await axios.post('http://localhost:5000/iraAPI/fileregistry', formData)

            toast.success('File Added successfully.')
            onClose() // close the modal
            

            // reset the form to be empty
            setFormData({ name: '', department: '' })

        } catch (err) {
            if (err.response) {
                // if the backend sends a 409 send a specific message
                if (err.response.status === 409) {
                    toast.info(err.response.data.message)
                } else if (err.response.status === 400) {
                    toast.error('All fields required.')
                } else {
                    toast.error('Something went wrong, Please try again.')
                }
            } else {
                console.error('ERROR: ', err.message)
                toast.error('Failed to add File.')
            }
        }
    }

  return ReactDOM.createPortal(
    <div
        className='ira-add-file-modal'
    >
        <form
            className='form-modal'
            onSubmit={handleSubmit}
        >
            <h3>ADD FILE</h3>
            <div
                className='first-input-group'
            >
                
                <div>
                    <label>Name: </label>
                    <input 
                        type='text'
                        name='name'
                        placeholder='Meeting Notes.docx'
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Department:</label>
                    <input 
                        type='text'
                        name='department'
                        placeholder='ICT'
                        value={formData.department}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div
                className='modal-buttons'
            >
                <button 
                    type='submit'
                    className='submit-btn'
                    // onClick={handleSubmit}
                >
                    Add File
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
