import axios from "axios";
import { toast } from "react-toastify";

const { createContext, useContext, useEffect, useState } = require("react");

// create the context
const FileContext = createContext()

// create a custom hook instaed of using the context directly
export const useFile = () => useContext(FileContext)

export default function FileProvider({ children }) {

    // state to store all the files
    const [ files, setFiles ] = useState([]) // Initial state is an empty array

    // state to hold and update the search term
    const [ searchTerm, setSearchTerm ] = useState("") // empty strings for flexibility

    // state to filter the files
    const [ filtered, setFiltered ] = useState(files) // initial state is the array of file objects

    
    // state containing the files data
    const [ editingFile, setEditingFile ] = useState(null) // initial state is nothing

    // state to display the edit modal
    const [ showEditModal, setShowEditModal ] = useState(false) // initially hide the modal

    // state to display the add file modal
    const [ showAddFileModal, setShowAddFileModal] = useState(false) // initially hode the modal


    // function to open the Edit the modal
    const openEditModal = (file) => {
    setEditingFile(file)
    setShowEditModal(true) // open the modal
    }

    // function to open the aff file modal
    const openAddFileModal = () => {
    setShowAddFileModal(true) // open the Modal
    }


    // useEffect to listen for a change in the search term and the users array
    useEffect(() => {
    const term = searchTerm.trim().toLowerCase()
    console.log(files)

    setFiltered(() => {
        // filter accordingly
        const filterFiles = files.filter((file) => 
        file.name.toLowerCase().includes(term) ||
        file.department.toLowerCase().includes(term) ||
        file.status.toLowerCase().includes(term) ||
        file.date_uploaded.includes(term) ||
        file.time_uploaded.includes(term)
        )
        
        // return the array
        return filterFiles

    })

    }, [searchTerm, files])
    


    // function to update the page
    const updatePage = (uploadedFile) => {
    // if the the uploaded file matches a file in the registry update the page with the correct data
    setFiles(prev => prev.map(f => f.id === uploadedFile.id ? uploadedFile : f))
    }

    // funtion to handle deleting a file
    const handleDelete = async (fileId) => {
        
        try {
            await axios.delete(`http://localhost:5000/iraAPI/fileregistry/${fileId}`)
            // Update the state filtering the array of deleted files
            setFiles(prev => prev.filter(file => file.id !== fileId))
            // Notify the user that he file has been deleted successfully
            toast.success('File deleted Successfully.')
        } catch (err) {
            console.error('DELETE ERROR: ', err.message)
        }
    }

    // useEffect to fetch all files on mount
    useEffect(() => {
        // function to fetch all files from the backend
        const fetchFiles = async () => {
            try {
                // response
                const res = await axios.get('http://localhost:5000/api/fileregistry')
                // Update state with the data
                setFiles(res.data)

            } catch(err) {
                console.error('ERROR: ', err.message)
            }
        }

        // Call the function
        fetchFiles()

    }, [])

    return (
        <FileContext.Provider value={{
            handleDelete, files,
            setFiles, setSearchTerm,
            filtered, editingFile,
            setEditingFile, showEditModal,
            showAddFileModal, openEditModal,
            openAddFileModal, updatePage
            
        }}>
            {children}
        </FileContext.Provider>
    )
}


