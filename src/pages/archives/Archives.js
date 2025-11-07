import React, { useEffect, useState } from 'react'
import './Archives.css'
import { useFile } from '../../components/contexts/FileProvider';
import api from '../../configs/axios';
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'  // include the CSS to be safe
import { Archive, ArchiveRestore } from 'lucide-react';
import { toast } from 'react-toastify';

export default function Archives() {

  // Get the files from the context
  const { fileToken } = useFile()

  // state to hold the archived files
  const [ archivedFiles, setArchivedFiles ] = useState([])

  const [ searchArchivesTerm, setSearchArchivesTerm ] = useState("") // empty strings for flexibility
  
  // state to filter the archived files
  const [ filterArchived, setFilterArchived ] = useState(archivedFiles)

  // useEffect to listen for changes in the search term and the archived files array
  useEffect(() => {
    const term = searchArchivesTerm.trim().toLowerCase()
    console.log('ARCHIVED FILES: ', archivedFiles)

    setFilterArchived(() => {
        const filteredArchivedFiles = archivedFiles?.filter((archived) => 
          archived.file_name.toLowerCase().includes(term) ||
          archived.department.toLowerCase().includes(term) ||
          archived.dete_archived.includes(term) ||
          archived.time_archived.includes(term) ||
          archived.status.toLowerCase().includes(term)
        )

        return filteredArchivedFiles
    })

  }, [searchArchivesTerm, archivedFiles])

  // useEffect to fetch all files on mount
  useEffect(() => {
      // function to fetch all archived files from the backend
      const fetchArchivedFiles = async () => {
        try {
            if (!fileToken) return;

            // response
            const res = await api.get('http://localhost:5000/iraAPI/archives')
            // Update state with the data
            setArchivedFiles(res.data)

        } catch(err) {
            console.error('ERROR: ', err.message)
        }
      }

      // Call the function
      fetchArchivedFiles()

  }, [fileToken])

  // function to handle the file restoration
  const handleFileRestoration = async (fileId) => {
    try {
      // response
      await api.post(`http://localhost:5000/iraAPI/archives/${fileId}`)
      // Update state with the data
      // setArchivedFiles(res.data)
      setArchivedFiles(prev => prev.filter(file => file.id !== fileId))
      toast.success('File Restored successfully.')

    } catch(err) {
        console.error('ERROR: ', err.message)
    }
  }

//   // function to update the page
//   const updatePage = (uploadedFile) => {
//       // if the the uploaded file matches a file in the registry update the page with the correct data
//       setFiles(prev => prev.map(f => f.id === uploadedFile.id ? uploadedFile : f))
//   }

//   // funtion to handle deleting a file
//   const handleArchive = async (fileId) => {
      
//       try {
//           await api.post(`http://localhost:5000/iraAPI/fileregistry/${fileId}`)
//           // // update the state to display the remaining files
//           setFiles(prev => prev.filter(file => file.id !== fileId))
//           // Notify the user that the file has been deleted successfully
//           toast.success('File Archived Successfully.')
//       } catch (err) {
//           console.error('ARCHIVE ERROR: ', err.message)
//       }
//   }

  return (
    <>
      <section 
        className='file-archives-page'
      >

        <div
          className='archives-header'
        >
          <h2 className='archives-title'>Archives</h2>

          <div
            className='d-flex align-items-center gap-2'
          >
            <input 
              type='text'
              placeholder='Search files'
              className='archives-input'
              value={searchArchivesTerm}
              onChange={(e) => setSearchArchivesTerm(e.target.value)}
            />
          </div>
        </div>

        <table
          className='file-archives-table'
        >
          <thead>
            <tr>
              <th>File ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Date Archived</th>
              <th>Time Archived</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filterArchived.length > 0 ? (
              filterArchived.map((file) => (
                <tr
                  key={file.id}
                >
                  <td>{file.id}</td>
                  <td>{file.file_name}</td>
                  <td>{file.department}</td>
                  <td>{file.date_archived}</td>
                  <td>{file.time_archived}</td>
                  <td data-status={file.status}>{file.status}</td>

                  <td className='actions'>
                    <button 
                      className='icon-btn archive-restore'
                      data-tooltip-id="archive-restore-tip"
                      data-tooltip-content="Archive File"
                      onClick={() => handleFileRestoration(file.id)}
                    >
                      <ArchiveRestore size={18} />
                    </button>

                  </td>
                </tr>
              ))
            ) : (
              <tr
                className='no-files'
              >
                <td colSpan={7}>File Not Found</td>
              </tr>
            )}
          </tbody>
        </table>

      </section>

      <Tooltip id="archive-restore-tip" place="bottom" className="tooltip-react" delayShow={200} delayHide={100} />
    </>
  )
}