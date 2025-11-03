import React, { useEffect, useState } from 'react'
import './EditUser.css'
import ReactDOM from "react-dom"
import api from '../../../configs/axios'
import { toast } from 'react-toastify'

export default function EditUser({ onClose, user, updatePage }) {

    // state to handle the form data
    const [ formData, setFormData ] = useState({
        id: "",
        name: "",
        email: "",
        password: "",
        role: "",
        status: "",
        department: ""
    }) // initial state is an object

    // function to handle the change in characters
    const handleChange = (e) => [
        setFormData(prev => ({
            // get the previous character
            ...prev,
            [e.target.name]: e.target.value
        }))
    ]


    // function to edit a users info
    const handleSubmit =  async (e) => {
        
        e.preventDefault() //prevent the default form behaviour

        try {
            await api.put(`http://localhost:5000/iraAPI/users/${formData.id}`, formData)
            // Notify the user that the details has been updated
            toast.success("User updated successfully.")

            updatePage(formData)

            onClose()
            
        } catch(err) {
            console.log("Error updating user details: ", err)
            toast.error("Error updating user details.")
        }
    }

    // useEffect
    useEffect(() => {
        if (user) {
            setFormData({
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
                role: user.role,
                department: user.department,
                status: user.status
            })
        }

    }, [user])


  return ReactDOM.createPortal(
    <div
        className='ira-edit-user-modal'
    >
        <form
            className='form-modal'
            onSubmit={handleSubmit}
        >
            <h3>EDIT USER</h3>
            
            <div
                className='first-input-group'
            >   
                <div>
                    <label>Name: </label>
                    <input 
                        type='text'
                        name='name'
                        placeholder='Meeting Notes.docx'
                        value={formData.name.charAt(0).toUpperCase() + formData.name.slice(1)}
                        onChange={handleChange}
                        required
                    />
                </div>


                <div>
                    <label>Email:</label>
                    <input 
                        type='email'
                        name='email'
                        placeholder='johndoe@ira.go.ke'
                        value={formData.email.toLowerCase().trim()}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>


            <div
                className='second-input-group'
            >
                <div>
                    <label>Password:</label>
                    <input 
                        type='password'
                        name='password'
                        placeholder='*******'
                        value={formData.password.trim()}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Role:</label>
                    <input 
                        type='text'
                        name='status'
                        placeholder='user'
                        value={formData.role.toLowerCase().trim()}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div
                className='third-input-group'
            >
                <div>
                    <label>Department:</label>
                    <input 
                        type='text'
                        name='department'
                        placeholder='*******'
                        value={formData.department.toLowerCase().trim()}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Status:</label>
                    <input 
                        type='text'
                        name='status'
                        placeholder='*******'
                        value={formData.status.toLowerCase().trim()}
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
                    onClick={handleSubmit}
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
