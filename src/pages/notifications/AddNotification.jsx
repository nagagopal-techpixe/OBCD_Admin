import React from 'react'

const AddNotification = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Add Notification</h2>
    <form className="space-y-3 max-w-md">
      <div>
        <label className="block text-sm">Title</label>
        <input className="w-full border rounded p-2" placeholder="Title" />
      </div>
      <button className="px-4 py-2 bg-green-600 text-white rounded">Save</button>
    </form>
  </div>
)

export default AddNotification
