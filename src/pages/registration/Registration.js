import React, { useState } from 'react'
import './Registration.css'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function Registration() {

    // useNavigate to navigate to another page
    const navigate = useNavigate()

    // state to hold the formData
    const [ formData, setFormData ] = useState({
        name: "",
        email: "",
        department: "",
        password: "",
        confirmPassword: ""
    })

    // function to update the text
    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }


    // function to submit the form whena user registers
    const handleSubmit = async (e) => {
        // prevent the default form behaviour
        e.preventDefault()
        
        try {
            
            // user data
            const userData = {
                name: formData.name.trim().toLowerCase(),
                email: formData.email.trim().toLowerCase(),
                department: formData.department.trim().toLowerCase(),
                password: formData.password.trim().toLowerCase(),
                confirmPassword: formData.confirmPassword.trim().toLowerCase()
            }

            const res = await axios.post('http://localhost:5000/iraAPI/', userData)
            
            setFormData({
                name: "",
                email: "",
                department: "",
                password: "",
                confirmPassword: ""
            })

            console.log("Registration successful: ", res.data)
            toast.success("Registration successful.")
            alert("Registration successful.")

        } catch (err) {
            console.error('FRONTEND REG ERROR: ', err)
        }
    }

  return (
    <div 
        className='registration-page'
    >
        {/* <img
            src={require('../../images/profile.jpg')}
            alt='profile pic'
            className='registration-pic'
        /> */}

        {/* <p
            className='hello-user'
        >
            Welcome User
        </p> */}

        <h1>IRA</h1>
        <p>File Tracker</p>

        <form
            onSubmit={handleSubmit}
        >
            <div
                className='d-flex flex-column'
            >
                <label htmlFor='name' className='mb-2 fs-5 text-white'>Name: </label>
                <input 
                    type='text'
                    name='name'
                    placeholder="John"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div
                className='d-flex flex-column'
            >
                <label htmlFor='email' className='mb-2 fs-5 text-white'>Email: </label>
                <input 
                    type='email'
                    name='email'
                    placeholder="johndoe@ira.go.ke" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div
                className='d-flex flex-column'
            >
                <label htmlFor='department' className='mb-2 fs-5 text-white'>Department: </label>
                <input 
                    type='text'
                    name='department'
                    placeholder="ICT"
                    value={formData.department}
                    onChange={handleChange}
                    required
                />
            </div>


            <div
                className='d-flex flex-column'
            >
                <label htmlFor='password' className='mb-2 fs-5 text-white'>Password: </label>
                <input 
                    type='password'
                    name='password'
                    placeholder="********"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>

            <div
                className='d-flex flex-column'
            >
                <label htmlFor='confirmPassword' className='mb-2 fs-5 text-white'>Confirm Password: </label>
                <input 
                    type='password'
                    name='confirmPassword' 
                    placeholder="********"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
            </div>
            
            <button
                // onClick={(e) => {
                //     e.preventDefault();
                //     navigate('/login')
                // }}
                className='btn-submit text-center'
            >
                Sign In
            </button>
        </form>
    </div>
  )
}
