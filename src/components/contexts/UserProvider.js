import { createContext, useContext, useEffect, useState } from "react";
import api from "../../configs/axios";
import { toast } from "react-toastify";

// create the user context
const UserContext = createContext()

// create a custom hook to simplify access to teh user context
export const useUser = () => useContext(UserContext)


export default function UserProvider({ children }) {

    // state to store all the users
    const [users, setUsers] = useState([]) //  initial state is an empty array

    // state to handle the search Term
    const [ searchTerm, setSearchTerm ] = useState("") // initial state is an empty array for flexibility

    // state to handle the filtering logic
    const [ filter, setFilter ] = useState(users)

    // state containing the user data
    const [ editingUser, setEditingUser] = useState(null) // initial state is nothing

    // state to display the add file modal
    const [ showEditUserModal, setShowEditUserModal] = useState(false) // initially hide the modal
    
    const [token, setToken] = useState(localStorage.getItem("accessToken")); //

    // function to open the modal
    const openEditUserModal = (user) => {
        setEditingUser(user)
        setShowEditUserModal(true)
    }

    // function to close the edit user modal
    const closeEditUserModal = () => setShowEditUserModal(false)


    // useEffect to get all the users from the backend
    useEffect(() => {
        // function to fetch users from the backend
        const fetchUsers = async () => {
            try {
                if (!token) return; 

                // send a GET request attached to the access token to the database
                const res = await api.get('http://localhost:5000/iraAPI/users', {
                    // send the accessToken with every request
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                console.log(res.data)
                setUsers(res.data)

            } catch (err) {
                console.error('ERROR: ', err.message)
            }
        }
        
        fetchUsers()
    }, [token])
    

    useEffect(() => {
        const term = searchTerm.toLowerCase().trim()

        setFilter(() => {
            // filter accordingly
            const filteredData = users.filter((user) => 
                user.name?.toLowerCase().includes(term) ||
                user.email?.toLowerCase().includes(term) ||
                user.role?.toLowerCase().includes(term) ||
                user.status?.toLowerCase().includes(term) ||
                user.lastLogin?.includes(term)
            )
            
            return filteredData
        })

    }, [searchTerm, users])

    // function to delete users
    const handleDelete = async (userId) => {

        try {
            await api.delete(`http://localhost:5000/iraAPI/users/${userId}`)
            // update the state to display the remaining users
            setUsers(prev => prev.filter(user => user.id !== userId))
            // Notify the user that the deletion was successful
            toast.success("User deleted successfully.")

        } catch(err) {
            console.error("Error deleting user: ", err.message)
        }
    }

    // function to update the page
    const updatePage = (uploadedFile) => {
        // if the the uploaded file matches a file in the registry update the page with the correct data
        setUsers(prev => prev.map(u => u.id === uploadedFile.id ? uploadedFile : u))
    }

    // get the user data from the localStorage
    const userData = JSON.parse(localStorage.getItem("userData"));

    return (
        <UserContext.Provider
            value={{
                filter, setSearchTerm, 
                searchTerm, users, handleDelete,
                showEditUserModal, openEditUserModal,
                editingUser, closeEditUserModal, updatePage,
                token, setToken, userData
            }}
        >
            {children}
        </UserContext.Provider>
    )
}


