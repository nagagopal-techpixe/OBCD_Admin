import React from 'react'
import { Link } from 'react-router-dom'

const ViewUsers = () => {
  const demo = [{ id: 1, name: 'User A' }, { id: 2, name: 'User B' }]

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">All Users</h2>
        <Link to="add" className="px-3 py-1 bg-blue-600 text-white rounded">Add User</Link>
      </div>
      <ul className="space-y-2">
        {demo.map(u => (
          <li key={u.id} className="p-3 border rounded flex justify-between items-center">
            <span>{u.name}</span>
            <div className="space-x-2">
              <Link to={`edit/${u.id}`} className="text-sm text-yellow-600">Edit</Link>
              <Link to={`${u.id}`} className="text-sm text-blue-600">View</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ViewUsers
