import React from 'react'
import './Sidebar.css'
import { 
    BarChart2, 
    Bell, 
    FileMinus, 
    FilePlus, 
    FileText, 
    History, 
    LayoutDashboard, 
    MapPin, 
    Settings,
    Users 
} from 'lucide-react'
import { useLocation, useNavigate } from 'react-router'

export default function Sidebar() {

    const sidebarContent = [
        { id: 1, page: "DashBoard", icon: LayoutDashboard, route: '/dashboard', roles: ["admin", "user"] },
        { id: 2, page: "Users and Roles", icon: Users, route: '/users', roles: ["admin"] },
        { id: 3, page: "File Registry", icon: FileText, route: '/fileregistry', roles: ["admin", "user"] },
        { id: 4, page: "Files Taken", icon: FileMinus, route: '/filestaken', roles: ["admin", "user"] },
        // { id: 5, page: "Files Returned", icon: FilePlus, route: '/filesreturned', roles: ["admin", "user"] },
        { id: 5, page: "File Requests", icon: MapPin, route: '/filerequests', roles: ["admin", "user"] },
        // { id: 7, page: "Upload/ Add File", icon: UploadCloud, route: '/upload', roles: ["admin"] },
        // { id: 8, page: "Approvals/ Reviews", icon: FileCheck, route: '/approvals', roles: ["admin"] },
        // { id: 8, page: "Retention / Archiving", icon: Archive, route: '/retention', roles: ["admin"] },
        { id: 6, page: "Audit Trail", icon: History, route: '/audit', roles: ["admin"] },
        { id: 7, page: "Reports & Analytics", icon: BarChart2, route: '/reports', roles: ["admin"] },
        { id: 8, page: "Notifications / Alerts", icon: Bell, route: '/notifications', roles: ["admin", "user"] },
        { id: 9, page: "Settings / Admin", icon: Settings, route: '/settings', roles: ["admin"] }
    ]
    

    // useNavigate to navigate to other pages
    const navigate = useNavigate()

    const { pathname } = useLocation()

  return (
    <div
        className={`sidebar`}
    >
        <div
            className='sidebar-header'
        >
            <img
                src={require('../../../images/logo.webp')}
                alt='IRA logo'
                className='ira-logo me-2'
                // onClick={() => setCollapsed(!collapsed)}
            />
            
            {/* <span>File Tracker</span> */}
            <span>IRA Tracker</span>
            
        </div>

        <div
            className='sidebar-content'
        >
            {sidebarContent.map((comp) => {
                const Icon = comp.icon;

                return (
                    <div
                        key={comp.id}
                        className={`sidebar-page ${pathname === comp.route ? 'active': '' }`}
                        onClick={() => navigate(comp.route)}
                    >
                        <Icon size={25} className='me'/>
                        <span>{comp.page}</span>
                        {/* {comp.page} */}
                    </div>
                )
            })}
        </div>
    </div>
  )
}
