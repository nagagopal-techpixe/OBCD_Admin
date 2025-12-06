import React from 'react'
import { useParams } from 'react-router-dom'

const EditNotification = () => {
  const { id } = useParams()
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Edit Notification #{id}</h2>
      <form className="space-y-3 max-w-md">
        <div>
          <label className="block text-sm">Title</label>
          <input className="w-full border rounded p-2" defaultValue={`Notify ${id}`} />
        </div>
        <button className="px-4 py-2 bg-yellow-600 text-white rounded">Update</button>
      </form>
    </div>
  )
}

export default EditNotification
