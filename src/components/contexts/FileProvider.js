import { createContext, useContext, useEffect, useState } from "react";
import api from "../../configs/axios";


// create the context
const FileContext = createContext()

// create a custom hook instead of using the context directly
export const useFile = () => useContext(FileContext)

export default function FileProvider({ children }) {

    // // state to store all the files
    const [ files, setFiles ] = useState([]) // Initial state is an empty array

    // state to hold and update the search term
    const [ searchTerm, setSearchTerm ] = useState("") // empty strings for flexibility
    const [ searchArchivesTerm, setSearchArchivesTerm ] = useState("") // empty strings for flexibility

    // // state to filter the files
    const [ filtered, setFiltered ] = useState(files) // initial state is the array of file objects

    
    // state containing the files data
    const [ editingFile, setEditingFile ] = useState(null) // initial state is nothing

    // state to display the edit modal
    const [ showEditModal, setShowEditModal ] = useState(false) // initially hide the modal

    // state to display the add file modal
    const [ showAddFileModal, setShowAddFileModal] = useState(false) // initially hide the modal

    // state to display the request file modal
    const [ showRequestFileModal, setShowRequestFileModal ] = useState(false) // initial state is false

    const [ showReportIssue, setShowReportIssue ] = useState(false) // initial state is false

    const [fileToken, setFileToken] = useState(localStorage.getItem("accessToken")); // initial state is the access token from localStorage

    const [ selectFileId, setSelectFileId ] = useState(null) // initial state is null/ nothing

    // state to hold the files from the backend
    const [ filesTaken, setFilesTaken ] = useState([]) // initial array is empty

    // state to control the filtered terms
    const [ filteredTaken, setFilteredTaken ] = useState(filesTaken)


    // state to hold the archived files
    const [ archivedFiles, setArchivedFiles ] = useState([])
    
    // state to filter the archived files
    const [ filterArchived, setFilterArchived ] = useState(archivedFiles)

    // function to open the Edit the modal
    const openEditModal = (file) => {
        setEditingFile(file)
        setShowEditModal(true) // open the modal
    }

    // function to open the aff file modal
    const openAddFileModal = () => {
        setShowAddFileModal(true) // open the Modal
    }

    // function to open the request file modal
    const openRequestFileModal = (fileId) => {
        setSelectFileId(fileId)
        setShowRequestFileModal(true) // open the request file modal
    }

    // function to open the reporting issue modal
    const openReportIssueModal = () => {
        setShowReportIssue(true)
    }

    // function to close the edit modal
    const closeEditModal = () => setShowEditModal(false) // close the modal
    // function to close the edit modal
    const closeAddFileModal = () => setShowAddFileModal(false) // close the modal
    // function to close the request modal
    const closeRequestModal = () => {
        setShowRequestFileModal(false) // close the modal
    }

    // function to close the report issue modal
    const closeReportIssueModal = () => {
        setShowReportIssue(false) // close the modal
    }

    

    // useEffect to fetch all files on mount
    useEffect(() => {
        // function to fetch all files from the backend
        const fetchFiles = async () => {
            try {

                if (!fileToken) return;

                // response
                const res = await api.get('http://localhost:5000/iraAPI/fileregistry')
                // Update state with the data
                setFiles(res.data)
                // setFiles(Array.isArray(res.data) ? res.data : res.data.data || [])

            } catch(err) {
                console.error('ERROR: ', err.message)
            }
        }

        // Call the function
        fetchFiles()

    }, [fileToken])


    // useEffect to listen for changes in the search term and the filesTaken array
    useEffect(() => {
        const term = searchTerm.trim().toLowerCase()

        setFilteredTaken(() => {
            const filteredFilesTaken = filesTaken.filter((taken) => 
                taken.file_name.toLowerCase().includes(term) ||
                taken.taken_by.toLowerCase().includes(term) ||
                taken.department.toLowerCase().includes(term) ||
                taken.date_taken.includes(term) ||
                // taken.return_date.includes(term) ||
                taken.status.toLowerCase().includes(term)
            )

            return filteredFilesTaken
        })

    }, [searchTerm, filesTaken])


    // useEffect to listen for changes in the search term and the archived files array
    useEffect(() => {
        const term = searchArchivesTerm.trim().toLowerCase()

        setFilterArchived(() => {
            const filteredArchivedFiles = archivedFiles.filter((archived) => 
                archived.file_name.toLowerCase().includes(term) ||
                archived.department.toLowerCase().includes(term) ||
                archived.dete_archived.includes(term) ||
                archived.time_archived.includes(term) ||
                archived.status.toLowerCase().includes(term)
            )

            return filteredArchivedFiles
        })

    }, [searchArchivesTerm, archivedFiles])


    return (
        <FileContext.Provider value={{
            setSearchTerm, editingFile, searchTerm,
            setEditingFile, showEditModal, files, setFiles,
            showAddFileModal, openEditModal,
            openAddFileModal, openRequestFileModal, showRequestFileModal,
            closeEditModal, closeAddFileModal, closeRequestModal,
            fileToken, setFileToken, selectFileId, filtered, setFiltered,
            filesTaken, setFilesTaken, filteredTaken, setArchivedFiles,
            setSearchArchivesTerm, filterArchived, searchArchivesTerm,
            archivedFiles, setFilterArchived, showReportIssue, openReportIssueModal,
            closeReportIssueModal
        }}>
            {children}
        </FileContext.Provider>
    )
}


