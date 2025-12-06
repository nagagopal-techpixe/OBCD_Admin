import React from 'react'

const CustumButton = ({type="submit",text="Submit"}) => {
  return (
    <button type={type} className='bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition'>{text}</button>
  )
}

export default CustumButton