import React, { useState } from 'react'
// import './Registration.css'
import './Registration.css'
import { useAuth } from '../../components/contexts/AuthProvider'
import { EyeIcon, EyeOff } from 'lucide-react'

export default function Registration() {

    const { handleRegister, handleLogin, 
        isLogin, setIsLogin, handleChange,
        formData
    } = useAuth()

    // state to toggle between the password visibility
    const [ isPasswordVisible, setIsPasswordVisible ] = useState(false) // initial state is false
    const [ isConfirmPasswordVisible, setIsConfirmPasswordVisible ] = useState(false) // initial state is false


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
                    <div
                        className='passwordAndEye'
                    >
                        { isPasswordVisible ? 
                            <EyeOff
                                size={20} 
                                color='#ffffff'
                                className='eyeIcon'
                                onClick={() => setIsPasswordVisible(prev => !prev)}
                            />
                            :   
                            <EyeIcon
                                size={20} 
                                color='#ffffff'
                                className='eyeIcon'
                                onClick={() => setIsPasswordVisible(prev => !prev)}
                            /> 
                        }

                        <input 
                            type={isPasswordVisible ? 'text' : 'password' }
                            name='password'
                            placeholder="********"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                
                {!isLogin && (
                    <div
                        className='d-flex flex-column'
                    >
                        <label htmlFor='confirmPassword' className='mb-2 fs-5 text-white'>Confirm Password: </label>
                        
                        <div
                            className='passwordAndEye'
                        >
                            { isConfirmPasswordVisible ? 
                                <EyeOff
                                    size={20} 
                                    color='#ffffff'
                                    className='eyeIcon'
                                    onClick={() => setIsConfirmPasswordVisible(prev => !prev)}
                                /> : 
                                
                                <EyeIcon
                                    size={20} 
                                    color='#ffffff'
                                    className='eyeIcon'
                                    onClick={() => setIsConfirmPasswordVisible(prev => !prev)}
                                /> 
                            }

                            <input 
                                type={ isConfirmPasswordVisible ? 'text' : 'password' }
                                name='confirmPassword' 
                                placeholder="********"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
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
