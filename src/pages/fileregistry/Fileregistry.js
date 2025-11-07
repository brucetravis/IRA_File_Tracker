import React, { useEffect, useState } from 'react'
import './Fileregistry.css'
import { AlertTriangle, Archive, Edit, PlusCircle, Send } from 'lucide-react';
import RequestModal from '../../components/modals/requestmodal/RequestModal';
import EditModal from '../../components/modals/editfilemodal/EditModal';
import AddFile from '../../components/modals/addfilemodal/AddFile';
import { useFile } from '../../components/contexts/FileProvider';
import api from '../../configs/axios';
import { toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'  // include the CSS to be safe

export default function Fileregistry() {

  // Get the files from the context
  const { 
    openEditModal, openAddFileModal, openRequestFileModal, showRequestFileModal, 
    closeEditModal, closeAddFileModal, closeRequestModal, 
    editingFile, showEditModal, showAddFileModal, 
    searchTerm, setSearchTerm, selectFileId, fileToken
    
  } = useFile()


  // state to store all the files
  const [ files, setFiles ] = useState([]) // Initial state is an empty array

  // state to filter the files
  const [ filtered, setFiltered ] = useState(files) // initial state is the array of file objects

  // useEffect to listen for a change in the search term and the users array
  useEffect(() => {
    const term = searchTerm.trim().toLowerCase()
    console.log(files)

    setFiltered(() => {
        // filter accordingly
        const filterFiles = files?.filter((file) => 
            file.name?.toLowerCase().includes(term) ||
            file.department?.toLowerCase().includes(term) ||
            file.status?.toLowerCase().includes(term) ||
            file.date_uploaded?.includes(term) ||
            file.time_uploaded?.includes(term)
        )
        
        // return the array
        return filterFiles

    })

  }, [searchTerm, files])

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
              
          } catch(err) {
              console.error('ERROR: ', err.message)
          }
      }

      // Call the function
      fetchFiles()

  }, [fileToken])

  // function to update the page
  const updatePage = (uploadedFile) => {
      // if the the uploaded file matches a file in the registry update the page with the correct data
      setFiles(prev => prev.map(f => f.id === uploadedFile.id ? uploadedFile : f))
  }

  // funtion to handle deleting a file
  const handleArchive = async (fileId) => {
      
      try {
          await api.post(`http://localhost:5000/iraAPI/fileregistry/${fileId}`)
          // // update the state to display the remaining files
          setFiles(prev => prev.filter(file => file.id !== fileId))
          // Notify the user that the file has been deleted successfully
          toast.success('File Archived Successfully.')
      } catch (err) {
          console.error('ARCHIVE ERROR: ', err.message)
      }
  }

  return (
    <>
      <section 
        className='file-registry-page'
      >

        <div
          className='registry-header'
        >
          <h2 className='registry-title'>File Registry</h2>

          <div
            className='d-flex align-items-center gap-2'
          >
            <input 
              type='text'
              placeholder='Search files'
              className='registry-input'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <button
              className='icon-btn add-file'
            >
              <PlusCircle 
                size={20}
                onClick={openAddFileModal}
              />
            </button>
          </div>
        </div>

        <table
          className='file-registry-table'
        >
          <thead>
            <tr>
              <th>File ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Date Uploaded</th>
              <th>Time Uploaded</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length > 0 ? (
              filtered.map((file) => (
                <tr
                  key={file.id}
                >
                  <td>{file.id}</td>
                  <td>{file.name}</td>
                  <td>{file.department}</td>
                  <td>{file.date_uploaded}</td>
                  <td>{file.time_uploaded}</td>
                  <td data-status={file.status}>{file.status}</td>

                  <td className='actions'>
                      {/* <button className='icon-btn view'><Eye size={18} /></button> */}
                      <button 
                        className='icon-btn'
                        data-tooltip-id="edit-tip"
                        data-tooltip-content="Edit File"
                        onClick={() => openEditModal(file)}
                      >
                        <Edit size={18} />
                      </button>
                      
                      <button 
                        className='icon-btn archive'
                        data-tooltip-id="archive-tip"
                        data-tooltip-content="Archive File"
                        onClick={() => handleArchive(file.id)}
                      >
                        <Archive size={18} />
                      </button>

                      <button 
                        className='icon-btn alert'
                        data-tooltip-id="alert-tip"
                        data-tooltip-content="Raise concern"
                      >
                        <AlertTriangle 
                          size={20}
                        />
                      
                      </button>
                      <button 
                        className='icon-btn request-file'
                        data-tooltip-id="request-tip"
                        data-tooltip-content="Request File"
                        onClick={() => openRequestFileModal(file.id)}
                      >
                        <Send 
                          size={30}
                        />
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

      {showEditModal && <EditModal onClose={closeEditModal} file={editingFile} updatePage={updatePage} />}
      {showAddFileModal && <AddFile onClose={closeAddFileModal} addFileToList={(newFile) => setFiles(prev => [...prev, newFile])} />}
      {showRequestFileModal && <RequestModal onClose={closeRequestModal} fileId={selectFileId} />}

      <Tooltip id="archive-tip" place="bottom" className="tooltip-react" delayShow={200} delayHide={100} />
      <Tooltip id="request-tip" place="bottom" className="tooltip-react" delayShow={200} delayHide={100} />
      <Tooltip id="edit-tip" place="bottom" className="tooltip-react" delayShow={200} delayHide={100} />
      <Tooltip id="alert-tip" place="bottom" className="tooltip-react" delayShow={200} delayHide={100} />
    </>
  )
}