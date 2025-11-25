import { useState } from 'react'
import Header from '../components/Header'
import Success from '../components/Success'
import Error from '../components/Error'
import { validate } from '../services/validateCertificate'
import CertificateCard from '../components/CertificateCard'
import UserNav from '../components/UserNav'

const ValidatePage = () => {
  const [certificateNumber, setCertificateNumber] = useState('')
  const [certificateData, setCertificateData] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const handleChange = e => {
    const value = e.target.value

      setCertificateNumber(value)
  }

  const handleSubmit = async () => {
    console.log(certificateNumber);
    
    if(certificateNumber){
    try {
      const data= await validate(certificateNumber);
      console.log(data);
      
      setCertificateData(data)
      setSuccess({ value: 'Certificate Validate Successful...' })
      setError(null)
    } catch (err) {
      console.log(err);
      
      setError(err.message)
      setSuccess(null)
    }
  }
    else{
      setError("Please Enter A Certificate Number");
    }
  }
  

  return (
    <div className='w-full min-h-screen bg-white'>
      <UserNav/>
      <Header heading='Validate Certificate' />
      <main className='mt-5 m-2'>
        <div className='w-full flex justify-center md:flex-nowrap flex-wrap gap-2 sm:gap-5 border p-2 rounded-lg'>
          <input
            type='text'
            placeholder='Certificate Number'
            value={certificateNumber}
            onChange={handleChange}
            className='w-full sm:w-4/5 p-3 font-semibold focus:outline-none rounded-lg  border border-white'
          />
          <button
            onClick={handleSubmit}
            className='w-full sm:w-1/5 bg-gray-700 p-3 text-white font-semibold cursor-pointer rounded-lg'
          >
            Validate
          </button>
        </div>
        {success && (
          <div className='overflow-hidden'>
            <div className='mt-5'>
              <Success value={success.value} />
            </div>
            <div className='my-3'>
              <CertificateCard certificateData={certificateData}/>
            </div>
          </div> 
        )}

        {error && (
          <div className='mt-5'>
            <Error value={error} />
          </div>
        )}
      </main>
    </div>
  )
}

export default ValidatePage
