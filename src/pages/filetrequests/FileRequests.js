import React, { useEffect } from 'react'
import './FileRequests.css'
import { CheckCircle, Trash2, XCircle } from 'lucide-react'
// import { toast } from "react-toastify";
// import axios from 'axios'
import { useRequest } from '../../components/contexts/requestProvider';
import api from '../../configs/axios';
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'  // include the CSS to be safe

export default function FileRequests() {
    
    // import the necessary states and functions from the requestProvider
    const { searchTerm, setSearchTerm, 
            handleDeleteRequests, filteredRequests,
            handleRequestApproval, handleRequestRejection, 
            setFileRequests
        } = useRequest()

    // useEffect to get all tracked files
    useEffect(() => {
        // function to fetch all the tracked files
        const fetchRequestedFiles = async () => {
            try {
                // respond with the data from the backend. Use axios to get that data from port 5000
                const res = await api.get('http://localhost:5000/iraAPI/filerequests')
                // Update the state with the data
                setFileRequests(res.data)

            } catch (err) {
                console.log('Error fetching the requested files: ', err.message)
            }
        }

        // call the function
        fetchRequestedFiles()

    }, []) // Empty dependency array

    return (
        <>
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
                            <th>File Name</th>
                            <th>Requested On</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredRequests.length > 0 ? (
                            filteredRequests.map((file) => (
                                <tr
                                    key={file.request_id}
                                >
                                    <td>{file.request_id}</td>
                                    <td>{file.requester_name}</td>
                                    <td>{file.requester_department}</td>
                                    <td>{file.file_name}</td>
                                    <td>{file.request_date}</td>
                                    <td data-status={file.status}>{file.status}</td>
                                
                                    <td className='actions-requests'>
                                        <button 
                                            className='icon-btn approve'
                                            data-tooltip-id="approve-tip"
                                            data-tooltip-content="Approve request"
                                        >
                                            <CheckCircle 
                                                size={20} 
                                                onClick={() => handleRequestApproval(file.request_id)}
                                            />
                                        </button>

                                        <button 
                                            className='icon-btn reject'
                                            data-tooltip-id="reject-tip"
                                            data-tooltip-content="Reject request"
                                        >
                                            <XCircle
                                                size={20} 
                                                onClick={() => handleRequestRejection(file.request_id)}
                                            />
                                        </button>

                                        <button 
                                            className='icon-btn delete'
                                            data-tooltip-id="delete-tip"
                                            data-tooltip-content="Delete Request"
                                        >
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

            <Tooltip id="approve-tip" place="bottom" className="tooltip-react" delayShow={200} delayHide={100} />
            <Tooltip id="reject-tip" place="bottom" className="tooltip-react" delayShow={200} delayHide={100} />
            <Tooltip id="delete-tip" place="bottom" className="tooltip-react" delayShow={200} delayHide={100} />
        </>
    )
}