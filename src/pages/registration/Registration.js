import React from 'react'
import './Registration.css'
import { useNavigate } from 'react-router'

export default function Registration() {

    // useNavigate to navigate to another page
    const navigate = useNavigate()

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

        <form>
            <div
                className='d-flex flex-column'
            >
                <label htmlFor='username' className='mb-2 fs-5 text-white'>Username: </label>
                <input 
                    type='text' 
                    placeholder="John Doe" 
                    required
                />
            </div>

            <div
                className='d-flex flex-column'
            >
                <label htmlFor='username' className='mb-2 fs-5 text-white'>Email: </label>
                <input 
                    type='email' 
                    placeholder="johndoe@ira.go.ke" 
                    required
                />
            </div>

            <div
                className='d-flex flex-column'
            >
                <label htmlFor='username' className='mb-2 fs-5 text-white'>Department: </label>
                <input 
                    type='text' 
                    placeholder="ICT" 
                    required
                />
            </div>


            <div
                className='d-flex flex-column'
            >
                <label htmlFor='username' className='mb-2 fs-5 text-white'>Password: </label>
                <input 
                    type='password' 
                    placeholder="********"
                    required
                />
            </div>

            <div
                className='d-flex flex-column'
            >
                <label htmlFor='username' className='mb-2 fs-5 text-white'>Confirm Password: </label>
                <input 
                    type='password' 
                    placeholder="********"
                    required
                />
            </div>
            
            <button
                onClick={(e) => {
                    e.preventDefault();
                    navigate('/dashboard')
                }}
                className='btn-submit text-center'
            >
                Sign In
            </button>
        </form>
    </div>
  )
}
