import { useState } from 'react'
import { Eye, Mail } from 'lucide-react'

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = e => {
    e.preventDefault()
    // Handle login logic here
  }

  return (
    <div className='w-1/3 bg-white p-6 rounded-md '>
      <div className='text-3xl font-bold text-center mb-6'>Login</div>
      <form className='w-full h-full flex flex-col gap-4'>
        <div className='bg-gray-300 p-3 flex items-center gap-1'>
          <Mail size={20} className='text-gray-500' />
          <input
            type='email'
            placeholder='Email'
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            className='font-semibold focus:outline-none'
          />
        </div>
        <div className='bg-gray-300 p-3 flex items-center gap-1'>
          <Eye size={20} className='text-gray-500' />
          <input
            type='password'
            placeholder='Password'
            value={formData.password}
            onChange={e =>
              setFormData({ ...formData, password: e.target.value })
            }
            className='font-semibold focus:outline-none'
          />
        </div>
        <button
          onClick={handleSubmit}
          className='w-full bg-blue-500 p-3 text-white font-semibold cursor-pointer'
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
