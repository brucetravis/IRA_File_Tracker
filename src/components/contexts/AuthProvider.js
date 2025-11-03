import { createContext, useContext, useState } from "react";
import api from '../../configs/axios'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'

// create the authContext
const AuthContext = createContext()

// create a custom hook instead of using the context directy
export const useAuth = () => useContext(AuthContext)



export default function AuthProvider({children}) {

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

            // store the user data in the localStorage
            localStorage.setItem('userData', JSON.stringify(res?.data))

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
        <AuthContext.Provider value={{
            handleRegister, handleLogin, 
            isLogin, setIsLogin, handleChange,
            formData
        }}>
            {children}
        </AuthContext.Provider>
    )
}