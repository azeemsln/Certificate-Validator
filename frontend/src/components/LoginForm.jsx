import { useState } from 'react'
import { Eye, Mail } from 'lucide-react'

const LoginForm = ({onLogin}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
   const [error, setError] = useState("");

    const adminData = {
    email: "admin@example.com",
    password: "admin123", // ideally, passwords should be hashed in a real app
  };

  
  const handleSubmit = e => {
    e.preventDefault() 
     const { email, password } = formData;

    // Simple check
    if (email === adminData.email && password === adminData.password) {
      // Create a mock token
      const token = btoa(`${email}:${new Date().getTime()}`);

      // Store token in localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("adminEmail", email);

      // Clear error and trigger login success
      setError("");
      onLogin(true);
    } else {
      setError("Invalid email or password");
    }
  }

  return (
    <div className='w-1/3 bg-white p-6 rounded-md  '>
      <div className='text-3xl font-bold text-center mb-6'>Login</div>
      <form className='w-full h-full flex flex-col gap-4'>
        <div className='bg-gray-300 p-3 flex items-center gap-1'>
          <Mail size={20} className='text-gray-500' />
          <input
            type='email'
            placeholder='Email'
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            className='font-semibold focus:outline-none w-100'
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
            className='font-semibold focus:outline-none w-100'
          />
        </div>
        {error && (
          <p className="text-red-500 text-center text-sm font-medium">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          className='w-full bg-blue-500 p-3 text-white font-semibold cursor-pointer'
        >
          Login
        </button>
      </form>

     <p> {`${adminData.email}    ${adminData.password}`}</p> 
    </div>
  )
}

export default LoginForm
