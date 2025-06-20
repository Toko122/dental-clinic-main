import React from 'react'
import { Link } from 'react-router-dom'
import './AdminSideBar.css'

const AdminSideBar = () => {
  return (
    <div className="sidebar">
        <div className="sidebar-content">
          <p className="sidebar-title">Admin Panel</p>
          <ul className="sidebar-menu">
            <Link to={'/admin/dashboard'} className='sidebar_link'>Dashboard</Link>
            <Link to={'/admin/dashboard/appointments'} className='sidebar_link'>Appointments</Link>
            <Link to={'/admin/dashboard/contacts'} className='sidebar_link'>Contacts</Link>
            <li className='sidebar_link'>Settings</li>
          </ul>
        </div>
      </div>
  )
}

export default AdminSideBar