import React from 'react'
import { Outlet, Link } from 'react-router-dom'

const Notifications = () => (
  <div>
    <div className="flex items-center justify-between mb-4">
      <div className="space-x-2">
        <Link to="/notifications" className="px-3 py-1 border rounded">All</Link>
        <Link to="add" className="px-3 py-1 bg-blue-600 text-white rounded">Add</Link>
      </div>
    </div>
    <Outlet />
  </div>
)

export default Notifications


