import React, { useEffect, useState } from 'react'
import './EditModal.css'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function EditModal({ onClose, file, updatePage }) {

    // state to contain the formData
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        department: '',
        status: ''
    })


    // funtion to handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }


    // function to handle the form submission
    const handleSubmit = async (e) => {

        // prevent the default behaviour of the form / prevent page reload
        e.preventDefault()

        try {
            // send a PUT request to the backend
            await axios.put(`http://localhost:5000/iraAPI/fileregistry/${formData.id}`, 
                            formData) // update with the updated form data

            // notify the user that the file has been updated
            toast.success('File updated successfully.')

            updatePage(formData)

            // close the modal
            onClose()

        } catch (err) {
            // console update error
            console.error("UPDATE ERROR: ", err.message)
            toast.error('Failed to update file.')
        }
    }

    // useEffect
    useEffect(() => {
        if (file) {
            setFormData({
                id: file.id,
                name: file.name,
                department: file.department
            })
        }

    }, [file])


  return ReactDOM.createPortal(
    <div
        className='ira-edit-file-modal'
    >
        <form
            className='form-modal'
            onSubmit={handleSubmit}
        >
            <h3>EDIT FILE</h3>
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
                    Save changes
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
