import React, { useEffect, useState } from 'react'
import './Users.css'
import { Edit, Eye, Trash2 } from 'lucide-react';
import axios from 'axios'

export default function Users() {

    // state to store all the users
    const [users, setUsers] = useState([]) //  initial state is an empty array

    // state to handle the search Term
    const [ searchTerm, setSearchTerm ] = useState("") // initial state is an empty array for flexibility

    // state to handle the filtering logic
    const [ filter, setFilter ] = useState(users)
    

    useEffect(() => {
        const term = searchTerm.toLowerCase().trim()

        setFilter(() => {
            // filter accordingly
            const filteredData = users.filter((user) => 
                user.name.toLowerCase().includes(term) ||
                user.email.toLowerCase().includes(term) ||
                user.role.toLowerCase().includes(term) ||
                user.status.toLowerCase().includes(term) ||
                user.last_login.includes(term)
            )
            
            return filteredData
        })

    }, [searchTerm, users])


    // useEffect to get all the users from the backend
    useEffect(() => {
        // function to fetch users from the backend
        const fetchUsers = async () => {
            try {
                const res = await axios.get('http://localhost:5000/iraAPI/users')
                console.log(res.data)
                setUsers(res.data)

            } catch (err) {
                console.error('ERROR: ', err.message)
            }
        }
        
        fetchUsers()
    }, [])

    

    // Pagination
    // const itemsPerPage = 5
    // const currentPage = 1
    // const startIndex = (currentPage - 1) * itemsPerPage
    // const endIndex = startIndex + itemsPerPage

    // const currentUsers = users.slice(startIndex, endIndex)

    // const totalPages = Math.ceil(users.length / itemsPerPage)
    // const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
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
                    {/* <th>Password</th> */}
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
                            {/* <td>{user.password}</td> */}
                            <td>{user.department}</td>
                            {/* <td>{user.refreshToken}</td> */}
                            <td data-status={user.role}>{user.role}</td>
                            <td data-status={user.status}>{user.status}</td>
                            <td>{user.lastLogin}</td>

                            <td className='actions'>
                                <button className='icon-btn view'><Eye size={18} /></button>
                                <button className='icon-btn'><Edit size={18} /></button>
                                <button className='icon-btn delete'><Trash2 size={18} /></button>
                            </td>
                        </tr>
                    ))

                ) : (
                    <tr className='no-users'>
                        <td colSpan={7}>User Not Found</td>
                    </tr>
                ) }

            </tbody>
        </table>
    </section>
  )
}
