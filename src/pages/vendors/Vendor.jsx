import React from 'react'
import { Outlet, Link } from 'react-router-dom'

const Vendor = () => {
  return (
    <div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default Vendor