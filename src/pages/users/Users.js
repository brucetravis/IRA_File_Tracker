import React from 'react'
import './Users.css'
import { Edit, Eye, Trash2 } from 'lucide-react';
import { useUser } from '../../components/contexts/UserProvider';
import EditUser from '../../components/modals/editusermodal/EditUser';

export default function Users() {


    // get the necessary functions and states from the user Provider
    const { filter, setSearchTerm, 
        searchTerm, handleDelete, 
        openEditUserModal, showEditUserModal,
        closeEditUserModal, updatePage, editingUser
    } = useUser()
    

    // Pagination
    // const itemsPerPage = 5
    // const currentPage = 1
    // const startIndex = (currentPage - 1) * itemsPerPage
    // const endIndex = startIndex + itemsPerPage

    // const currentUsers = users.slice(startIndex, endIndex)

    // const totalPages = Math.ceil(users.length / itemsPerPage)
    // const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
        <section className='users-page'>
            <div className='users-header'>
                <h2 className='users-title'>Users</h2>
                
                <input
                    type='text'
                    placeholder='Search users'
                    className='search-bar'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Department</th>
                        {/* <th>Refresh Token</th> */}
                        <th>Role</th>
                        <th>Status</th>
                        <th>Last Login</th>
                        <th> Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {filter.length > 0 ? (
                        filter.map((user) => (
                            <tr
                                key={user.id}
                            >
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                <td>{user.department}</td>
                                {/* <td>{user.refreshToken}</td> */}
                                <td data-status={user.role}>{user.role}</td>
                                <td data-status={user.status}>{user.status}</td>
                                <td>{user.lastLogin}</td>

                                <td className='actions'>
                                    <button className='icon-btn view'><Eye size={18} /></button>
                                    <button 
                                        className='icon-btn'
                                        onClick={() => openEditUserModal(user)}
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button className='icon-btn delete'
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))

                    ) : (
                        <tr className='no-users'>
                            <td colSpan={10}>User Not Found</td>
                        </tr>
                    ) }

                </tbody>
            </table>
        </section>

        {showEditUserModal && <EditUser onClose={closeEditUserModal} user={editingUser} updatePage={updatePage} /> }
    </>
  )
}
