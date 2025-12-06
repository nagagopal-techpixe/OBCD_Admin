import React from 'react'

const AddEcommerce = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Add Product</h2>
      <form className="space-y-3 max-w-md">
        <div>
          <label className="block text-sm">Product Name</label>
          <input className="w-full border rounded p-2" placeholder="Name" />
        </div>
        <div>
          <label className="block text-sm">Price</label>
          <input className="w-full border rounded p-2" placeholder="Price" />
        </div>
        <button className="px-4 py-2 bg-green-600 text-white rounded">Save</button>
      </form>
    </div>
  )
}

export default AddEcommerce
