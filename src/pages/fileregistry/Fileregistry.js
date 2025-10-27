import React, { useEffect, useState } from 'react'
import './Fileregistry.css'
import { AlertTriangle, Edit, PlusCircle, Send, Trash2 } from 'lucide-react';
import { toast } from "react-toastify";
import axios from 'axios';
import EditModal from '../../components/modals/editmodal/EditModal';
import AddFile from '../../components/modals/addfilemodal/AddFile';
import RequestModal from '../../components/modals/requestmodal/RequestModal';

export default function Fileregistry() {

  // // state to store all the files
  const [ files, setFiles ] = useState([]) // Initial state is an empty array

  // // Get the files from the constext
  // const { files } = useFile

  // state to hold and update the search term
  const [ searchTerm, setSearchTerm ] = useState("") // empty strings for flexibility

  // state to filter the files
  const [ filtered, setFiltered ] = useState(files) // initial state is the array of file objects

  // state to display the edit modal
  const [ showEditModal, setShowEditModal ] = useState(false) // initially hide the modal
  // state to display the add file modal
  const [ showAddFileModal, setShowAddFileModal ] = useState(false) // initially hode the modal

  // state to display the request file modal
  const [ showRequestFileModal, setShowRequestFileModal ] = useState(false) // initial state is false
  
  // state containing the files data
  const [ editingFile, setEditingFile ] = useState(null) // initial state is nothing

  // function to open the Edit the modal
  const openEditModal = (file) => {
    setEditingFile(file)
    setShowEditModal(true) // open the modal
  }

  // function to open the add file modal
  const openAddFileModal = () => {
    setShowAddFileModal(true) // open the Modal
  }

  // function to open the request file modal
  const openRequestFileModal = () => {
    setShowRequestFileModal(true) // open the modal
  }

  // function to close the edit modal
  const closeEditModal = () => setShowEditModal(false) // close the modal
  // function to close the edit modal
  const closeAddFileModal = () => setShowAddFileModal(false) // close the modal
  // function to close the request modal
  const closeRequestModal = () => setShowRequestFileModal(false) // close the modal

  // useEffect to listen for a change in the search term and the users array
  useEffect(() => {
    const term = searchTerm.trim().toLowerCase()
    console.log(files)

    setFiltered(() => {
      // filter accordingly
      const filterFiles = files.filter((file) => 
        file.name.toLowerCase().includes(term) ||
        file.department.toLowerCase().includes(term) ||
        file.status.toLowerCase().includes(term) ||
        file.date_uploaded.includes(term) ||
        file.time_uploaded.includes(term)
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
        // response
        const res = await axios.get('http://localhost:5000/iraAPI/fileregistry')
        // Update state with the data
        setFiles(res.data)

      } catch(err) {
        console.error('ERROR: ', err.message)
      }
    }

    // Call the function
    fetchFiles()

  }, [])


  // funtion to handle deleting a file
  const handleDelete = async (fileId) => {
    
    try {
      await axios.delete(`http://localhost:5000/iraAPI/fileregistry/${fileId}`)
      // Update the state filtering the array of deleted files
      setFiles(prev => prev.filter(file => file.id !== fileId))
      // Notify the user that he file has been deleted successfully
      toast.success('File deleted Successfully.')
    } catch (err) {
      console.error('DELETE ERROR: ', err.message)
    }
  }

  // function to update the page
  const updatePage  = (uploadedFile) => {
    // if the the uploaded file matches a file in the registry update the page with the correct data
    setFiles(prev => prev.map(f => f.id === uploadedFile.id ? uploadedFile : f))
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
                        onClick={() => openEditModal(file)}
                      >
                        <Edit size={18} />
                      </button>
                      
                      <button 
                        className='icon-btn delete'
                        onClick={() => handleDelete(file.id)}
                      >
                        <Trash2 size={18} />
                      </button>

                      <button className='icon-btn alert'>
                        <AlertTriangle 
                          size={20}
                          
                        />
                      
                      </button>
                      <button 
                        className='icon-btn request-file'
                        onClick={openRequestFileModal}
                        // onClick={() => handleDelete(file.id)}
                      >
                        <Send size={30} />
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

      {showEditModal && <EditModal onClose={closeEditModal} file={editingFile} updatePage={updatePage}/>}
      {showAddFileModal && <AddFile onClose={closeAddFileModal} />}
      {showRequestFileModal && <RequestModal onClose={closeRequestModal} />}

    </>
  )
}