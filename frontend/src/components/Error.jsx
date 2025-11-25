const Error = ({ value }) => {
  return (
    <div className='w-full border border-red-500 bg-red-500/5 p-5 rounded-lg text-red-500'>
      {value.slice(6)}
    </div>
  )
}

export default Error
