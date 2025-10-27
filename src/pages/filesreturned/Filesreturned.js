import React, { useEffect, useMemo, useState } from 'react'
import './Filesreturned.css'
import { AlertTriangle, ArrowLeftCircle, Eye } from 'lucide-react';

export default function Filesreturned() {

    const filesReturned = useMemo(() => [
        { id: "R001", name: "Contract Agreement - ABC Ltd", returnedBy: "John Doe", dateTaken: "2025-09-01", dateReturned: "2025-09-09", status: "Returned" },
        { id: "R002", name: "Employee Records - HR", returnedBy: "Jane Smith", dateTaken: "2025-08-28", dateReturned: "2025-09-07", status: "Late Return" },
        { id: "R003", name: "Audit Report 2024", returnedBy: "Michael Brown", dateTaken: "2025-09-03", dateReturned: "2025-09-10", status: "Returned" },
        { id: "R004", name: "Insurance Policy - Client X", returnedBy: "Emily Johnson", dateTaken: "2025-08-30", dateReturned: "2025-09-08", status: "Late Return" },
        { id: "R005", name: "Annual Budget 2025", returnedBy: "Daniel Wilson", dateTaken: "2025-09-04", dateReturned: "2025-09-11", status: "Returned" },
        { id: "R006", name: "Legal Documents - Case Y", returnedBy: "Sophia Miller", dateTaken: "2025-08-25", dateReturned: "2025-09-05", status: "Late Return" },
        { id: "R007", name: "Project Proposal - Zeta", returnedBy: "Chris Evans", dateTaken: "2025-09-05", dateReturned: "2025-09-13", status: "Returned" },
        { id: "R008", name: "Tax Records - 2023", returnedBy: "Olivia Davis", dateTaken: "2025-08-29", dateReturned: "2025-09-06", status: "Returned" },
        { id: "R009", name: "Confidential Memo - CEO", returnedBy: "James Carter", dateTaken: "2025-09-06", dateReturned: "2025-09-14", status: "Returned" },
        { id: "R010", name: "Procurement Report Q2", returnedBy: "Ava Thompson", dateTaken: "2025-09-02", dateReturned: "2025-09-09", status: "Returned" }
    ], []);

    // state to control the search term
    const [ searchTerm, setSearchTerm ] = useState("") // empty strings for felxibility
    
    // state to control the filtered terms
    const [ filteredTaken, setFilteredTaken ] = useState(filesReturned)

    // useEffect to listen for changes in the search term and the filesReturned array
    useEffect(() => {
        const term = searchTerm.trim().toLowerCase()

        setFilteredTaken(() => {
            const filteredfilesReturned = filesReturned.filter((returned) => 
                returned.name.toLowerCase().includes(term) ||
                returned.returnedBy.toLowerCase().includes(term) ||
                returned.status.toLowerCase().includes(term)
            )

            return filteredfilesReturned
        })

    }, [searchTerm, filesReturned])

    return (
        <section
            className='files-returned-page'
        >
            <div 
                className='files-returned-header'
            >
                <h2 className='files-returned-title'>Files Returned</h2>

                <input 
                    type='text'
                    placeholder='Search Taken File.....'
                    className='files-returned-input'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>File Name</th>
                        <th>Returned By</th>
                        <th>Date Taken</th>
                        <th>Date Returned</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredTaken.length > 0 ? (
                        filteredTaken.map((file) => (
                            <tr>
                                <td>{file.id}</td>
                                <td>{file.name}</td>
                                <td>{file.returnedBy}</td>
                                <td>{file.dateTaken}</td>
                                <td>{file.dateReturned}</td>
                                <td data-status={file.status}>{file.status}</td>
                            
                                <td className='actions-returned'>
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