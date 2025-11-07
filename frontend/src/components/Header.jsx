import React from 'react'

const Header = ({heading = ''}) => {
  return (
    <div className='w-full p-5 text-center font-bold text-black text-2xl  rounded-lg '>
      {heading}
    </div>
  )
}

export default Header
