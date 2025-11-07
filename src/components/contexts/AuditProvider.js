import { createContext, useContext, useEffect, useState } from "react";

// create the Audit context
const AuditContext = createContext()


// create a custom hook
export const useAudit = () => useContext(AuditContext)


// create the Audit component
export default function AuditProvider({ children }) {

    // state to hold and update the search term
    const [ searchTerm, setSearchTerm ] = useState("") // empty strings for flexibility

    // state to store all the files
    const [ fileAudit, setFileAudit ] = useState([]) // Initial state is an empty array

    // state to filter the fileAudit
    const [ filteredAudits, setFilteredAudits ] = useState(fileAudit) // initial state is the array of file objects

    // useEffect to listen for a change in the search term and the users array
    useEffect(() => {
        const term = searchTerm.trim().toLowerCase()
        console.log(fileAudit)

        setFilteredAudits(() => {
            // filter accordingly
            const filterFiles = fileAudit.filter((file) => 
                file.requester_name?.toLowerCase().includes(term) ||
                file.requester_department?.toLowerCase().includes(term) ||
                file.file_name?.toLowerCase().includes(term) ||
                file.status?.toLowerCase().includes(term) ||
                file.date_uploaded?.includes(term) ||
                file.time_uploaded?.includes(term)
            )
            
            // return the array
            return filterFiles

        })

    }, [searchTerm, fileAudit])

    return (
        <AuditContext.Provider value={{
            filteredAudits, setSearchTerm, 
            setFileAudit, searchTerm
        }}>
            { children }
        </AuditContext.Provider>
    )
}