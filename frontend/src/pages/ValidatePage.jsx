import { useState } from 'react'
import Header from '../components/Header'
import Success from '../components/Success'
import Error from '../components/Error'

const ValidatePage = () => {
  const [certificateNumber, setCertificateNumber] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const handleChange = e => {
    const value = e.target.value

    if (/^\d*$/.test(value)) {
      setCertificateNumber(value)
    }
  }

  const handleSubmit = () => {
    try {
      setSuccess({ value: 'Certificate Validate Successfull...' })
      setError(null)
    } catch (error) {
      setError('Error Occured...')
      setSuccess(null)
    }
  }

  return (
    <div className='w-screen h-screen bg-[#37353E] p-2'>
      <Header heading='Validate Certificate' />
      <main className='mt-5'>
        <div className='w-full flex justify-center md:flex-nowrap flex-wrap gap-2 sm:gap-5'>
          <input
            type='text'
            placeholder='Certificate Number'
            value={certificateNumber}
            onChange={handleChange}
            className='w-full sm:w-4/5 bg-gray-300 p-3 font-semibold focus:outline-none rounded-lg'
          />
          <button
            onClick={handleSubmit}
            className='w-full sm:w-1/5 bg-blue-500 p-3 text-white font-semibold cursor-pointer rounded-lg'
          >
            Validate
          </button>
        </div>
        {success && <div className='mt-5'><Success value={success.value} /></div>}
        {error && <div className='mt-5'><Error value={error} /></div>}
      </main>
    </div>
  )
}

export default ValidatePage
