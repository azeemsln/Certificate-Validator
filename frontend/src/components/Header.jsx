import React from 'react'

const Header = ({heading = ''}) => {
  return (
    <div className='w-full p-5 text-center font-bold text-white text-2xl border-1 rounded-lg bg-black/20'>
      {heading}
    </div>
  )
}

export default Header
