import React from 'react'
import './Fileregistry.css'
import { AlertTriangle, Edit, PlusCircle, Send, Trash2 } from 'lucide-react';
import RequestModal from '../../components/modals/requestmodal/RequestModal';
import EditModal from '../../components/modals/editfilemodal/EditModal';
import AddFile from '../../components/modals/addfilemodal/AddFile';
import { useFile } from '../../components/contexts/FileProvider';

export default function Fileregistry() {

  // Get the files from the context
  const { 
    handleDelete, updatePage, openEditModal, 
    openAddFileModal, openRequestFileModal, showRequestFileModal, 
    closeEditModal, closeAddFileModal, closeRequestModal, 
    editingFile, showEditModal, showAddFileModal, filtered, 
    searchTerm, setSearchTerm
    
  } = useFile()

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