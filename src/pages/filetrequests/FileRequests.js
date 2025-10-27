import React, { useEffect, useState } from 'react'
import './FileRequests.css'
import { Trash2 } from 'lucide-react'
import { toast } from "react-toastify";
import axios from 'axios'

export default function FileRequests() {

    // state to control the search term
    const [ searchTerm, setSearchTerm ] = useState("") // empty strings for felxibility

    // state to store all the files
    const [ fileRequests, setFileRequests ] = useState([]) // initial state is an empty array
    console.log('THESE ARE THE FILE REQUEST: ', fileRequests)

    // state to control the filtered terms
    const [ filteredTaken, setFilteredTaken ] = useState(fileRequests)

    // useEffect to listen for changes in the search term and the filesTracking array
    useEffect(() => {
        const term = searchTerm.toLowerCase().trim()

        setFilteredTaken(() => {
            const filteredFilesTracking = fileRequests.filter((file) => 
                file.request_id.toString()?.includes(term) ||
                file.requester_name.toLowerCase()?.includes(term) ||
                file.requester_department.toLowerCase()?.includes(term) ||
                file.file_id.toString()?.includes(term) ||
                file.requested_on?.includes(term) ||
                file.status.toLowerCase()?.includes(term)

            )

            return filteredFilesTracking
        })

    }, [searchTerm, fileRequests])


    // useEffect to get all tracked files
    useEffect(() => {
        // function to fetch all the tracked files
        const fetchRequestedFiles = async () => {
            try {
                // respond with the data from the backend. Use axios to get that data from port 5000
                const res = await axios.get('http://localhost:5000/iraAPI/filerequests', {
                    headers: {role: "admin"}
                })
                // Update the state with the data
                setFileRequests(res.data)

            } catch (err) {
                console.log('Error fetching the requested files: ', err.message)
            }
        }

        // call the function
        fetchRequestedFiles()

    }, []) // Empty dependency array
    
    
    // function to delete files from the filerequests
    const handleDeleteRequests = async (fileId) => {

        try {
            // delete the file
            await axios.delete(`http://localhost:5000/iraAPI/filerequests/${fileId}`)
            setFileRequests(prev => prev.filter(file => file.request_id !== fileId))
            toast.success('Request Deleted successfully')

        } catch (err) {
            console.log('Error Deleting Request: ', err.message)
        }
    }

    return (
        <section
            className='file-requests-page'
        >
            <div 
                className='file-requests-header'
            >
                <h2 className='file-requests-title'>File Requests</h2>

                <input 
                    type='text'
                    placeholder='Search requests.....'
                    className='file-requests-input'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Request ID</th>
                        <th>Requester Name</th>
                        <th>Requester Department</th>
                        <th>File ID/Name</th>
                        <th>Requested On</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredTaken.length > 0 ? (
                        filteredTaken.map((file) => (
                            <tr
                                key={file.request_id}
                            >
                                <td>{file.request_id}</td>
                                <td>{file.requester_name}</td>
                                <td>{file.requester_department}</td>
                                <td>{file.file_id}</td>
                                <td>{file.requested_on}</td>
                                <td data-status={file.status}>{file.status}</td>
                            
                                <td className='actions-requests'>
                                    <button className='icon-btn delete'>
                                        <Trash2 
                                            size={20} 
                                            onClick={() => handleDeleteRequests(file.request_id)}
                                        />
                                    </button>
                                </td>
                            </tr>
                        ))

                    ) : (
                        <tr className='no-requests'>
                            <td colSpan={8}>No Results</td>
                        </tr>
                    )}
                </tbody>
            </table>

        </section>
    )
}