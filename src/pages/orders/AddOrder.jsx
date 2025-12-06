import React from 'react'

const AddOrder = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Add Order</h2>
    <form className="space-y-3 max-w-md">
      <div>
        <label className="block text-sm">Order Title</label>
        <input className="w-full border rounded p-2" placeholder="Title" />
      </div>
      <button className="px-4 py-2 bg-green-600 text-white rounded">Save</button>
    </form>
  </div>
)

export default AddOrder
