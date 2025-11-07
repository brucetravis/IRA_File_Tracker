import React, { useEffect, useState } from 'react'
import './Audit.css'
import api from '../../configs/axios';
import { useAudit } from '../../components/contexts/AuditProvider';

export default function Audit() {
    
    // import the necessary states and functions from the requestProvider
    const { searchTerm, setSearchTerm, setFileAudit, filteredAudits } = useAudit()

    // useEffect to get all tracked files
    useEffect(() => {
        // function to fetch all the tracked files
        const fetchAuditData = async () => {
            try {
                // respond with the data from the backend. Use axios to get that data from port 5000
                const res = await api.get('http://localhost:5000/iraAPI/audit')
                // Update the state with the data
                setFileAudit(res.data)

            } catch (err) {
                console.log('Error fetching the Audit files: ', err.message)
            }
        }

        // call the function
        fetchAuditData()

    }, []) // Empty dependency array

    return (
        <section
            className='file-audit-page'
        >
            <div 
                className='file-audit-header'
            >
                <h2 className='file-audit-title'>System Audit</h2>

                <input 
                    type='text'
                    placeholder='Search audits.....'
                    className='file-audit-input'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Audit ID</th>
                        <th>Requester Name</th>
                        <th>Requester Department</th>
                        <th>File Name</th>
                        <th>Requested On</th>
                        <th>Status</th>
                        {/* <th>Actions</th> */}
                    </tr>
                </thead>

                <tbody>
                    {filteredAudits.length > 0 ? (
                        filteredAudits.map((file) => (
                            <tr
                                key={file.id}
                            >
                                <td>{file.id}</td>
                                <td>{file.requester_name}</td>
                                <td>{file.requester_department}</td>
                                <td>{file.file_name}</td>
                                <td>{file.request_date}</td>
                                <td data-status={file.status}>{file.status}</td>
                            
                                {/* <td className='actions-requests'>
                                    <button className='icon-btn approve'>
                                        <CheckCircle 
                                            size={20} 
                                            onClick={() => handleRequestApproval(file.request_id)}
                                        />
                                    </button>

                                    <button className='icon-btn reject'>
                                        <XCircle
                                            size={20} 
                                            onClick={() => handleDeleteRequests(file.request_id)}
                                        />
                                    </button>

                                    <button className='icon-btn delete'>
                                        <Trash2 
                                            size={20} 
                                            onClick={() => handleDeleteRequests(file.request_id)}
                                        />
                                    </button>
                                </td> */}
                            </tr>
                        ))

                    ) : (
                        <tr className='no-audits'>
                            <td colSpan={8}>No Results</td>
                        </tr>
                    )}
                </tbody>
            </table>

        </section>
    )
}