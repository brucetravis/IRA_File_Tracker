import { toast } from "react-toastify";
import api from "../../configs/axios";

const { createContext, useContext, useState, useEffect } = require("react");

// create the context
const RequestContext = createContext()

// create a custom hook which can be used instead importing the contexts in the pages
export const useRequest = () => useContext(RequestContext)


// expirt the context Provider
export default function RequestProvider({ children }) {


    // state to control the search term
    const [ searchTerm, setSearchTerm ] = useState("") // empty strings for felxibility

    // state to store all the files
    const [ fileRequests, setFileRequests ] = useState([]) // initial state is an empty array
    console.log('THESE ARE THE FILE REQUEST: ', fileRequests)

    // state to control the filtered terms
    const [ filteredRequests, setFilteredRequests ] = useState(fileRequests)
    

    // function to send a post request when requesting for files
    const handleSubmit = async (fileId) => {

        try {

            // send the post request using the axios instance so that we automatically attach the users access token
            const res = await api.post(`http://localhost:5000/iraAPI/filerequests/${fileId}`)
            
            console.log('Request submitted successfully: ', res.data)
            toast.success('Request submitted successfully, Await request approval.')
            alert("File Request successful, Await request approval.")

            // Add the new request to the state so that the page can update automatically
            setFileRequests(prev => [...prev, res.data]) // res.data should be the new request object

        } catch (err) {
            console.error('ERROR: ', err)
            alert(err.response?.data?.message || "An expected error occured.")
            // toast.error(err.response?.data?.message || "An expected error occured.")
        }
    }


    // useEffect to listen for changes in the search term and the filesTracking array
    useEffect(() => {
        const term = searchTerm.toLowerCase().trim()

        setFilteredRequests(() => {
            const filteredFilesTracking = fileRequests.filter((file) => 
                file.requester_name?.toLowerCase().includes(term) ||
                file.requester_department?.toLowerCase().includes(term) ||
                file.file_name?.toLowerCase().includes(term) ||
                file.request_date?.includes(term) ||
                file.status?.toLowerCase().includes(term)

            )

            return filteredFilesTracking
        })

    }, [searchTerm, fileRequests])


    
    
    
    // function to delete files from the filerequests
    const handleDeleteRequests = async (fileId) => {

        try {
            // delete the file
            await api.delete(`http://localhost:5000/iraAPI/filerequests/${fileId}`)
            setFileRequests(prev => prev.filter(file => file.request_id !== fileId))
            toast.success('Request Deleted successfully')

        } catch (err) {
            console.log('Error Deleting Request: ', err.message)
        }
    }
    

    // function to handle request approval
    const handleRequestApproval = async (fileId) => {

        try {
            // approve the file approval
            await api.put(`http://localhost:5000/iraAPI/filerequests/${fileId}/approve`)
            // update the file requests table
            setFileRequests(prev => prev.filter(file => file.request_id !== fileId))
            toast.success('Request Approved.')
        } catch (err) {
            console.log('ERROR APPROVING FILE: ', err.message)
            toast.error('Approval Failed.')
        }
    }

    // handle  request rejection
    const handleRequestRejection = async (fileId) => {

        try {
            // reject the file approval
            await api.put(`http://localhost:5000/iraAPI/filerequests/${fileId}/reject`)
            // update the file requests table
            setFileRequests(prev => prev.filter(file => file.request_id !== fileId))
            toast.info('Request Rejected')

        } catch (err) {
            console.log('ERROR REJECTING FILE: ', err.message)
            toast.error('Rejection Failed.')
        }
    }

    return (
        <RequestContext.Provider
            value={{
                handleSubmit, searchTerm, setSearchTerm,
                handleDeleteRequests, filteredRequests,
                handleRequestApproval, setFileRequests,
                handleRequestRejection
            }}
        >
            {children}
        </RequestContext.Provider>
    )
}