import React, { useEffect, useState } from 'react'
import './Filestaken.css'
import { AlertTriangle, ArrowLeftCircle, Eye } from 'lucide-react';
import axios from 'axios';

export default function Filestaken() {

    // state to hold the files from the backend
    const [ filesTaken, setFilesTaken ] = useState([]) // initial array is empty

    // state to control the search term
    const [ searchTerm, setSearchTerm ] = useState("") // empty strings for felxibility
    
    // state to control the filtered terms
    const [ filteredTaken, setFilteredTaken ] = useState(filesTaken)

    // useEffect to listen for changes in the search term and the filesTaken array
    useEffect(() => {
        const term = searchTerm.trim().toLowerCase()

        setFilteredTaken(() => {
            const filteredFilesTaken = filesTaken.filter((taken) => 
                taken.file_name.toLowerCase().includes(term) ||
                taken.taken_by.toLowerCase().includes(term) ||
                taken.date_taken.includes(term) ||
                taken.return_date.includes(term) ||
                taken.status.toLowerCase().includes(term)
            )

            return filteredFilesTaken
        })

    }, [searchTerm, filesTaken])


    // useEffect to fetch files from the backend on mount
    useEffect(() => {
        // function to fetch files on mount
        const fetchFilesTaken = async () => {
            
            try {
                // resolve the promise and get the files
                const res = await axios.get('http://localhost:5000/iraAPI/filestaken')
                // Update the state with the files
                setFilesTaken(res.data)

            } catch (err) {
                console.error('ERROR: ', err.message)
            }
        }

        // call the function
        fetchFilesTaken()
    }, []) 

    return (
        <section
            className='files-taken-page'
        >
            <div 
                className='files-taken-header'
            >
                <h2 className='files-taken-title'>Files Taken</h2>

                <input 
                    type='text'
                    placeholder='Search Taken File.....'
                    className='files-taken-input'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>File Name</th>
                        <th>Taken By</th>
                        <th>Date Taken</th>
                        <th>Return Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredTaken.length > 0 ? (
                        filteredTaken.map((file) => (
                            <tr>
                                <td>{file.id}</td>
                                <td>{file.file_name}</td>
                                <td>{file.taken_by}</td>
                                <td>{file.date_taken}</td>
                                <td>{file.return_date}</td>
                                <td data-status={file.status}>{file.status}</td>
                            
                                <td className='actions-taken'>
                                    <button className='icon-btn view'><Eye size={20} /></button>
                                    <button className='icon-btn returned'><ArrowLeftCircle size={20} /></button>
                                    <button className='icon-btn alert'><AlertTriangle size={20} /></button>
                                </td>

                            </tr>
                        ))

                    ) : (
                        <tr className='no-taken'>
                            <td colSpan={7}>No Results</td>
                        </tr>
                    )}
                </tbody>
            </table>

        </section>
    )
}