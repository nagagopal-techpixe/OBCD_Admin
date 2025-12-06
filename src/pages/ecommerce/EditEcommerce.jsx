import React from 'react'
import { useParams } from 'react-router-dom'

const EditEcommerce = () => {
  const { id } = useParams();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Edit Product #{id}</h2>
      <form className="space-y-3 max-w-md">
        <div>
          <label className="block text-sm">Product Name</label>
          <input className="w-full border rounded p-2" defaultValue={`Product ${id}`} />
        </div>
        <div>
          <label className="block text-sm">Price</label>
          <input className="w-full border rounded p-2" defaultValue={`$${id}0`} />
        </div>
        <button className="px-4 py-2 bg-yellow-600 text-white rounded">Update</button>
      </form>
    </div>
  )
}

export default EditEcommerce
