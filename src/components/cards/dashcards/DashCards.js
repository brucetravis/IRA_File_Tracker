import React from 'react'
import './DashCards.css'
import { FileMinus, FilePlus, FileText, Users } from 'lucide-react'
import { useNavigate } from 'react-router'
import { useUser } from '../../contexts/UserProvider'
import { useFile } from '../../contexts/FileProvider'
import { useRequest } from '../../contexts/requestProvider'

export default function DashCards() {

    // get the total number of users, files and teh files taken from the database
    const { users } = useUser()
    const { files, filesTaken } = useFile()
    const { filteredRequests } = useRequest()

    // get the userData from the user context
    const { userData } = useUser()

    // An array of the card data
    const cards = [
        { id: 1, label: "Total Files", value: files.length, icon: FileText, route: '/fileregistry' },
        { id: 2, label: "Users", value: userData?.role === "admin" ? users.length : (<p>For admin only</p>), icon: Users, route: userData?.role === "admin" ? '/users' : '/dashboard' },
        { id: 3, label: "Files Taken", value: filesTaken.length, icon: FileMinus, route: '/filestaken' },
        { id: 4, label: "Files Requests", value: userData?.role === "admin" ? filteredRequests.length : (<p>For admin only</p>), icon: FilePlus, route: userData?.role === "admin" ? '/filerequests' : '/dashboard' }
        // { id: 5, label: "Notifications", value: 8, icon: Bell, route: '/notifications' },
        // { id: 6, label: "Approvals Pending", value: 12, icon: FileCheck, route: '/approvals' }
    ]

    // navigate to another page when a card is clicked
    const navigate = useNavigate()

  return (
    <div 
        className='dashboard-cards'
    >
        {cards.map((card) => {
            const Icon = card.icon

            return (
                <div
                    key={card.id}
                    className='dashboard-card'
                    onClick={() => navigate(card.route)}
                >
                    <Icon size={20} className='icon' />
                    <div className='label'>{card.label}</div>
                    <div className='value'>{card.value}</div>
                </div>
            )
        })}
        
    </div>
  )
}
