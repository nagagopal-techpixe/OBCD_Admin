import React from 'react'
import { Outlet, Link } from 'react-router-dom'

const User = () => {
  return (
    <div>
      {/* <div className="flex items-center justify-between mb-4 px-4 py-2">
        <h1 className="text-2xl font-bold">Users</h1>
        <div className="space-x-2">
          <Link to="add" className="px-3 py-1 bg-blue-600 text-white rounded">Add</Link>
          <Link to="/user" className="px-3 py-1 border rounded">All</Link>
        </div>
      </div> */}

      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default User
