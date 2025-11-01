import React, { useState } from 'react'
// import './Registration.css'
import './Registration.css'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { toast } from 'react-toastify'
import api from '../../configs/axios'

export default function Registration() {

    // useNavigate to navigate to another page
    const navigate = useNavigate()
    

    // states to toggle the login inputs
    const [ isLogin, setIsLogin ] = useState(false)

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
    const handleRegister = async (e) => {
        // prevent the default form behaviour
        e.preventDefault()
        
        try {
            
            // user data
            const userData = {
                name: formData.name.trim().toLowerCase(),
                email: formData.email.trim().toLowerCase(),
                department: formData.department.trim().toLowerCase(),
                password: formData.password.trim(),
                confirmPassword: formData.confirmPassword.trim()
            }

            const res = await axios.post('http://localhost:5000/iraAPI/register', userData)
            
            setFormData({
                name: "",
                email: "",
                department: "",
                password: "",
                confirmPassword: ""
            })

            console.log("Registration successful: ", res.data)
            toast.success("Registration successful. Log In")
            alert("Registration successful. Log in")
            // navigate('/dashboard')

        } catch (err) {
            console.error('FRONTEND REG ERROR: ', err)
            toast.error(err.response?.data?.message || "User already exists.")
        }
    }


    // function to handle the user Login
    const handleLogin = async (e) => {
        
        e.preventDefault() // prevent the default form behaviour


        try {
            // define teh user data to be posted
            const userData = {
                email: formData.email.trim().toLowerCase(),
                password: formData.password.trim()
            }

            // post the request (email and password) to the backend
            const res = await api.post('http://localhost:5000/iraAPI/login', userData)
            console.log('USER DATA: ', res?.data)

            // Extract the tokens from the backend so that we can store them in the front end
            // and send them with every request
            const accessToken = res.data.accessToken
            const refreshToken = res.data.refreshToken


            // store them temporarily in localStorage
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshToken', refreshToken)
            

            // clear the inputs after logging in
            setFormData({
                email: "",
                password: ""
            })

            // Notify the user that they have successfully logged in
            console.log("Login successful: ", userData)
            toast.success(res?.data?.message || "Action completed successfully")
            alert('login successful')
            navigate('/dashboard')

        } catch (err) {
            console.error("LogIn ERROR: ", err)
            toast.error(err.response?.data?.message)
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

        <div
            className='registration-page-left'
        >
            <h1>IRA</h1>
            <p>File Tracker</p>
        </div>

        <div
            className='registration-form'
        >
            {isLogin ? (
                <h3 className='text-white'>Login</h3>
            ) : (
                <h3 className='text-white'>Registration</h3>
            )}

            <form
                onSubmit={isLogin ? handleLogin : handleRegister}
            >
                {!isLogin && (
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
                    </div>)}

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

                {!isLogin && (
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
                )}

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
                
                {!isLogin && (
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
                )}

                
                <button
                    // onClick={(e) => {
                    //     e.preventDefault();
                    //     navigate('/login')
                    // }}
                    className='btn-submit text-center'
                >
                    {isLogin ? <p>Log In</p> : <p>Sign In</p>}
                </button>
            </form>

            {isLogin ? (
                <p 
                    className='already'
                    onClick={() => setIsLogin(prev => !prev)}
                >
                    Not Registered? Register Now
                </p>
            ) : (
                <p 
                    className='already'
                    onClick={() => setIsLogin(prev => !prev)}
                >
                    Already Registered? Log In
                </p>
            )}
        </div>
    </div>
  )
}
