import { useState } from 'react'
import { Eye, Mail } from 'lucide-react'

const API_URL = 'http://localhost:5001/api/v1/admin/login';

const LoginForm = ({onLogin}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
   const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
   
  // const adminData = {
  //   email: "admin@example.com",
  //   password: "admin123", // ideally, passwords should be hashed in a real app
  // };

  
  const handleSubmit = async e => {
    e.preventDefault() 
    setError("");
    setIsLoading(true);
     const { email, password } = formData;

    // Simple check
    if (!email || !password) {
      setError("Please enter both email and password.");
      setIsLoading(false);
      return;
  }
  try {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    // Parse the response data
    const data = await response.json();

    if (response.ok) {
        // Assuming your backend returns a token on success, e.g., { success: true, token: "...", email: "..." }
        const { token, email: adminEmail,admin } = data; 
        
        // 1. Store the actual token from the server
        localStorage.setItem("authToken", token);
        localStorage.setItem("adminName", admin.name);
        localStorage.setItem("adminEmail", adminEmail || email); // Store email for display
        
        // 2. Clear error and trigger login success
        onLogin(true);

    } else {
        // Handle non-200 responses (e.g., 401 Unauthorized)
        const errorMessage = data.message || "Login failed. Check credentials.";
        setError(errorMessage);
    }
} catch (err) {
    // Handle network errors (e.g., server is down)
    console.error("Login API Error:", err);
    setError("Could not connect to the server. Please try again later.");
} finally {
    setIsLoading(false); // Stop loading regardless of success/failure
}
};

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
          disabled={isLoading}
          onClick={handleSubmit}
          className='w-full bg-blue-500 p-3 text-white font-semibold cursor-pointer'
        >
          {isLoading ? 'Logging In...' : 'Login'}
        </button>
      </form>

     {/* <p> {`${adminData.email}    ${adminData.password}`}</p>  */}
    </div>
  )
}

export default LoginForm
