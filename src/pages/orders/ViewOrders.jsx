import React from 'react'
import { Link } from 'react-router-dom'

const ViewOrders = () => {
  const items = [{ id: 1, name: 'Order #1' }, { id: 2, name: 'Order #2' }]

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">All Orders</h2>
        <Link to="add" className="px-3 py-1 bg-blue-600 text-white rounded">Add Order</Link>
      </div>
      <ul className="space-y-2">
        {items.map(i => (
          <li key={i.id} className="p-3 border rounded flex justify-between items-center">
            <span>{i.name}</span>
            <div className="space-x-2">
              <Link to={`edit/${i.id}`} className="text-sm text-yellow-600">Edit</Link>
              <Link to={`${i.id}`} className="text-sm text-blue-600">View</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ViewOrders
