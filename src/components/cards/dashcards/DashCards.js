import React from 'react'
import './DashCards.css'
import { FileMinus, FilePlus, FileText } from 'lucide-react'
import { useNavigate } from 'react-router'

export default function DashCards() {

    // An array of the card data
    const cards = [
        { id: 1, label: "Total Files", value: 1230, icon: FileText, route: '/fileregistry' },
        { id: 2, label: "Users", value: 25, icon: FileText, route: '/users' },
        { id: 3, label: "Files Taken", value: 230, icon: FileMinus, route: '/filestaken' },
        { id: 4, label: "Files Returned", value: 1000, icon: FilePlus, route: '/filereturned' }
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
